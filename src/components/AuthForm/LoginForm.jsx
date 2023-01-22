import { Box } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import AuthBtn from 'components/Buttons/AuthButton';
import { EmailInput } from '../Inputs/EmailInput';
import { PasswordInput } from '../Inputs/PasswordInput';
import { loginSchema } from './AuthValidation';
import { useLoginMutation } from 'redux/phonebookApi';

export default function LoginForm() {
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
  });

  const [login] = useLoginMutation();

  const onSubmit = data => {
    login(data)
      .unwrap()
      .then(() => toast.success('Login success'))
      .catch(error => {
        if (error?.status === 400) {
          toast.error('incorrect login or password');
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
        <EmailInput />
        <PasswordInput />
        <AuthBtn>Login</AuthBtn>
      </Box>
    </FormProvider>
  );
}
