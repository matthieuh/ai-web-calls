import { Contact } from '../types/contact';
import { Button } from '../../../components/ui/Button';

interface ContactCardProps {
  contact: Contact;
}

export function ContactCard({ contact }: ContactCardProps) {
  const handleCall = () => {
    window.location.href = `tel:${contact.phone}`;
  };

  return (
    <div className="p-4 flex items-center bg-white rounded-xl shadow-sm hover:shadow transition-shadow">
      <div className="h-12 w-12 rounded-full bg-neutral-300 flex items-center justify-center text-neutral-600 mr-3 flex-shrink-0">
        {contact.name.charAt(0).toUpperCase()}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-medium text-neutral-900 truncate">{contact.name}</h3>
        <p className="text-neutral-500 text-sm truncate">{contact.phone}</p>
        {contact.email && <p className="text-neutral-400 text-xs truncate">{contact.email}</p>}
      </div>
      <Button 
        variant="primary" 
        className="ml-3 px-3 py-2 rounded-full" 
        onClick={handleCall}
        aria-label={`Call ${contact.name}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
      </Button>
    </div>
  );
}
