import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { toast } from 'react-toastify';

import AuthBtn from 'components/Buttons/AuthButton';
import { useRegisterMutation } from 'redux/phonebookApi';
import { registrationSchema } from './AuthValidation';
import { EmailInput } from '../Inputs/EmailInput';
import { NameInput } from '../Inputs/NameInput';
import { PasswordInput } from '../Inputs/PasswordInput';

export default function RegisterForm() {
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(registrationSchema),
  });

  const [register] = useRegisterMutation();

  const onSubmit = data => {
    register(data)
      .unwrap()
      .then(() => toast.success('Register success'))
      .catch(error => {
        if (error?.status === 400) {
          toast.error('User creation error! Please try again');
        } else if (error?.status === 500) {
          toast.error('Please try letter');
        }
      });
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <Box
        onSubmit={methods.handleSubmit(onSubmit)}
        component="form"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        gap={2}
        width="100%"
      >
        <NameInput />
        <EmailInput />
        <PasswordInput />
        <AuthBtn>Register</AuthBtn>
      </Box>
    </FormProvider>
  );
}
