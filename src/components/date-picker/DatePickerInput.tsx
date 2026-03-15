import React, { useState, useCallback } from "react";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { DatePicker } from "./DatePicker";
import type { DatePickerProps, DateRange } from "./types";
import { cn } from "../../lib/utils";

export interface DatePickerInputProps extends Omit<
  DatePickerProps,
  "showFooter" | "className"
> {
  /** Placeholder text when no date is selected */
  placeholder?: string;
  /** Date display format string (date-fns format) */
  displayFormat?: string;
  /** Width class for the input trigger */
  triggerClassName?: string;
  /** Class for the popover content */
  popoverClassName?: string;
  /** Class for the calendar inside the popover */
  calendarClassName?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether to show a clear button */
  clearable?: boolean;
  /** Popover alignment */
  align?: "start" | "center" | "end";
  /** Label text above the input */
  label?: string;
}

export const DatePickerInput: React.FC<DatePickerInputProps> = ({
  mode = "single",
  value,
  onChange,
  onApply,
  onReset,
  placeholder,
  displayFormat = "MMM d, yyyy",
  triggerClassName,
  popoverClassName,
  calendarClassName,
  disabled = false,
  clearable = true,
  align = "start",
  label,
  numberOfMonths,
  presets,
  minDate,
  maxDate,
  disabledDates,
  weekStart,
  renderDay,
}) => {
  const [open, setOpen] = useState(false);

  const defaultPlaceholder =
    mode === "range" ? "Select date range..." : "Select a date...";

  const displayValue = (() => {
    if (mode === "single" && value instanceof Date) {
      return format(value, displayFormat);
    }
    if (mode === "range" && value && "start" in value) {
      const range = value as DateRange;
      if (range.start && range.end) {
        return `${format(range.start, displayFormat)} – ${format(range.end, displayFormat)}`;
      }
      if (range.start) {
        return `${format(range.start, displayFormat)} – ...`;
      }
    }
    return "";
  })();

  const handleApply = useCallback(
    (val: Date | DateRange | undefined) => {
      onApply?.(val);
      setOpen(false);
    },
    [onApply],
  );

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onReset?.();
    },
    [onReset],
  );

  const handleChange = useCallback(
    (val: Date | DateRange) => {
      onChange?.(val);
      // Auto-close on single date selection (no footer)
      if (mode === "single") {
        setOpen(false);
      }
    },
    [onChange, mode],
  );

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            className={cn(
              "inline-flex items-center gap-2 h-10 px-3 rounded-lg border border-input bg-background text-sm",
              "ring-offset-background transition-colors",
              "hover:bg-accent/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              !displayValue && "text-muted-foreground",
              displayValue && "text-foreground",
              triggerClassName,
            )}
          >
            <CalendarIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="flex-1 text-left truncate">
              {displayValue || placeholder || defaultPlaceholder}
            </span>
            {clearable && displayValue && (
              <span
                role="button"
                tabIndex={0}
                onClick={handleClear}
                onKeyDown={(e) => e.key === "Enter" && handleClear(e as any)}
                className="shrink-0 p-0.5 rounded hover:bg-muted transition-colors"
                aria-label="Clear selection"
              >
                <X className="h-3.5 w-3.5 text-muted-foreground" />
              </span>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent
          className={cn("w-auto p-0 pointer-events-auto", popoverClassName)}
          align={align}
          sideOffset={8}
        >
          <DatePicker
            mode={mode}
            value={value}
            onChange={handleChange}
            onApply={mode === "range" ? handleApply : undefined}
            onReset={onReset}
            numberOfMonths={numberOfMonths ?? (mode === "range" ? 2 : 1)}
            showFooter={mode === "range"}
            presets={presets}
            minDate={minDate}
            maxDate={maxDate}
            disabledDates={disabledDates}
            weekStart={weekStart}
            renderDay={renderDay}
            className={cn("border-0 shadow-none", calendarClassName)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePickerInput;
