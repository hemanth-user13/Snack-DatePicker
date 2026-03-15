import React, { useMemo } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isWithinInterval,
  isBefore,
  isAfter,
} from "date-fns";
import type { DatePickerMode, DateRange } from "./types";
import { cn } from "../../lib/utils";

interface MonthGridProps {
  month: Date;
  mode: DatePickerMode;
  selectedDate: Date | null;
  selectedRange: DateRange | null;
  hoverDate: Date | null;
  onDateClick: (date: Date) => void;
  onDateHover: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  weekStart?: 0 | 1;
  renderDay?: (date: Date) => React.ReactNode;
  showLabel?: boolean;
}

const WEEK_DAYS_SUN = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const WEEK_DAYS_MON = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const MonthGrid: React.FC<MonthGridProps> = ({
  month,
  mode,
  selectedDate,
  selectedRange,
  hoverDate,
  onDateClick,
  onDateHover,
  minDate,
  maxDate,
  disabledDates = [],
  weekStart = 0,
  renderDay,
  showLabel = true,
}) => {
  const days = useMemo(() => {
    return eachDayOfInterval({
      start: startOfMonth(month),
      end: endOfMonth(month),
    });
  }, [month]);

  const weekDays = weekStart === 1 ? WEEK_DAYS_MON : WEEK_DAYS_SUN;

  const startPad = useMemo(() => {
    const dayOfWeek = days[0].getDay();
    return weekStart === 1 ? (dayOfWeek === 0 ? 6 : dayOfWeek - 1) : dayOfWeek;
  }, [days, weekStart]);

  const isDisabled = (date: Date) => {
    if (minDate && isBefore(date, minDate)) return true;
    if (maxDate && isAfter(date, maxDate)) return true;
    return disabledDates.some((d) => isSameDay(d, date));
  };

  return (
    <div className="flex-1 min-w-[252px]">
      {showLabel && (
        <div className="text-center mb-3">
          <span className="text-sm font-medium text-dp-text">
            {format(month, "MMMM yyyy")}
          </span>
        </div>
      )}
      <div className="grid grid-cols-7 mb-1.5">
        {weekDays.map((d) => (
          <span
            key={d}
            className="text-[11px] font-semibold text-dp-text-muted text-center uppercase tracking-wider py-1"
          >
            {d}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {[...Array(startPad)].map((_, i) => (
          <div key={`pad-${i}`} className="h-9 w-9" />
        ))}
        {days.map((day) => {
          const disabled = isDisabled(day);
          const isSelected =
            mode === "single"
              ? selectedDate && isSameDay(day, selectedDate)
              : selectedRange &&
                ((selectedRange.start && isSameDay(day, selectedRange.start)) ||
                  (selectedRange.end && isSameDay(day, selectedRange.end)));

          const isStart =
            mode === "range" &&
            selectedRange?.start &&
            isSameDay(day, selectedRange.start);
          const isEnd =
            mode === "range" &&
            selectedRange?.end &&
            isSameDay(day, selectedRange.end);

          let inRange = false;
          if (mode === "range" && selectedRange?.start) {
            if (selectedRange.end) {
              inRange = isWithinInterval(day, {
                start: selectedRange.start,
                end: selectedRange.end,
              });
            } else if (hoverDate) {
              const rangeStart = isBefore(hoverDate, selectedRange.start)
                ? hoverDate
                : selectedRange.start;
              const rangeEnd = isBefore(hoverDate, selectedRange.start)
                ? selectedRange.start
                : hoverDate;
              inRange = isWithinInterval(day, {
                start: rangeStart,
                end: rangeEnd,
              });
            }
          }

          return (
            <button
              key={day.toISOString()}
              type="button"
              disabled={disabled}
              onClick={() => !disabled && onDateClick(day)}
              onMouseEnter={() => !disabled && onDateHover(day)}
              onMouseLeave={() => onDateHover(null)}
              aria-label={format(day, "PPPP")}
              aria-selected={!!isSelected}
              className={cn(
                "relative h-9 w-9 text-sm flex items-center justify-center transition-all tabular-nums",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                "active:scale-[0.96]",
                // Default
                !isSelected &&
                  !inRange &&
                  "text-dp-text hover:bg-dp-surface-hover rounded-lg",
                // Selected (start/end/single)
                isSelected &&
                  "bg-dp-surface-active text-dp-text-selected z-10 shadow-sm font-semibold",
                // Single mode selected
                mode === "single" && isSelected && "rounded-lg",
                // Range endpoints
                isStart && !isEnd && "rounded-l-lg rounded-r-none",
                isEnd && !isStart && "rounded-r-lg rounded-l-none",
                isStart && isEnd && "rounded-lg",
                // In range but not selected
                inRange &&
                  !isSelected &&
                  "bg-[hsl(var(--dp-range-tint)/0.08)] text-primary rounded-none",
                // Disabled
                disabled &&
                  "text-dp-text-muted/40 cursor-not-allowed hover:bg-transparent",
              )}
            >
              {renderDay ? renderDay(day) : format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(MonthGrid);
