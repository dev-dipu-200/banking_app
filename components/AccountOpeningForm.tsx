'use client';

import { useState } from 'react';
import DatePicker, { DateRange } from './DatePicker';
import { useToast } from './ToastProvider';

interface Document {
  id: string;
  type: string;
  file: File | null;
  fileName: string;
}

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
  accountType: string;
  initialDeposit: string;
  purpose: string;
  employmentStatus: string;
  annualIncome: string;
}

export interface AccountOpeningFormProps {
  onSubmit?: (data: {
    personal: PersonalInfo;
    account: AccountInfo;
    documents: Document[];
  }) => void;
  onCancel?: () => void;
}

export default function AccountOpeningForm({ onSubmit, onCancel }: AccountOpeningFormProps) {
  const toast = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  // Step 1: Personal Information
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: null,
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  // Step 2: Account Information
  const [accountInfo, setAccountInfo] = useState<AccountInfo>({
    accountType: 'savings',
    initialDeposit: '',
    purpose: '',
    employmentStatus: 'employed',
    annualIncome: '',
  });

  // Step 3: Documents
  const [documents, setDocuments] = useState<Document[]>([
    { id: '1', type: 'ID Proof', file: null, fileName: '' },
    { id: '2', type: 'Address Proof', file: null, fileName: '' },
  ]);

  const handlePersonalChange = (field: keyof PersonalInfo, value: any) => {
    setPersonalInfo({ ...personalInfo, [field]: value });
  };

  const handleAccountChange = (field: keyof AccountInfo, value: string) => {
    setAccountInfo({ ...accountInfo, [field]: value });
  };

  const handleAddDocument = () => {
    const newDoc: Document = {
      id: Date.now().toString(),
      type: '',
      file: null,
      fileName: '',
    };
    setDocuments([...documents, newDoc]);
  };

  const handleRemoveDocument = (id: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  const handleDocumentTypeChange = (id: string, type: string) => {
    setDocuments(
      documents.map((doc) => (doc.id === id ? { ...doc, type } : doc))
    );
  };

  const handleFileChange = (id: string, file: File | null) => {
    setDocuments(
      documents.map((doc) =>
        doc.id === id ? { ...doc, file, fileName: file?.name || '' } : doc
      )
    );
  };

  const validateStep1 = () => {
    const { firstName, lastName, email, phone, dateOfBirth, address, city, state, zipCode } = personalInfo;
    if (!firstName || !lastName || !email || !phone || !dateOfBirth || !address || !city || !state || !zipCode) {
      toast.error('Please fill all required fields', 'Validation Error');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address', 'Validation Error');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    const { accountType, initialDeposit, purpose, employmentStatus, annualIncome } = accountInfo;
    if (!accountType || !initialDeposit || !purpose || !employmentStatus || !annualIncome) {
      toast.error('Please fill all required fields', 'Validation Error');
      return false;
    }
    if (isNaN(Number(initialDeposit)) || Number(initialDeposit) < 0) {
      toast.error('Please enter a valid initial deposit amount', 'Validation Error');
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    const hasEmptyType = documents.some((doc) => !doc.type);
    const hasEmptyFile = documents.some((doc) => !doc.file);

    if (hasEmptyType) {
      toast.error('Please specify document type for all documents', 'Validation Error');
      return false;
    }
    if (hasEmptyFile) {
      toast.error('Please upload all required documents', 'Validation Error');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      toast.success(`Step ${currentStep + 1} of ${totalSteps}`, 'Progress');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (!validateStep3()) return;

    const formData = {
      personal: personalInfo,
      account: accountInfo,
      documents,
    };

    toast.success('Account opening form submitted successfully!', 'Success');
    onSubmit?.(formData);
  };

  const renderStepIndicator = () => {
    const steps = [
      { number: 1, label: 'Personal Info' },
      { number: 2, label: 'Account Details' },
      { number: 3, label: 'Documents' },
    ];

    return (
      <div className="mb-8">
        <div className="flex items-center">
          {steps.map((step, index) => (
            <div key={step.number} className="flex flex-col items-center flex-1">
              {/* Step circle and line container */}
              <div className="w-full flex items-center">
                <div className="flex-shrink-0">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                      step.number < currentStep
                        ? 'bg-green-600 text-white'
                        : step.number === currentStep
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                    style={{
                      color: step.number <= currentStep ? 'white' : 'var(--text-secondary)',
                    }}
                  >
                    {step.number < currentStep ? '✓' : step.number}
                  </div>
                </div>
                {index < totalSteps - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-all ${
                      step.number < currentStep ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  />
                )}
              </div>
              {/* Step label aligned with circle */}
              <div className="mt-2 text-xs font-semibold text-center" style={{ color: 'var(--text-secondary)' }}>
                {step.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {renderStepIndicator()}

      {/* Step 1: Personal Information */}
      {currentStep === 1 && (
        <div className="space-y-4 animate-fade-in">
          <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                First Name *
              </label>
              <input
                type="text"
                value={personalInfo.firstName}
                onChange={(e) => handlePersonalChange('firstName', e.target.value)}
                className="w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  background: 'var(--background)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)',
                }}
                placeholder="Enter first name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Last Name *
              </label>
              <input
                type="text"
                value={personalInfo.lastName}
                onChange={(e) => handlePersonalChange('lastName', e.target.value)}
                className="w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  background: 'var(--background)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)',
                }}
                placeholder="Enter last name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Email *
              </label>
              <input
                type="email"
                value={personalInfo.email}
                onChange={(e) => handlePersonalChange('email', e.target.value)}
                className="w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  background: 'var(--background)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)',
                }}
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Phone *
              </label>
              <input
                type="tel"
                value={personalInfo.phone}
                onChange={(e) => handlePersonalChange('phone', e.target.value)}
                className="w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  background: 'var(--background)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)',
                }}
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Date of Birth *
            </label>
            <DatePicker
              is_range={false}
              value={personalInfo.dateOfBirth}
              onChange={(date) => handlePersonalChange('dateOfBirth', date)}
              maxDate={new Date()}
              placeholder="Select your date of birth"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Address *
            </label>
            <input
              type="text"
              value={personalInfo.address}
              onChange={(e) => handlePersonalChange('address', e.target.value)}
              className="w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                background: 'var(--background)',
                borderColor: 'var(--border)',
                color: 'var(--text-primary)',
              }}
              placeholder="123 Main Street"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                City *
              </label>
              <input
                type="text"
                value={personalInfo.city}
                onChange={(e) => handlePersonalChange('city', e.target.value)}
                className="w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  background: 'var(--background)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)',
                }}
                placeholder="City"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                State *
              </label>
              <input
                type="text"
                value={personalInfo.state}
                onChange={(e) => handlePersonalChange('state', e.target.value)}
                className="w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  background: 'var(--background)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)',
                }}
                placeholder="State"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                ZIP Code *
              </label>
              <input
                type="text"
                value={personalInfo.zipCode}
                onChange={(e) => handlePersonalChange('zipCode', e.target.value)}
                className="w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  background: 'var(--background)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)',
                }}
                placeholder="12345"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Account Information */}
      {currentStep === 2 && (
        <div className="space-y-4 animate-fade-in">
          <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Account Details
          </h3>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Account Type *
            </label>
            <select
              value={accountInfo.accountType}
              onChange={(e) => handleAccountChange('accountType', e.target.value)}
              className="w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                background: 'var(--background)',
                borderColor: 'var(--border)',
                color: 'var(--text-primary)',
              }}
            >
              <option value="savings">Savings Account</option>
              <option value="checking">Checking Account</option>
              <option value="business">Business Account</option>
              <option value="premium">Premium Account</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Initial Deposit ($) *
            </label>
            <input
              type="number"
              value={accountInfo.initialDeposit}
              onChange={(e) => handleAccountChange('initialDeposit', e.target.value)}
              className="w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                background: 'var(--background)',
                borderColor: 'var(--border)',
                color: 'var(--text-primary)',
              }}
              placeholder="1000"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Purpose of Account *
            </label>
            <textarea
              value={accountInfo.purpose}
              onChange={(e) => handleAccountChange('purpose', e.target.value)}
              className="w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                background: 'var(--background)',
                borderColor: 'var(--border)',
                color: 'var(--text-primary)',
              }}
              placeholder="Describe the purpose of opening this account"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Employment Status *
            </label>
            <select
              value={accountInfo.employmentStatus}
              onChange={(e) => handleAccountChange('employmentStatus', e.target.value)}
              className="w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                background: 'var(--background)',
                borderColor: 'var(--border)',
                color: 'var(--text-primary)',
              }}
            >
              <option value="employed">Employed</option>
              <option value="self-employed">Self-Employed</option>
              <option value="unemployed">Unemployed</option>
              <option value="student">Student</option>
              <option value="retired">Retired</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Annual Income ($) *
            </label>
            <input
              type="number"
              value={accountInfo.annualIncome}
              onChange={(e) => handleAccountChange('annualIncome', e.target.value)}
              className="w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                background: 'var(--background)',
                borderColor: 'var(--border)',
                color: 'var(--text-primary)',
              }}
              placeholder="50000"
              min="0"
            />
          </div>
        </div>
      )}

      {/* Step 3: Documents */}
      {currentStep === 3 && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Upload Documents
            </h3>
            <button
              type="button"
              onClick={handleAddDocument}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
            >
              + Add Document
            </button>
          </div>

          {documents.map((doc, index) => (
            <div
              key={doc.id}
              className="p-4 border-2 rounded-xl space-y-3"
              style={{ borderColor: 'var(--border)', background: 'var(--card-bg)' }}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Document {index + 1}
                </span>
                {documents.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveDocument(doc.id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  Document Type *
                </label>
                <select
                  value={doc.type}
                  onChange={(e) => handleDocumentTypeChange(doc.id, e.target.value)}
                  className="w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{
                    background: 'var(--background)',
                    borderColor: 'var(--border)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <option value="">Select document type</option>
                  <option value="ID Proof">ID Proof (Driver's License, Passport)</option>
                  <option value="Address Proof">Address Proof (Utility Bill, Lease)</option>
                  <option value="Income Proof">Income Proof (Pay Stub, Tax Return)</option>
                  <option value="Bank Statement">Bank Statement</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  Upload File *
                </label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(doc.id, e.target.files?.[0] || null)}
                  className="w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{
                    background: 'var(--background)',
                    borderColor: 'var(--border)',
                    color: 'var(--text-primary)',
                  }}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                {doc.fileName && (
                  <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Selected: {doc.fileName}
                  </p>
                )}
              </div>
            </div>
          ))}

          <div className="p-4 rounded-lg" style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              <strong>Note:</strong> Accepted formats: PDF, JPG, PNG. Maximum file size: 5MB per document.
            </p>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
        <button
          type="button"
          onClick={currentStep === 1 ? onCancel : handlePrevious}
          className="px-6 py-2 border-2 rounded-lg font-semibold transition-colors"
          style={{
            borderColor: 'var(--border)',
            color: 'var(--text-primary)',
            background: 'var(--card-bg)',
          }}
        >
          {currentStep === 1 ? 'Cancel' : 'Previous'}
        </button>

        {currentStep < totalSteps ? (
          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-colors"
          >
            Next Step
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-colors"
          >
            Submit Application
          </button>
        )}
      </div>
    </div>
  );
}
