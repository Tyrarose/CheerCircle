// DatePicker.tsx
import React, { useState } from "react";
import Label from "@/components/atoms/Label";

// ---------- Type Definitions ----------
type DatePickerProps = {
  pickedDate?: Date;  
  onChange?: (date: Date | undefined) => void;
  className?: string;
  labelText?: React.ReactNode;
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
  const [mode, setMode] = useState<"day" | "month" | "year">("year");

  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const handleMonthClick = (month: number) => {
    setViewDate(new Date(currentYear, month, 1));
    setMode("day");
  };

  const handleYearClick = (year: number) => {
    setViewDate(new Date(year, currentMonth, 1));
    setMode("month");
  };

  const selectDay = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day);
    onChange?.(newDate);
  };

  const isToday = (day: number): boolean => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  const isSelectedDay = (day: number): boolean => {
    if (!pickedDate) return false;
    return (
      day === pickedDate.getDate() &&
      currentMonth === pickedDate.getMonth() &&
      currentYear === pickedDate.getFullYear()
    );
  };

  const renderHeader = () => (
    <div className="flex items-center justify-between mb-2">
      <button onClick={() => {
        if (mode === "year") setViewDate(new Date(currentYear - 12, 0, 1));
        else if (mode === "month") setViewDate(new Date(currentYear - 1, 0, 1));
        else setViewDate(new Date(currentYear, currentMonth - 1, 1));
      }} className="p-2 rounded-md hover:bg-gray-100">
        <ChevronLeftIcon />
      </button>
      <div className="flex items-center gap-2">
        <button onClick={() => setMode("month")} className="font-semibold">
          {viewDate.toLocaleDateString("en-US", { month: "long" })}
        </button>
        <button onClick={() => setMode("year")} className="font-semibold">
          {currentYear}
        </button>
      </div>
      <button onClick={() => {
        if (mode === "year") setViewDate(new Date(currentYear + 12, 0, 1));
        else if (mode === "month") setViewDate(new Date(currentYear + 1, 0, 1));
        else setViewDate(new Date(currentYear, currentMonth + 1, 1));
      }} className="p-2 rounded-md hover:bg-gray-100">
        <ChevronRightIcon />
      </button>
    </div>
  );

  const renderDays = () => (
    <>
      <div className="grid grid-cols-7 gap-1 mb-1">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center text-xs text-gray-500 py-1">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="h-8 w-8" />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          return (
            <button
              key={day}
              onClick={() => selectDay(day)}
              className={cn(
                "h-8 w-8 rounded-md text-sm flex items-center justify-center",
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
    </>
  );

  const renderMonths = () => {
    const months = Array.from({ length: 12 }, (_, i) =>
      new Date(0, i).toLocaleString("default", { month: "short" })
    );

    return (
      <div className="grid grid-cols-4 gap-2">
        {months.map((month, i) => (
          <button
            key={month}
            onClick={() => handleMonthClick(i)}
            className="p-2 rounded-md hover:bg-gray-100 text-sm"
          >
            {month}
          </button>
        ))}
      </div>
    );
  };

  const renderYears = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 40 }, (_, i) => currentYear - i);

    return (
      <div className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => handleYearClick(year)}
            className="p-2 rounded-md hover:bg-gray-100 text-sm"
          >
            {year}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className={cn("p-3 select-none", className)}>
      {renderHeader()}
      {mode === "day" && renderDays()}
      {mode === "month" && renderMonths()}
      {mode === "year" && renderYears()}
    </div>
  );
};

// ---------- DatePicker Component ----------
const DatePicker: React.FC<DatePickerProps> = ({
  pickedDate,
  onChange,
  className,
  labelText,
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

  return (
    <div className={cn("w-full", className)}>
      {labelText && (
        <Label text={labelText}/>
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

export default DatePicker;