// DatePicker.tsx
import React, { useState } from "react";
import Label from "@/components/atoms/Label";

// ---------- Type Definitions ----------
type DatePickerProps = {
  pickedDate?: Date;  
  onChange?: (date: Date | undefined) => void;
  className?: string;
  label?: string;
  isRequired?: boolean; 
};

type CalendarProps = {
  pickedDate?: Date;
  onChange?: (date: Date) => void;
  className?: string;
};

// ---------- Utility Functions ----------
// Combines class names - similar to shadcn's cn utility
const cn = (...classes: (string | boolean | undefined)[]): string => {
  return classes.filter(Boolean).join(" ");
};

// Format date for display
const formatDate = (date: Date | undefined): string => {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

// Get days in a month
const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

// ---------- SVG Icons ----------
const CalendarIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const ChevronLeftIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const ChevronRightIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

// ---------- Calendar Component ----------
const Calendar: React.FC<CalendarProps> = ({
  pickedDate,
  onChange,
  className,
}) => {
  const [viewDate, setViewDate] = useState<Date>(
    pickedDate || new Date()
  );

  // Days of the week
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Get month and year for header
  const monthYear = viewDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  // Get first day of the month (0-6, Sunday is 0)
  const firstDayOfMonth = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth(),
    1
  ).getDay();

  // Get days in month (28-31)
  const daysInMonth = getDaysInMonth(
    viewDate.getFullYear(),
    viewDate.getMonth()
  );

  // Handle month navigation
  const prevMonth = () => {
    setViewDate(
      new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setViewDate(
      new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1)
    );
  };

  // Check if a day is the selected date
  const isSelectedDay = (day: number): boolean => {
    if (!pickedDate) return false;
    return (
      day === pickedDate.getDate() &&
      viewDate.getMonth() === pickedDate.getMonth() &&
      viewDate.getFullYear() === pickedDate.getFullYear()
    );
  };

  // Check if a day is today
  const isToday = (day: number): boolean => {
    const today = new Date();
    return (
      day === today.getDate() &&
      viewDate.getMonth() === today.getMonth() &&
      viewDate.getFullYear() === today.getFullYear()
    );
  };

  // Handle day selection
  const selectDay = (day: number) => {
    const newDate = new Date(
      viewDate.getFullYear(),
      viewDate.getMonth(),
      day
    );
    onChange?.(newDate);
  };

  return (
    <div className={cn("p-3 select-none", className)}>
      {/* Header - Month and Year */}
      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          onClick={prevMonth}
          className="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
          aria-label="Previous month"
        >
          <ChevronLeftIcon />
        </button>
        <div className="font-medium">{monthYear}</div>
        <button
          type="button"
          onClick={nextMonth}
          className="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
          aria-label="Next month"
        >
          <ChevronRightIcon />
        </button>
      </div>

      {/* Days of week header */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center text-xs text-gray-500 py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty spaces for days before the first day of month */}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="h-8 w-8" />
        ))}

        {/* Days of the month */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          return (
            <button
              key={`day-${day}`}
              type="button"
              onClick={() => selectDay(day)}
              className={cn(
                "h-8 w-8 rounded-md flex items-center justify-center text-sm focus:outline-none",
                isSelectedDay(day) && "bg-black text-white",
                isToday(day) && !isSelectedDay(day) && "border border-gray-300",
                !isSelectedDay(day) && "hover:bg-gray-100"
              )}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ---------- DatePicker Component ----------
const DatePicker: React.FC<DatePickerProps> = ({
  pickedDate,
  onChange,
  className,
  label,
  isRequired,
}) => {
  const [open, setOpen] = useState(false);
  const datePickerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value ? new Date(event.target.value) : undefined;
    if (onChange) onChange(newDate);
  };

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <Label text={label} isRequired={isRequired} />
      )}
      <div ref={datePickerRef} className="relative w-full">
        {/* Button trigger */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={cn(
            "w-full flex items-center justify-center gap-2 pl-4 pr-4 py-2 border border-black-five rounded-[12px] focus:outline-none focus:ring-1 focus:ring-black-five focus:border-black-five bg-transparent",
            !pickedDate && "text-black-five"
          )}
        >
          <CalendarIcon />
          <span>{pickedDate ? formatDate(pickedDate) : "Pick a date"}</span>
        </button>

        {/* Calendar dropdown */}
        {open && (
          <div className="left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-md z-50">
            <Calendar
              pickedDate={pickedDate}
              onChange={(date) => {
                onChange?.(date);
                setOpen(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Export the DatePicker component as the default export
export default DatePicker;