import { Button } from '@mui/material';
import { useFormContext } from 'react-hook-form';

export default function AuthBtn({ children }) {
  const {
    formState: { isValid },
  } = useFormContext();
  return (
    <Button variant="outlined" fullWidth type="submit" disabled={!isValid}>
      {children}
    </Button>
  );
}
