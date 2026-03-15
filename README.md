Snack Datepicker

A modern, flexible, and fully customizable React Date Picker & Date
Range Picker built for performance and developer experience.

Snack Datepicker supports single date selection and date range selection
with powerful customization options such as presets, custom day
rendering, disabled dates, and configurable month views.

It is designed to be lightweight, reusable, and production-ready for
modern React applications.

---

FEATURES

• Single Date Picker • Date Range Picker • Custom Preset Ranges •
Multiple Month Views • Min / Max Date Support • Disabled Dates Support •
Custom Day Rendering • Optional Footer Controls • Configurable Week
Start • Fully Controlled or Uncontrolled Usage • Lightweight and
Tree-Shakable • Built with modern React practices

---

INSTALLATION

npm install snack-datepicker

or

yarn add snack-datepicker

---

BASIC USAGE

import { DatePicker } from “snack-datepicker”; import { useState } from
“react”;

export default function Example() { const [value, setValue] =
useState(null);

return ( <DatePicker mode=“single” value={value} onChange={(date) =>
setValue(date)} /> ); }

---

DATE RANGE EXAMPLE

import { DatePicker } from “snack-datepicker”; import { useState } from
“react”;

export default function RangeExample() { const [range, setRange] =
useState({ start: null, end: null, });

return ( <DatePicker mode=“range” value={range} onChange={(val) =>
setRange(val)} numberOfMonths={2} /> ); }

---

PRESET RANGE EXAMPLE

import { DatePicker } from “snack-datepicker”;

const presets = [ { label: “Last 7 Days”, getValue: () => { const end =
new Date(); const start = new Date(); start.setDate(end.getDate() - 7);
return { start, end }; }, },];

---

PROPS

mode Type: “single” | “range” Description: Defines picker mode

value Type: Date | DateRange Description: Current selected value

onChange Type: (value) => void Description: Triggered when date changes

onApply Type: (value) => void Description: Triggered when apply button
is clicked

onReset Type: () => void Description: Triggered when reset button is
clicked

minDate Type: Date Description: Minimum selectable date

maxDate Type: Date Description: Maximum selectable date

disabledDates Type: Date[] Description: Array of disabled dates

weekStart Type: 0 | 1 Description: Start of week (0 = Sunday, 1 =
Monday)

numberOfMonths Type: number Description: Number of months displayed

showFooter Type: boolean Description: Show apply/reset footer

className Type: string Description: Custom styling class

renderDay Type: (date: Date) => ReactNode Description: Custom day
renderer

presets Type: PresetRange[] Description: Custom preset date ranges

---

TYPES

export type DatePickerMode = “single” | “range”;

export interface DateRange { start: Date | null; end: Date | null; }

export interface PresetRange { label: string; getValue: () => DateRange;
}

export interface DatePickerProps { mode?: DatePickerMode; value?: Date |
DateRange; onChange?: (value: Date | DateRange) => void; onApply?:
(value: Date | DateRange | undefined) => void; onReset?: () => void;
minDate?: Date; maxDate?: Date; disabledDates?: Date[]; weekStart?: 0 |
1; numberOfMonths?: number; showFooter?: boolean; className?: string;
renderDay?: (date: Date) => ReactNode; presets?: PresetRange[]; }

---

EXPORT

export { DatePicker } from “snack-datepicker”;

---

BUILT WITH

React Radix UI date-fns TailwindCSS Framer Motion Lucide Icons

---

PEER DEPENDENCIES

react >= 18 react-dom >= 18

---

LICENSE

MIT License

---

AUTHOR

Hemanth Dev

---

CONTRIBUTING

Contributions, issues, and feature requests are welcome. Feel free to
open an issue or submit a pull request.
