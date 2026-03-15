import { ReactNode } from "react";

export type DatePickerMode = "single" | "range";

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface PresetRange {
  label: string;
  getValue: () => DateRange;
}

export interface DatePickerProps {
  mode?: DatePickerMode;
  value?: Date | DateRange;
  onChange?: (value: Date | DateRange) => void;
  onApply?: (value: Date | DateRange | undefined) => void;
  onReset?: () => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  weekStart?: 0 | 1;
  numberOfMonths?: number;
  showFooter?: boolean;
  className?: string;
  renderDay?: (date: Date) => ReactNode;
  presets?: PresetRange[];
}
