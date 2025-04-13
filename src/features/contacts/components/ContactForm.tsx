import { useState } from 'react';
import { useRouter } from '@tanstack/react-router';
import { z } from 'zod';
import { Contact } from '../types/contact';
import { addContact } from '../services/contactService';
import { FormGroup } from '~/components/ui/FormGroup';
import { useContactForm } from '../hooks/useContactForm';


interface ContactFormProps {
  onSubmit: () => void;
}

const contactSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  phone: z.string()
    .min(1, { message: 'Phone is required' })
    .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im, {
      message: 'Please enter a valid phone number',
    }),
});

export function ContactForm({ onSubmit }: ContactFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useContactForm({
    defaultValues: {
      name: '',
      phone: '',
    },
    validators: {
      onChange: contactSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        setIsSubmitting(true);
        await addContact({ data: value as Contact });
        router.invalidate();
        onSubmit();
        form.reset();
        return { status: 'success' };
      } catch (error) {
        console.error('Error adding contact:', error);
        return { status: 'error', message: 'Failed to add contact' };
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <div className="space-y-4 mb-6">
        <FormGroup>
          <form.AppField
            name="name"
            children={(field) => (
              <field.TextField
                label="Full Name"
                hasBottomBorder
              />
            )}
          />
          <form.AppField
            name="phone"
            children={(field) => (
              <field.TextField
                label="Phone"
                type="tel"
              />
            )}
          />
        </FormGroup>
      </div>

      <form.SubmitButton disabled={isSubmitting}>
        {isSubmitting ? 'Adding...' : 'Add Contact'}
      </form.SubmitButton>
    </form>
  );
}