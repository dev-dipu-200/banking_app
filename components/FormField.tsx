'use client';

import { ChangeEvent, InputHTMLAttributes } from 'react';

export type FieldType = 'text' | 'numeric' | 'email' | 'password' | 'tel' | 'url' | 'date' | 'time' | 'datetime-local' | 'file' | 'checkbox' | 'radio' | 'textarea';

export interface FormFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'type' | 'onChange'> {
  label: string;
  field_type: FieldType;
  name: string;
  value?: string | number | boolean;
  onChange?: (value: any, name: string, event?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  helperText?: string;
  required?: boolean;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  containerClassName?: string;

  // File input specific
  accept?: string;
  multiple?: boolean;

  // Radio/Checkbox specific
  options?: Array<{
    label: string;
    value: string | number;
  }>;

  // Textarea specific
  rows?: number;
  cols?: number;

  // Icon support
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function FormField({
  label,
  field_type,
  name,
  value,
  onChange,
  error,
  helperText,
  required = false,
  className = '',
  labelClassName = '',
  inputClassName = '',
  containerClassName = '',
  accept,
  multiple,
  options = [],
  rows = 4,
  cols,
  leftIcon,
  rightIcon,
  disabled,
  placeholder,
  ...rest
}: FormFieldProps) {

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!onChange) return;

    const target = e.target as HTMLInputElement;

    if (field_type === 'checkbox') {
      onChange(target.checked, name, e);
    } else if (field_type === 'radio') {
      onChange(target.value, name, e);
    } else if (field_type === 'file') {
      onChange(target.files, name, e);
    } else if (field_type === 'numeric') {
      onChange(target.value ? Number(target.value) : '', name, e);
    } else {
      onChange(target.value, name, e);
    }
  };

  const baseInputClasses = `
    w-full px-4 py-2.5
    bg-white dark:bg-gray-800
    border rounded-lg
    text-gray-900 dark:text-gray-100
    placeholder-gray-400 dark:placeholder-gray-500
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed
    ${error
      ? 'border-red-500 focus:ring-red-500'
      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
    }
    ${leftIcon ? 'pl-10' : ''}
    ${rightIcon ? 'pr-10' : ''}
    ${inputClassName}
  `;

  const baseLabelClasses = `
    block text-sm font-semibold mb-2
    text-gray-700 dark:text-gray-300
    ${labelClassName}
  `;

  const renderInput = () => {
    switch (field_type) {
      case 'textarea':
        return (
          <textarea
            id={name}
            name={name}
            value={value as string || ''}
            onChange={handleChange}
            disabled={disabled}
            placeholder={placeholder}
            rows={rows}
            cols={cols}
            className={baseInputClasses}
            required={required}
            {...(rest as any)}
          />
        );

      case 'checkbox':
        if (options.length > 0) {
          // Multiple checkboxes
          return (
            <div className="space-y-2">
              {options.map((option, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    name={name}
                    value={option.value}
                    checked={Array.isArray(value) ? value.includes(option.value) : false}
                    onChange={(e) => {
                      if (!onChange) return;
                      const currentValues = Array.isArray(value) ? value : [];
                      const newValues = e.target.checked
                        ? [...currentValues, option.value]
                        : currentValues.filter(v => v !== option.value);
                      onChange(newValues, name, e);
                    }}
                    disabled={disabled}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    {...rest}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          );
        } else {
          // Single checkbox
          return (
            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                id={name}
                name={name}
                checked={value as boolean || false}
                onChange={handleChange}
                disabled={disabled}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                required={required}
                {...rest}
              />
              <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                {label}
              </span>
            </label>
          );
        }

      case 'radio':
        return (
          <div className="space-y-2">
            {options.map((option, index) => (
              <label
                key={index}
                className="flex items-center space-x-3 cursor-pointer group"
              >
                <input
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={handleChange}
                  disabled={disabled}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  required={required}
                  {...rest}
                />
                <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        );

      case 'file':
        return (
          <div className="relative">
            <input
              type="file"
              id={name}
              name={name}
              onChange={handleChange}
              disabled={disabled}
              accept={accept}
              multiple={multiple}
              className={`
                w-full px-4 py-2.5
                bg-white dark:bg-gray-800
                border rounded-lg
                text-gray-900 dark:text-gray-100
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
                dark:file:bg-blue-900 dark:file:text-blue-300
                dark:hover:file:bg-blue-800
                cursor-pointer
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed
                ${error
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                }
                ${inputClassName}
              `}
              required={required}
              {...rest}
            />
          </div>
        );

      case 'numeric':
        return (
          <div className="relative">
            {leftIcon && (
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                {leftIcon}
              </div>
            )}
            <input
              type="number"
              id={name}
              name={name}
              value={value || ''}
              onChange={handleChange}
              disabled={disabled}
              placeholder={placeholder}
              className={baseInputClasses}
              required={required}
              {...rest}
            />
            {rightIcon && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                {rightIcon}
              </div>
            )}
          </div>
        );

      default:
        // text, email, password, tel, url, date, time, datetime-local
        return (
          <div className="relative">
            {leftIcon && (
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                {leftIcon}
              </div>
            )}
            <input
              type={field_type}
              id={name}
              name={name}
              value={value as string || ''}
              onChange={handleChange}
              disabled={disabled}
              placeholder={placeholder}
              className={baseInputClasses}
              required={required}
              {...rest}
            />
            {rightIcon && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                {rightIcon}
              </div>
            )}
          </div>
        );
    }
  };

  const showLabel = field_type !== 'checkbox' || options.length > 0;

  return (
    <div className={`mb-4 ${containerClassName}`}>
      {showLabel && (
        <label htmlFor={name} className={baseLabelClasses}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {renderInput()}

      {helperText && !error && (
        <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      )}

      {error && (
        <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
