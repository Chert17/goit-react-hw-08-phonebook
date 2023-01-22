import { TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';

export function NameInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext(); // retrieve all hook methods
  return (
    <>
      <TextField
        {...register('name')}
        type="name"
        label="Name"
        variant="outlined"
        fullWidth
      />
      {errors?.name && (
        <span style={{ color: 'red' }}>
          {errors?.name?.message || 'Error!'}
        </span>
      )}
    </>
  );
}
