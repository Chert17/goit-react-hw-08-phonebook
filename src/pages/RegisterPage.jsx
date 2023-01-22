import { Box, Container, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import RegisterForm from 'components/AuthForm/RegisterForm';

export default function RegisterPage() {
  return (
    <>
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          width="400px"
          minHeight="450px"
          gap={2}
        >
          <Typography variant="h4" component="p" textAlign="center">
            Register
          </Typography>
          <Typography textAlign="center" variant="h6" component="p">
            Please enter User details
          </Typography>
          <RegisterForm />
          <Typography variant="h6" component="p">
            Already have an account ?
          </Typography>
          <Typography textAlign="center">
            <Link component={RouterLink} to={'/login'} underline="always">
              Sign In
            </Link>
          </Typography>
        </Box>
      </Container>
    </>
  );
}
