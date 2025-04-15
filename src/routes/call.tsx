import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { CallScreen } from '../features/calls/components/CallScreen';

export const Route = createFileRoute('/call')({
  component: CallPage,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      phoneNumber: search.phoneNumber ? String(search.phoneNumber) : undefined,
    };
  },
});

function CallPage() {
  const { phoneNumber } = Route.useSearch();
  const navigate = useNavigate();
  
  const handleClose = () => {
    navigate({ to: '/' });
  };
  
  return (
    <CallScreen 
      initialPhoneNumber={phoneNumber} 
      onClose={handleClose} 
    />
  );
}
