# AccountOpeningForm Component Documentation

A comprehensive multi-step form component for opening new bank accounts with personal information, account details, and document uploads.

## Features

- ✅ 3-step progressive form flow
- ✅ Step indicator with visual progress
- ✅ Personal information collection
- ✅ Account details and preferences
- ✅ Dynamic document upload with multiple files
- ✅ Step-by-step validation
- ✅ Theme-aware styling (works with all 5 themes)
- ✅ Integrated DatePicker for DOB
- ✅ Toast notifications for errors and progress
- ✅ Full TypeScript support
- ✅ Mobile responsive

## Import

```tsx
import AccountOpeningForm from '@/components/AccountOpeningForm';
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onSubmit` | `(data: FormData) => void` | Yes | Callback when form is submitted |
| `onCancel` | `() => void` | No | Callback when form is cancelled |

## Form Steps

### Step 1: Personal Information

Collects basic personal details:

- **First Name** (required)
- **Last Name** (required)
- **Email** (required)
- **Phone** (required)
- **Date of Birth** (required) - Uses DatePicker component
- **Address** (required)
- **City** (required)
- **State** (required)
- **ZIP Code** (required)

### Step 2: Account Information

Collects account-specific details:

- **Account Type** (required) - Dropdown: Savings, Checking, Business
- **Initial Deposit** (required) - Number input
- **Account Purpose** (required)
- **Employment Status** (required) - Dropdown: Employed, Self-employed, Unemployed, Retired, Student
- **Annual Income** (required) - Number input

### Step 3: Document Upload

Dynamic document management:

- **Add/Remove Documents** - Dynamically add or remove document entries
- **Document Type** - Text input for document name (e.g., "ID Proof", "Address Proof")
- **File Upload** - Accepts PDF, JPG, PNG files
- **Default Documents** - Starts with "ID Proof" and "Address Proof"

## TypeScript Interfaces

```typescript
interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date | null;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

interface AccountInfo {
  accountType: 'savings' | 'checking' | 'business';
  initialDeposit: string;
  purpose: string;
  employmentStatus: 'employed' | 'self-employed' | 'unemployed' | 'retired' | 'student';
  annualIncome: string;
}

interface Document {
  id: string;
  type: string;
  file: File | null;
  fileName: string;
}

interface AccountOpeningFormProps {
  onSubmit: (data: {
    personalInfo: PersonalInfo;
    accountInfo: AccountInfo;
    documents: Document[];
  }) => void;
  onCancel?: () => void;
}
```

## Usage Examples

### Example 1: Basic Usage with Modal

Typical implementation with Modal component:

```tsx
'use client';

import { useState } from 'react';
import Modal from '@/components/Modal';
import AccountOpeningForm from '@/components/AccountOpeningForm';
import { useToast } from '@/components/ToastProvider';

export default function AccountsPage() {
  const toast = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSubmit = (formData: any) => {
    console.log('Form submitted:', formData);
    // Send data to API
    toast.success('Account application submitted!', 'Success');
    setIsFormOpen(false);
  };

  const handleCancel = () => {
    toast.info('Account application cancelled', 'Cancelled');
    setIsFormOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsFormOpen(true)}>
        Open New Account
      </button>

      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Open New Account"
        size="large"
      >
        <AccountOpeningForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Modal>
    </div>
  );
}
```

### Example 2: With API Integration

Submit form data to backend API:

```tsx
'use client';

import { useState } from 'react';
import Modal from '@/components/Modal';
import AccountOpeningForm from '@/components/AccountOpeningForm';
import { useToast } from '@/components/ToastProvider';
import { api } from '@/lib/api';

export default function AccountsPage() {
  const toast = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);

    try {
      // Create FormData for file upload
      const submitData = new FormData();

      // Add personal info
      submitData.append('personalInfo', JSON.stringify(formData.personalInfo));

      // Add account info
      submitData.append('accountInfo', JSON.stringify(formData.accountInfo));

      // Add document files
      formData.documents.forEach((doc: any, index: number) => {
        if (doc.file) {
          submitData.append(`document_${index}`, doc.file);
          submitData.append(`document_${index}_type`, doc.type);
        }
      });

      // Send to API
      const response = await api.upload('/api/accounts/open', submitData);

      toast.success('Account application submitted successfully!', 'Success');
      setIsFormOpen(false);

      // Optionally redirect or refresh data
      // router.push('/admin/accounts');

    } catch (error: any) {
      toast.error(error.message || 'Failed to submit application', 'Error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <button onClick={() => setIsFormOpen(true)}>
        Open New Account
      </button>

      <Modal
        isOpen={isFormOpen}
        onClose={() => !isSubmitting && setIsFormOpen(false)}
        title="Open New Account"
        size="large"
      >
        <AccountOpeningForm
          onSubmit={handleSubmit}
          onCancel={() => !isSubmitting && setIsFormOpen(false)}
        />
      </Modal>
    </div>
  );
}
```

### Example 3: Process Submitted Data

Handle the submitted data structure:

```tsx
const handleSubmit = (formData: any) => {
  // Access personal information
  const { firstName, lastName, email, dateOfBirth } = formData.personalInfo;

  // Access account information
  const { accountType, initialDeposit } = formData.accountInfo;

  // Access documents
  formData.documents.forEach((doc: any) => {
    console.log(`Document: ${doc.type}`);
    console.log(`File: ${doc.fileName}`);
    console.log(`File object:`, doc.file);
  });

  // Format date of birth
  if (dateOfBirth) {
    const formattedDOB = dateOfBirth.toISOString().split('T')[0];
    console.log('DOB:', formattedDOB);
  }

  // Send to backend...
};
```

### Example 4: Pre-fill Form Data

Pre-populate form with existing user data:

```tsx
// Note: Current component doesn't support initial values prop
// But you could modify the component to accept initialData prop:

interface AccountOpeningFormProps {
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  initialData?: {
    personalInfo?: Partial<PersonalInfo>;
    accountInfo?: Partial<AccountInfo>;
  };
}

// Then in your component:
useEffect(() => {
  if (initialData?.personalInfo) {
    setPersonalInfo((prev) => ({ ...prev, ...initialData.personalInfo }));
  }
  if (initialData?.accountInfo) {
    setAccountInfo((prev) => ({ ...prev, ...initialData.accountInfo }));
  }
}, [initialData]);
```

### Example 5: Custom Validation

Add custom validation before submission:

```tsx
const handleSubmit = (formData: any) => {
  // Custom validation
  const { dateOfBirth } = formData.personalInfo;

  // Check age (must be 18+)
  if (dateOfBirth) {
    const age = new Date().getFullYear() - dateOfBirth.getFullYear();
    if (age < 18) {
      toast.error('You must be at least 18 years old to open an account', 'Validation Error');
      return;
    }
  }

  // Check minimum deposit
  const deposit = parseFloat(formData.accountInfo.initialDeposit);
  if (deposit < 100) {
    toast.error('Minimum initial deposit is $100', 'Validation Error');
    return;
  }

  // Check if at least one document uploaded
  const hasDocuments = formData.documents.some((doc: any) => doc.file !== null);
  if (!hasDocuments) {
    toast.error('Please upload at least one document', 'Validation Error');
    return;
  }

  // Proceed with submission
  submitToAPI(formData);
};
```

## Form Data Structure

When the form is submitted, the `onSubmit` callback receives:

```javascript
{
  personalInfo: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "555-1234",
    dateOfBirth: Date object,
    address: "123 Main St",
    city: "New York",
    state: "NY",
    zipCode: "10001"
  },
  accountInfo: {
    accountType: "savings",
    initialDeposit: "5000",
    purpose: "Savings for future",
    employmentStatus: "employed",
    annualIncome: "75000"
  },
  documents: [
    {
      id: "1",
      type: "ID Proof",
      file: File object,
      fileName: "passport.pdf"
    },
    {
      id: "2",
      type: "Address Proof",
      file: File object,
      fileName: "utility-bill.jpg"
    }
  ]
}
```

## Step Navigation

### Built-in Validation

Each step validates before allowing navigation:

**Step 1 → Step 2:**
- All personal info fields must be filled
- Date of birth must be selected
- Email must be valid format

**Step 2 → Step 3:**
- All account info fields must be filled
- Initial deposit must be a valid number
- Annual income must be a valid number

**Step 3 → Submit:**
- No specific validation (documents are optional)
- But you can add custom validation in `onSubmit`

### Navigation Buttons

- **Next**: Validates current step and moves forward
- **Previous**: Goes back without validation
- **Cancel**: Calls `onCancel` callback (if provided)
- **Submit**: Calls `onSubmit` with all form data

## Document Management

### Add Document

Click "Add Document" button to add a new document entry with empty fields.

### Remove Document

Click "Remove" button next to a document to delete it from the list.

### File Upload

Click "Choose File" to upload:
- Supported formats: PDF (.pdf), JPEG (.jpg, .jpeg), PNG (.png)
- File size: No built-in limit (add validation in `onSubmit` if needed)
- Each document stores the File object and filename

### Access Uploaded Files

```tsx
const handleSubmit = (formData: any) => {
  formData.documents.forEach((doc: any) => {
    if (doc.file) {
      // File object available here
      console.log('File name:', doc.file.name);
      console.log('File size:', doc.file.size);
      console.log('File type:', doc.file.type);

      // Can read file content if needed
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log('File content:', e.target?.result);
      };
      reader.readAsDataURL(doc.file);
    }
  });
};
```

## Styling

The form uses CSS variables for theming:

- `var(--background)` - Input backgrounds
- `var(--border)` - Input borders
- `var(--text-primary)` - Primary text (labels, values)
- `var(--text-secondary)` - Secondary text (placeholders)
- `var(--accent-from)` & `var(--accent-to)` - Buttons, progress indicator

Works perfectly with all 5 themes: Light, Dark, Orange, Purple, Green.

## Progress Indicator

Visual step indicator shows:
- **Completed steps**: Green checkmark with green line
- **Current step**: Blue circle with number
- **Future steps**: Gray circle with number

## Best Practices

1. **Always use with Modal**: The form is designed to be used inside a Modal component with `size="large"`
2. **Handle onSubmit**: Always provide proper submit handler with API integration
3. **Validate data**: Add custom validation in `onSubmit` before sending to API
4. **Show feedback**: Use toast notifications for success/error states
5. **Handle files properly**: Convert File objects to FormData for API upload
6. **Disable during submission**: Prevent double-submission by disabling form during API call
7. **Handle errors gracefully**: Catch API errors and show user-friendly messages

## Common Patterns

### Check if Step is Complete

```tsx
const isStep1Complete = () => {
  return personalInfo.firstName &&
         personalInfo.lastName &&
         personalInfo.email &&
         personalInfo.phone &&
         personalInfo.dateOfBirth &&
         personalInfo.address &&
         personalInfo.city &&
         personalInfo.state &&
         personalInfo.zipCode;
};
```

### Format Currency

```tsx
const formatCurrency = (value: string) => {
  const number = parseFloat(value);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(number);
};

// Display: formatCurrency(formData.accountInfo.initialDeposit)
```

### Calculate Application Fee

```tsx
const calculateFee = (accountType: string, deposit: string) => {
  const amount = parseFloat(deposit);

  switch (accountType) {
    case 'savings':
      return amount * 0.01; // 1% fee
    case 'checking':
      return 25; // Flat $25 fee
    case 'business':
      return amount * 0.02; // 2% fee
    default:
      return 0;
  }
};
```

## Accessibility

- **Keyboard navigation**: Tab through all form fields
- **Required fields**: Marked with asterisk (*)
- **Labels**: All inputs have associated labels
- **Error messages**: Shown via toast notifications
- **Focus management**: Proper focus states on all inputs

## Troubleshooting

### Form not submitting

Check that all required fields in all steps are filled:

```tsx
// In your onSubmit handler
console.log('Form data:', formData);
// Check if any required fields are empty
```

### Date not updating

Make sure DatePicker callback is properly connected:

```tsx
<DatePicker
  value={personalInfo.dateOfBirth}
  onChange={(date) => handlePersonalInfoChange('dateOfBirth', date)}
/>
```

### Documents not uploading

Ensure you're using FormData for file upload:

```tsx
const formData = new FormData();
documents.forEach((doc, index) => {
  if (doc.file) {
    formData.append(`file_${index}`, doc.file);
  }
});
```

### Can't go to next step

Check console for validation error toast messages. Ensure all required fields are filled.

## Live Demo

Visit `/admin/accounts` to see the AccountOpeningForm in action:
- Click "Open New Account" button
- Form opens in a Modal
- Complete all 3 steps
- Upload documents
- Submit the form

---

For more information, see the component source: `/components/AccountOpeningForm.tsx`
