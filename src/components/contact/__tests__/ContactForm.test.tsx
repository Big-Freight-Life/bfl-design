import { render, screen, fireEvent, waitFor } from '@/test-utils';

const mockUpdateField = vi.fn();
const mockHandleSubmit = vi.fn();

const defaultFormState = {
  fields: { name: '', email: '', projectType: '', subject: '', message: '' },
  errors: {},
  isSubmitting: false,
  submitted: false,
  submitError: null,
  updateField: mockUpdateField,
  handleSubmit: mockHandleSubmit,
  projectTypes: ['Branding', 'Web Design', 'Strategy', 'AI Integration'],
};

let formState = { ...defaultFormState };

vi.mock('@/viewmodels/useContactForm', () => ({
  useContactForm: () => formState,
}));

import ContactForm from '@/components/contact/ContactForm';

describe('ContactForm', () => {
  beforeEach(() => {
    formState = { ...defaultFormState };
    vi.clearAllMocks();
  });

  it('renders name and email fields', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it('renders project type select field', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/project type/i)).toBeInTheDocument();
  });

  it('renders subject and message fields', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('renders the Send Message button', () => {
    render(<ContactForm />);
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('shows Sending... text when isSubmitting is true', () => {
    formState = { ...defaultFormState, isSubmitting: true };
    render(<ContactForm />);
    expect(screen.getByRole('button', { name: /sending/i })).toBeInTheDocument();
  });

  it('disables the submit button when isSubmitting is true', () => {
    formState = { ...defaultFormState, isSubmitting: true };
    render(<ContactForm />);
    expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled();
  });

  it('calls updateField when name input changes', () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Jane Doe' } });
    expect(mockUpdateField).toHaveBeenCalledWith('name', 'Jane Doe');
  });

  it('calls updateField when email input changes', () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'jane@example.com' } });
    expect(mockUpdateField).toHaveBeenCalledWith('email', 'jane@example.com');
  });

  it('calls updateField when message changes', () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Hello there!' } });
    expect(mockUpdateField).toHaveBeenCalledWith('message', 'Hello there!');
  });

  it('calls handleSubmit on form submission', () => {
    render(<ContactForm />);
    fireEvent.submit(screen.getByRole('button', { name: /send message/i }).closest('form')!);
    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it('shows field error messages when errors are present', () => {
    formState = {
      ...defaultFormState,
      errors: { name: 'Name is required', email: 'Valid email required' },
    };
    render(<ContactForm />);
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Valid email required')).toBeInTheDocument();
  });

  it('shows submit error alert when submitError is set', () => {
    formState = { ...defaultFormState, submitError: 'Failed to send message' };
    render(<ContactForm />);
    expect(screen.getByText('Failed to send message')).toBeInTheDocument();
  });

  it('shows success message when submitted is true', () => {
    formState = { ...defaultFormState, submitted: true };
    render(<ContactForm />);
    expect(screen.getByText(/message sent/i)).toBeInTheDocument();
    expect(screen.getByText(/thanks for reaching out/i)).toBeInTheDocument();
  });

  it('does not render the form when submitted is true', () => {
    formState = { ...defaultFormState, submitted: true };
    render(<ContactForm />);
    expect(screen.queryByRole('button', { name: /send message/i })).not.toBeInTheDocument();
  });
});
