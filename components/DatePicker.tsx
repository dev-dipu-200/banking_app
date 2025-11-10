'use client';

import { useState, useEffect } from 'react';

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

export interface DatePickerProps {
  is_range?: boolean;
  value?: Date | null;
  rangeValue?: DateRange;
  onChange?: (date: Date | null) => void;
  onRangeChange?: (range: DateRange) => void;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export default function DatePicker({
  is_range = false,
  value,
  rangeValue,
  onChange,
  onRangeChange,
  minDate,
  maxDate,
  placeholder = is_range ? 'Select date range' : 'Select date',
  className = '',
  disabled = false,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);
  const [selectedRange, setSelectedRange] = useState<DateRange>(
    rangeValue || { startDate: null, endDate: null }
  );
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  useEffect(() => {
    if (value) setSelectedDate(value);
  }, [value]);

  useEffect(() => {
    if (rangeValue) setSelectedRange(rangeValue);
  }, [rangeValue]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isDateSelected = (date: Date) => {
    if (is_range) {
      const { startDate, endDate } = selectedRange;
      if (!startDate) return false;
      if (!endDate) return isSameDay(date, startDate);
      return date >= startDate && date <= endDate;
    }
    return selectedDate ? isSameDay(date, selectedDate) : false;
  };

  const isDateInRange = (date: Date) => {
    if (!is_range) return false;
    const { startDate } = selectedRange;
    if (!startDate || !hoverDate) return false;
    const start = startDate < hoverDate ? startDate : hoverDate;
    const end = startDate < hoverDate ? hoverDate : startDate;
    return date >= start && date <= end;
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(year, month, day);

    if (isDateDisabled(clickedDate)) return;

    if (is_range) {
      const { startDate, endDate } = selectedRange;

      if (!startDate || (startDate && endDate)) {
        // Start new selection
        const newRange = { startDate: clickedDate, endDate: null };
        setSelectedRange(newRange);
        onRangeChange?.(newRange);
      } else {
        // Complete the range
        const newRange =
          clickedDate >= startDate
            ? { startDate, endDate: clickedDate }
            : { startDate: clickedDate, endDate: startDate };
        setSelectedRange(newRange);
        onRangeChange?.(newRange);
        setIsOpen(false);
      }
    } else {
      setSelectedDate(clickedDate);
      onChange?.(clickedDate);
      setIsOpen(false);
    }
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(year, month - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1));
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getDisplayValue = () => {
    if (is_range) {
      const { startDate, endDate } = selectedRange;
      if (startDate && endDate) {
        return `${formatDate(startDate)} - ${formatDate(endDate)}`;
      }
      if (startDate) {
        return formatDate(startDate);
      }
      return placeholder;
    }
    return selectedDate ? formatDate(selectedDate) : placeholder;
  };

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className={`relative ${className}`}>
      {/* Input */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className="w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-left flex items-center justify-between"
        style={{
          background: 'var(--background)',
          borderColor: 'var(--border)',
          color: 'var(--text-primary)',
        }}
      >
        <span style={{ color: selectedDate || (selectedRange.startDate) ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
          {getDisplayValue()}
        </span>
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={{ color: 'var(--text-secondary)' }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </button>

      {/* Calendar Dropdown */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div
            className="absolute z-50 mt-2 p-4 rounded-xl shadow-2xl border"
            style={{
              background: 'var(--card-bg)',
              borderColor: 'var(--card-border)',
            }}
          >
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={handlePreviousMonth}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                style={{ color: 'var(--text-primary)' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                {monthNames[month]} {year}
              </div>
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                style={{ color: 'var(--text-primary)' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Day Names */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map((day) => (
                <div
                  key={day}
                  className="text-xs font-semibold text-center py-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for days before month starts */}
              {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                <div key={`empty-${index}`} className="h-10" />
              ))}

              {/* Days of the month */}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1;
                const date = new Date(year, month, day);
                const disabled = isDateDisabled(date);
                const selected = isDateSelected(date);
                const inRange = isDateInRange(date);
                const isToday = isSameDay(date, new Date());

                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleDateClick(day)}
                    onMouseEnter={() => is_range && setHoverDate(date)}
                    disabled={disabled}
                    className={`h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all
                      ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-blue-100 dark:hover:bg-blue-900/30 cursor-pointer'}
                      ${selected ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
                      ${inRange && !selected ? 'bg-blue-100 dark:bg-blue-900/20' : ''}
                      ${isToday && !selected ? 'border-2 border-blue-600' : ''}
                    `}
                    style={{
                      color: selected ? 'white' : 'var(--text-primary)',
                    }}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Today Button */}
            <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
              <button
                type="button"
                onClick={() => {
                  const today = new Date();
                  if (is_range) {
                    const newRange = { startDate: today, endDate: today };
                    setSelectedRange(newRange);
                    onRangeChange?.(newRange);
                  } else {
                    setSelectedDate(today);
                    onChange?.(today);
                  }
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Today
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
