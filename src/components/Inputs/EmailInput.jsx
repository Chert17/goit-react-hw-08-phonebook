import { TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';

export function EmailInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext(); // retrieve all hook methods
  return (
    <>
      <TextField
        {...register('email', {
          required: 'email is required',
        })}
        type="email"
        label="Email"
        variant="outlined"
        fullWidth
      />
      {errors?.email && (
        <span style={{ color: 'red' }}>
          {errors?.email?.message || 'Error!'}
        </span>
      )}
    </>
  );
}
