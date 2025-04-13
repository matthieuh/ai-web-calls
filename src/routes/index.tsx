import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { ContactList, ContactForm, getContacts } from '../features/contacts';
import { Header } from '../components/ui/Header';
import { Button } from '../components/ui/Button';
import { Modal } from '~/components/ui/Modal';

export const Route = createFileRoute('/')({
  component: Home,
  loader: async () => await getContacts(),
});

function Home() {
  const contacts = Route.useLoaderData();
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Header 
          title="Contacts"
          rightElement={
            <Button 
              variant="text" 
              onClick={() => setShowAddForm(true)}
            >
              Add
            </Button>
          }
        />

        <div className="py-4">
          <ContactList contacts={contacts} />
        </div>
      </div>

      <Modal isOpen={showAddForm} onClose={() => setShowAddForm(false)} title="New Contact">
        <ContactForm onSubmit={() => setShowAddForm(false)} />
      </Modal>
    </div>
  );
}