import { Button } from '../ui/Button';

interface SubmitButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
}

export function SubmitButton({
  children,
  disabled
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      variant="primary"
      fullWidth
      disabled={disabled}
    >
      {children}
    </Button>
  );
}
