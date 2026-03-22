import React from "react";
import { format, getMonth } from "date-fns";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface MonthSelectorProps {
  currentMonth: Date;
  onSelect: (month: number) => void;
}

const MonthSelector: React.FC<MonthSelectorProps> = ({
  currentMonth,
  onSelect,
}) => {
  const current = getMonth(currentMonth);

  return (
    <motion.div
      key="month-selector"
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      className="grid grid-cols-3 gap-2 w-full max-w-[320px] mx-auto"
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect(i)}
          className={cn(
            "py-3 text-sm font-medium rounded-lg transition-all active:scale-[0.97]",
            current === i
              ? "bg-primary text-primary-foreground shadow-sm"
              : "hover:bg-gray-100 text-gray-900",
          )}
        >
          {format(new Date(2024, i, 1), "MMM")}
        </button>
      ))}
    </motion.div>
  );
};

export default MonthSelector;
