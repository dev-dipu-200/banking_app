'use client';

import { useState } from 'react';
import Modal from '@/components/Modal';
import AccountOpeningForm from '@/components/AccountOpeningForm';
import DatePicker, { DateRange } from '@/components/DatePicker';
import { useToast } from '@/components/ToastProvider';

export default function AccountsPage() {
  const toast = useToast();
  const [isAccountFormOpen, setIsAccountFormOpen] = useState(false);
  const [isDatePickerDemoOpen, setIsDatePickerDemoOpen] = useState(false);

  // DatePicker demo states
  const [singleDate, setSingleDate] = useState<Date | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>({ startDate: null, endDate: null });

  const handleAccountFormSubmit = (formData: any) => {
    console.log('Account Form Submitted:', formData);
    toast.success('Account application submitted successfully!', 'Success');
    setIsAccountFormOpen(false);
  };

  const handleAccountFormCancel = () => {
    setIsAccountFormOpen(false);
    toast.info('Account application cancelled', 'Cancelled');
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'Not selected';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1
          className="text-3xl font-bold mb-8"
          style={{ color: 'var(--text-primary)' }}
        >
          Account Management
        </h1>

        {/* Demo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account Opening Form Card */}
          <div
            className="p-6 rounded-2xl border shadow-lg"
            style={{
              background: 'var(--card-bg)',
              borderColor: 'var(--card-border)',
            }}
          >
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Account Opening
            </h2>
            <p
              className="mb-6"
              style={{ color: 'var(--text-secondary)' }}
            >
              Multi-step form with personal info, account details, and document uploads.
            </p>
            <button
              onClick={() => setIsAccountFormOpen(true)}
              className="w-full px-6 py-3 rounded-xl font-semibold text-white transition-all hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
              }}
            >
              Open New Account
            </button>
          </div>

          {/* DatePicker Demo Card */}
          <div
            className="p-6 rounded-2xl border shadow-lg"
            style={{
              background: 'var(--card-bg)',
              borderColor: 'var(--card-border)',
            }}
          >
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              DatePicker Demo
            </h2>
            <p
              className="mb-6"
              style={{ color: 'var(--text-secondary)' }}
            >
              Test single date and date range selection with custom calendar.
            </p>
            <button
              onClick={() => setIsDatePickerDemoOpen(true)}
              className="w-full px-6 py-3 rounded-xl font-semibold text-white transition-all hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
              }}
            >
              Try DatePicker
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className="p-6 rounded-2xl border shadow"
            style={{
              background: 'var(--card-bg)',
              borderColor: 'var(--card-border)',
            }}
          >
            <div className="text-3xl font-bold mb-2" style={{ color: 'var(--accent-from)' }}>
              1,234
            </div>
            <div style={{ color: 'var(--text-secondary)' }}>Total Accounts</div>
          </div>

          <div
            className="p-6 rounded-2xl border shadow"
            style={{
              background: 'var(--card-bg)',
              borderColor: 'var(--card-border)',
            }}
          >
            <div className="text-3xl font-bold mb-2" style={{ color: 'var(--accent-from)' }}>
              56
            </div>
            <div style={{ color: 'var(--text-secondary)' }}>Pending Applications</div>
          </div>

          <div
            className="p-6 rounded-2xl border shadow"
            style={{
              background: 'var(--card-bg)',
              borderColor: 'var(--card-border)',
            }}
          >
            <div className="text-3xl font-bold mb-2" style={{ color: 'var(--accent-from)' }}>
              98.5%
            </div>
            <div style={{ color: 'var(--text-secondary)' }}>Approval Rate</div>
          </div>
        </div>

        {/* Account Opening Form Modal */}
        <Modal
          isOpen={isAccountFormOpen}
          onClose={() => setIsAccountFormOpen(false)}
          title="Open New Account"
          size="xl"
        >
          <AccountOpeningForm
            onSubmit={handleAccountFormSubmit}
            onCancel={handleAccountFormCancel}
          />
        </Modal>

        {/* DatePicker Demo Modal */}
        <Modal
          isOpen={isDatePickerDemoOpen}
          onClose={() => setIsDatePickerDemoOpen(false)}
          title="DatePicker Component Demo"
          size="lg"
        >
          <div className="space-y-8">
            {/* Single Date Picker */}
            <div>
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                Single Date Selection
              </h3>
              <DatePicker
                is_range={false}
                value={singleDate}
                onChange={(date) => {
                  setSingleDate(date);
                  toast.success(`Selected: ${formatDate(date)}`, 'Date Selected');
                }}
                placeholder="Select a date"
                className="mb-4"
              />
              <div
                className="p-4 rounded-xl border"
                style={{
                  background: 'var(--background)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Selected Date:
                </div>
                <div className="font-semibold mt-1" style={{ color: 'var(--text-primary)' }}>
                  {formatDate(singleDate)}
                </div>
              </div>
            </div>

            {/* Date Range Picker */}
            <div>
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                Date Range Selection
              </h3>
              <DatePicker
                is_range={true}
                rangeValue={dateRange}
                onRangeChange={(range) => {
                  setDateRange(range);
                  if (range.startDate && range.endDate) {
                    toast.success(
                      `Range: ${formatDate(range.startDate)} - ${formatDate(range.endDate)}`,
                      'Range Selected'
                    );
                  }
                }}
                placeholder="Select date range"
                className="mb-4"
              />
              <div
                className="p-4 rounded-xl border"
                style={{
                  background: 'var(--background)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Selected Range:
                </div>
                <div className="font-semibold mt-1" style={{ color: 'var(--text-primary)' }}>
                  {dateRange.startDate && dateRange.endDate
                    ? `${formatDate(dateRange.startDate)} - ${formatDate(dateRange.endDate)}`
                    : 'No range selected'}
                </div>
              </div>
            </div>

            {/* Date Range with Constraints */}
            <div>
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                Date Range with Min/Max (Last 30 Days)
              </h3>
              <DatePicker
                is_range={true}
                minDate={new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)}
                maxDate={new Date()}
                onRangeChange={(range) => {
                  if (range.startDate && range.endDate) {
                    toast.info(
                      `Constrained Range: ${formatDate(range.startDate)} - ${formatDate(range.endDate)}`,
                      'Range Selected'
                    );
                  }
                }}
                placeholder="Select last 30 days range"
              />
            </div>

            {/* Usage Example Code */}
            <div>
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                Usage Example
              </h3>
              <div
                className="p-4 rounded-xl border font-mono text-sm overflow-x-auto"
                style={{
                  background: 'var(--background)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)',
                }}
              >
                <pre>{`// Single Date
<DatePicker
  is_range={false}
  value={date}
  onChange={(date) => setDate(date)}
/>

// Date Range
<DatePicker
  is_range={true}
  rangeValue={range}
  onRangeChange={(range) => setRange(range)}
  minDate={new Date('2024-01-01')}
  maxDate={new Date()}
/>`}</pre>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
