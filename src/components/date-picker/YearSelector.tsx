import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface YearSelectorProps {
  currentYear: number;
  onSelect: (year: number) => void;
  minDate?: Date;
  maxDate?: Date;
}

const YearSelector: React.FC<YearSelectorProps> = ({
  currentYear,
  onSelect,
  minDate,
  maxDate,
}) => {
  const years = Array.from({ length: 12 }, (_, i) => currentYear - 5 + i);

  return (
    <motion.div
      key="year-selector"
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      className="grid grid-cols-3 gap-2 w-full max-w-[320px] mx-auto"
    >
      {years.map((y) => {
        const disabled =
          (minDate && y < minDate.getFullYear()) ||
          (maxDate && y > maxDate.getFullYear());
        return (
          <button
            key={y}
            type="button"
            disabled={!!disabled}
            onClick={() => !disabled && onSelect(y)}
            className={cn(
              "py-3 text-sm font-medium rounded-lg transition-all active:scale-[0.97]",
              currentYear === y
                ? "bg-primary text-primary-foreground shadow-sm"
                : "hover:bg-gray-100 text-gray-900",
              disabled && "opacity-30 cursor-not-allowed",
            )}
          >
            {y}
          </button>
        );
      })}
    </motion.div>
  );
};

export default YearSelector;
