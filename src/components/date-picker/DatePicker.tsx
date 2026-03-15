import React, { useState, useCallback, useEffect } from "react";
import {
  format,
  addMonths,
  subMonths,
  setMonth,
  setYear,
  getYear,
  isBefore,
  isSameDay,
} from "date-fns";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import MonthGrid from "./MonthGrid";
import MonthSelector from "./MonthSelector";
import YearSelector from "./YearSelector";
import type { DatePickerProps, DateRange } from "./types";
import { cn } from "../../lib/utils";

type ViewMode = "calendar" | "month" | "year";

export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      mode = "single",
      value,
      onChange,
      onApply,
      onReset,
      minDate,
      maxDate,
      disabledDates,
      weekStart = 0,
      numberOfMonths = 2,
      showFooter = true,
      className,
      renderDay,
      presets,
    },
    ref,
  ) => {
    const [viewDate, setViewDate] = useState(() => {
      if (mode === "single" && value instanceof Date) return value;
      if (mode === "range" && value && "start" in value && value.start)
        return value.start;
      return new Date();
    });
    const [viewMode, setViewMode] = useState<ViewMode>("calendar");
    const [hoverDate, setHoverDate] = useState<Date | null>(null);

    const selectedRange =
      mode === "range" ? ((value as DateRange | undefined) ?? null) : null;
    const selectedDate =
      mode === "single" ? ((value as Date | undefined) ?? null) : null;

    const handleDateClick = useCallback(
      (date: Date) => {
        if (mode === "single") {
          onChange?.(date);
        } else {
          const range = selectedRange || { start: null, end: null };
          if (!range.start || (range.start && range.end)) {
            onChange?.({ start: date, end: null });
          } else {
            if (isBefore(date, range.start)) {
              onChange?.({ start: date, end: range.start });
            } else if (isSameDay(date, range.start)) {
              onChange?.({ start: date, end: date });
            } else {
              onChange?.({ start: range.start, end: date });
            }
          }
        }
      },
      [mode, selectedRange, onChange],
    );

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        setViewMode("calendar");
      }
    }, []);

    const handlePresetClick = useCallback(
      (preset: { getValue: () => DateRange }) => {
        const range = preset.getValue();
        onChange?.(range);
      },
      [onChange],
    );

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex flex-col rounded-xl border border-dp-border bg-dp-surface select-none antialiased",
          "shadow-[var(--dp-shadow)]",
          className,
        )}
        onKeyDown={handleKeyDown}
        role="application"
        aria-label="Date picker"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-dp-border">
          <button
            type="button"
            onClick={() => setViewDate(subMonths(viewDate, 1))}
            className="p-1.5 rounded-md hover:bg-dp-surface-hover text-dp-text-muted hover:text-dp-text transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() =>
                setViewMode(viewMode === "month" ? "calendar" : "month")
              }
              className={cn(
                "text-sm font-semibold px-2 py-1 rounded-md transition-colors",
                viewMode === "month"
                  ? "bg-dp-surface-hover text-dp-text"
                  : "hover:bg-dp-surface-hover text-dp-text",
              )}
            >
              {format(viewDate, "MMMM")}
            </button>
            <button
              type="button"
              onClick={() =>
                setViewMode(viewMode === "year" ? "calendar" : "year")
              }
              className={cn(
                "text-sm font-semibold px-2 py-1 rounded-md transition-colors",
                viewMode === "year"
                  ? "bg-dp-surface-hover text-dp-text"
                  : "hover:bg-dp-surface-hover text-dp-text",
              )}
            >
              {format(viewDate, "yyyy")}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setViewDate(addMonths(viewDate, 1))}
            className="p-1.5 rounded-md hover:bg-dp-surface-hover text-dp-text-muted hover:text-dp-text transition-colors"
            aria-label="Next month"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="flex">
          {/* Presets sidebar */}
          {presets && presets.length > 0 && (
            <div className="border-r border-dp-border p-3 min-w-[140px] flex flex-col gap-0.5">
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => handlePresetClick(preset)}
                  className="text-left text-xs font-medium px-2.5 py-1.5 rounded-md text-dp-text-muted hover:text-dp-text hover:bg-dp-surface-hover transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          )}

          <div className="p-4 flex-1">
            <AnimatePresence mode="wait">
              {viewMode === "calendar" && (
                <motion.div
                  key="calendar"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex flex-col md:flex-row gap-6"
                >
                  {[...Array(numberOfMonths)].map((_, i) => (
                    <MonthGrid
                      key={i}
                      month={addMonths(viewDate, i)}
                      mode={mode}
                      selectedDate={selectedDate}
                      selectedRange={selectedRange}
                      hoverDate={hoverDate}
                      onDateClick={handleDateClick}
                      onDateHover={setHoverDate}
                      minDate={minDate}
                      maxDate={maxDate}
                      disabledDates={disabledDates}
                      weekStart={weekStart}
                      renderDay={renderDay}
                      showLabel={numberOfMonths > 1}
                    />
                  ))}
                </motion.div>
              )}

              {viewMode === "month" && (
                <MonthSelector
                  currentMonth={viewDate}
                  onSelect={(m) => {
                    setViewDate(setMonth(viewDate, m));
                    setViewMode("calendar");
                  }}
                />
              )}

              {viewMode === "year" && (
                <YearSelector
                  currentYear={getYear(viewDate)}
                  onSelect={(y) => {
                    setViewDate(setYear(viewDate, y));
                    setViewMode("calendar");
                  }}
                  minDate={minDate}
                  maxDate={maxDate}
                />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        {showFooter && (
          <div className="flex items-center justify-between px-4 py-3 bg-dp-footer border-t border-dp-border rounded-b-xl">
            <button
              type="button"
              onClick={onReset}
              className="flex items-center gap-1.5 text-xs font-medium text-dp-text-muted hover:text-dp-text transition-colors"
            >
              <RotateCcw size={13} />
              Reset
            </button>
            <button
              type="button"
              onClick={() => onApply?.(value)}
              className="px-5 py-1.5 bg-primary text-primary-foreground text-xs font-semibold rounded  hover:opacity-90 shadow-sm transition-all active:scale-[0.98]"
            >
              Apply
            </button>
          </div>
        )}
      </div>
    );
  },
);

DatePicker.displayName = "DatePicker";

export default DatePicker;
