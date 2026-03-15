# 📅 Snack Datepicker

A modern **React Date Picker & Date Range Picker** built for flexibility, performance, and developer experience.

**Snack Datepicker** provides a clean, customizable, and lightweight component for selecting **single dates** or **date ranges**, with powerful configuration options such as presets, disabled dates, multi-month view, and custom day rendering.

Ideal for **analytics dashboards, booking systems, reporting tools, admin panels, data filters, and forms**.

<p align="center">
  <img src="https://github.com/hemanth-user13/Snack-DatePicker/blob/master/src/assests/Screenshot%202026-03-15%20183307.png" width="900"/>
</p>

<p align="center">
  <img src="https://github.com/hemanth-user13/Snack-DatePicker/blob/master/src/assests/Screenshot%202026-03-15%20183352.png" width="900"/>
</p>

## Features

- 📅 **Single Date Picker** — clean, minimal single date selection
- 📆 **Date Range Picker** — intuitive start and end date selection
- 🎯 **Preset date ranges** — quickly jump to common ranges like Last 7 Days or Last 30 Days
- 📊 **Multi-month view** — display multiple months simultaneously
- 🔒 **Min / Max date restrictions** — constrain selectable dates to a valid range
- 🚫 **Disabled dates support** — block out specific unavailable dates
- 🎨 **Custom day renderer** — full control over how each day cell looks
- ⚡ **Lightweight & fast** — minimal bundle impact, tree-shakable
- 🧩 **Highly customizable** — adapt to any design system
- ⚛️ **Built for modern React** — hooks-first, no legacy patterns

## Installation

```bash
npm install snack-datepicker
# or
yarn add snack-datepicker
```

### Peer Dependencies

Ensure your project has these installed:

```bash
npm install react react-dom
```

## Usage

> [!IMPORTANT]
> You must import the stylesheet for the datepicker to display correctly:
>
> ```tsx
> import "snack-datepicker/dist/style.css";
> ```

### Basic

```tsx
import { DatePicker } from "snack-datepicker";
import "snack-datepicker/dist/style.css";

function App() {
  return <DatePicker mode="single" onChange={(date) => console.log(date)} />;
}

export default App;
```

### Date Range Example

```tsx
import { DatePicker } from "snack-datepicker";
import { useState } from "react";

function App() {
  const [range, setRange] = useState({
    start: null,
    end: null,
  });

  return (
    <DatePicker
      mode="range"
      value={range}
      onChange={(value) => setRange(value)}
      numberOfMonths={2}
    />
  );
}
```

### Preset Range Example

```tsx
import { DatePicker } from "snack-datepicker";

const presets = [
  {
    label: "Last 7 Days",
    getValue: () => {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 7);
      return { start, end };
    },
  },
  {
    label: "Last 30 Days",
    getValue: () => {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 30);
      return { start, end };
    },
  },
];

function App() {
  return <DatePicker mode="range" presets={presets} />;
}
```

### Props API

| Prop             | Type                        | Description                             |
| ---------------- | --------------------------- | --------------------------------------- |
| `mode`           | `"single" \| "range"`       | Date picker mode                        |
| `value`          | `Date \| DateRange`         | Current selected value                  |
| `onChange`       | `(value) => void`           | Triggered when date changes             |
| `onApply`        | `(value) => void`           | Triggered when apply button is clicked  |
| `onReset`        | `() => void`                | Reset the current selection             |
| `minDate`        | `Date`                      | Minimum selectable date                 |
| `maxDate`        | `Date`                      | Maximum selectable date                 |
| `disabledDates`  | `Date[]`                    | Disable specific dates                  |
| `weekStart`      | `0 \| 1`                    | Week start day (0 = Sunday, 1 = Monday) |
| `numberOfMonths` | `number`                    | Number of months displayed at once      |
| `showFooter`     | `boolean`                   | Show apply / reset footer               |
| `className`      | `string`                    | Custom CSS class for styling            |
| `renderDay`      | `(date: Date) => ReactNode` | Custom day cell renderer                |
| `presets`        | `PresetRange[]`             | Preset date range options               |

### Types

```ts
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
```

## Built With

[React](https://react.dev) · [Radix UI](https://www.radix-ui.com) · [date-fns](https://date-fns.org) · [TailwindCSS](https://tailwindcss.com) · [Framer Motion](https://www.framer.com/motion) · [Lucide Icons](https://lucide.dev)

## License

MIT

## Author

**Hemanth Dev**
