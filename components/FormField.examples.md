# FormField Component - Usage Guide

A dynamic, reusable form field component that supports multiple input types with built-in validation, styling, and error handling.

## Features

- **Multiple Field Types**: text, numeric, email, password, tel, url, date, time, datetime-local, file, checkbox, radio, textarea
- **Built-in Validation**: Required fields, error messages, helper text
- **Icon Support**: Left and right icons for inputs
- **Dark Mode Support**: Fully styled for light and dark themes
- **Accessible**: Proper label associations and ARIA attributes
- **Customizable**: Multiple className props for styling
- **TypeScript**: Full type safety with TypeScript interfaces

## Installation

The component is located at `/components/FormField.tsx` and can be imported directly:

```tsx
import FormField from '@/components/FormField';
```

## Basic Usage Examples

### 1. Text Input

```tsx
import FormField from '@/components/FormField';
import { useState } from 'react';

function MyForm() {
  const [name, setName] = useState('');

  return (
    <FormField
      label="Full Name"
      field_type="text"
      name="fullName"
      value={name}
      onChange={(value) => setName(value)}
      placeholder="Enter your full name"
      required
    />
  );
}
```

### 2. Email Input

```tsx
<FormField
  label="Email Address"
  field_type="email"
  name="email"
  value={email}
  onChange={(value) => setEmail(value)}
  placeholder="you@example.com"
  helperText="We'll never share your email"
  required
/>
```

### 3. Numeric Input

```tsx
<FormField
  label="Age"
  field_type="numeric"
  name="age"
  value={age}
  onChange={(value) => setAge(value)}
  placeholder="Enter your age"
  min={18}
  max={100}
  required
/>
```

### 4. Password Input

```tsx
<FormField
  label="Password"
  field_type="password"
  name="password"
  value={password}
  onChange={(value) => setPassword(value)}
  placeholder="Enter your password"
  helperText="Must be at least 8 characters"
  required
/>
```

### 5. Telephone Input

```tsx
<FormField
  label="Phone Number"
  field_type="tel"
  name="phone"
  value={phone}
  onChange={(value) => setPhone(value)}
  placeholder="+1 (555) 000-0000"
  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
/>
```

### 6. Date Input

```tsx
<FormField
  label="Date of Birth"
  field_type="date"
  name="dob"
  value={dob}
  onChange={(value) => setDob(value)}
  required
/>
```

### 7. Time Input

```tsx
<FormField
  label="Appointment Time"
  field_type="time"
  name="appointmentTime"
  value={time}
  onChange={(value) => setTime(value)}
  required
/>
```

### 8. File Input

```tsx
<FormField
  label="Upload Document"
  field_type="file"
  name="document"
  onChange={(files, name) => {
    console.log('Selected files:', files);
    setDocument(files);
  }}
  accept=".pdf,.doc,.docx"
  helperText="Accepted formats: PDF, DOC, DOCX"
  required
/>
```

### 9. Multiple File Upload

```tsx
<FormField
  label="Upload Images"
  field_type="file"
  name="images"
  onChange={(files) => setImages(files)}
  accept="image/*"
  multiple
  helperText="You can select multiple images"
/>
```

### 10. Single Checkbox

```tsx
<FormField
  label="I agree to the terms and conditions"
  field_type="checkbox"
  name="termsAccepted"
  value={termsAccepted}
  onChange={(value) => setTermsAccepted(value)}
  required
/>
```

### 11. Multiple Checkboxes

```tsx
<FormField
  label="Select your interests"
  field_type="checkbox"
  name="interests"
  value={interests} // Array of selected values
  onChange={(values) => setInterests(values)}
  options={[
    { label: 'Technology', value: 'tech' },
    { label: 'Sports', value: 'sports' },
    { label: 'Music', value: 'music' },
    { label: 'Travel', value: 'travel' },
  ]}
/>
```

### 12. Radio Buttons

```tsx
<FormField
  label="Gender"
  field_type="radio"
  name="gender"
  value={gender}
  onChange={(value) => setGender(value)}
  options={[
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ]}
  required
/>
```

### 13. Textarea

```tsx
<FormField
  label="Description"
  field_type="textarea"
  name="description"
  value={description}
  onChange={(value) => setDescription(value)}
  placeholder="Enter a detailed description..."
  rows={6}
  helperText="Maximum 500 characters"
  maxLength={500}
/>
```

## Advanced Usage

### With Icons

```tsx
import { MdEmail, MdLock, MdPerson, MdPhone } from 'react-icons/md';

// Email with icon
<FormField
  label="Email"
  field_type="email"
  name="email"
  value={email}
  onChange={(value) => setEmail(value)}
  leftIcon={<MdEmail size={20} />}
  placeholder="you@example.com"
/>

// Password with icon
<FormField
  label="Password"
  field_type="password"
  name="password"
  value={password}
  onChange={(value) => setPassword(value)}
  leftIcon={<MdLock size={20} />}
  placeholder="Enter password"
/>

// Amount with currency symbol
<FormField
  label="Amount"
  field_type="numeric"
  name="amount"
  value={amount}
  onChange={(value) => setAmount(value)}
  leftIcon={<span className="font-bold">$</span>}
  placeholder="0.00"
/>
```

### With Error Handling

```tsx
function FormWithValidation() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = (value: string) => {
    setEmail(value);

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  return (
    <FormField
      label="Email Address"
      field_type="email"
      name="email"
      value={email}
      onChange={handleEmailChange}
      error={emailError}
      required
    />
  );
}
```

### Custom Styling

```tsx
<FormField
  label="Custom Styled Input"
  field_type="text"
  name="customField"
  value={value}
  onChange={(value) => setValue(value)}
  containerClassName="mb-6"
  labelClassName="text-blue-600 font-bold"
  inputClassName="border-2 border-blue-500 focus:ring-blue-600"
/>
```

### Complete Form Example

```tsx
'use client';

import { useState } from 'react';
import FormField from '@/components/FormField';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    age: '',
    gender: '',
    interests: [],
    terms: false,
    bio: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (value: any, name: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: Record<string, string> = {};

    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    }

    if (!formData.terms) {
      newErrors.terms = 'You must accept the terms';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit form
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-6">Registration Form</h2>

      <FormField
        label="Full Name"
        field_type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="John Doe"
        error={errors.fullName}
        required
      />

      <FormField
        label="Email Address"
        field_type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="john@example.com"
        error={errors.email}
        required
      />

      <FormField
        label="Password"
        field_type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter a strong password"
        helperText="Must be at least 8 characters"
        required
      />

      <FormField
        label="Phone Number"
        field_type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="+1 (555) 000-0000"
      />

      <FormField
        label="Age"
        field_type="numeric"
        name="age"
        value={formData.age}
        onChange={handleChange}
        placeholder="25"
        min={18}
        max={100}
      />

      <FormField
        label="Gender"
        field_type="radio"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        options={[
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' },
          { label: 'Other', value: 'other' },
        ]}
      />

      <FormField
        label="Interests"
        field_type="checkbox"
        name="interests"
        value={formData.interests}
        onChange={handleChange}
        options={[
          { label: 'Technology', value: 'tech' },
          { label: 'Sports', value: 'sports' },
          { label: 'Music', value: 'music' },
        ]}
      />

      <FormField
        label="Bio"
        field_type="textarea"
        name="bio"
        value={formData.bio}
        onChange={handleChange}
        placeholder="Tell us about yourself..."
        rows={4}
      />

      <FormField
        label="I agree to the terms and conditions"
        field_type="checkbox"
        name="terms"
        value={formData.terms}
        onChange={handleChange}
        error={errors.terms}
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Register
      </button>
    </form>
  );
}
```

## Props API Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string | required | Label text for the field |
| `field_type` | FieldType | required | Type of input field |
| `name` | string | required | Field name (used in onChange) |
| `value` | string \| number \| boolean | optional | Current field value |
| `onChange` | function | optional | Callback when value changes: `(value, name, event) => void` |
| `error` | string | optional | Error message to display |
| `helperText` | string | optional | Helper text below the input |
| `required` | boolean | `false` | Mark field as required |
| `disabled` | boolean | `false` | Disable the field |
| `placeholder` | string | optional | Placeholder text |
| `className` | string | optional | Additional classes for the component |
| `labelClassName` | string | optional | Custom classes for the label |
| `inputClassName` | string | optional | Custom classes for the input |
| `containerClassName` | string | optional | Custom classes for the container |
| `leftIcon` | ReactNode | optional | Icon to display on the left |
| `rightIcon` | ReactNode | optional | Icon to display on the right |
| `accept` | string | optional | File types to accept (file input only) |
| `multiple` | boolean | `false` | Allow multiple file selection |
| `options` | Array | optional | Options for radio/checkbox groups |
| `rows` | number | `4` | Number of rows for textarea |
| `cols` | number | optional | Number of columns for textarea |

## Field Types

- `text` - Standard text input
- `numeric` - Number input
- `email` - Email input with validation
- `password` - Password input (hidden text)
- `tel` - Telephone number input
- `url` - URL input
- `date` - Date picker
- `time` - Time picker
- `datetime-local` - Date and time picker
- `file` - File upload
- `checkbox` - Single or multiple checkboxes
- `radio` - Radio button group
- `textarea` - Multi-line text area

## Styling

The component uses Tailwind CSS and supports:
- Light and dark mode
- Hover and focus states
- Error states with red highlighting
- Disabled states
- Custom styling via className props

## Notes

- The component is fully controlled, so you need to manage state
- File inputs return FileList objects in onChange
- Checkbox groups return arrays of selected values
- All standard HTML input attributes are supported via spread props
