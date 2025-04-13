import { useStore } from '@tanstack/react-form';
import { Input } from '../ui/Input';
import { useFieldContext } from '../../hooks/useFormContext';

interface TextFieldProps {
  label?: string;
  type?: string;
  hasBottomBorder?: boolean;
}

export function TextField({
  label,  
  type = 'text',
  hasBottomBorder = false
}: TextFieldProps) {
  const field = useFieldContext<string>();
  
  const errors = useStore(field.store, (state: any) => state.meta.errors) || [];
  
  const errorMessages = errors.map((error: string | { message: string }) => 
    typeof error === 'string' ? error : error.message
  );

  return (
    <Input
      type={type}
      label={label}
      error={errorMessages[0]}
      name={field.name}
      value={field.state.value || ''}
      onChange={(e) => field.handleChange(e.target.value)}
      onBlur={field.handleBlur}
      placeholder={label}
      hasBottomBorder={hasBottomBorder}
    />
  );
}
