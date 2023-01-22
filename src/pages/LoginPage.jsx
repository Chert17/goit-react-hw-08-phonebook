import { Box, Container, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import LoginForm from 'components/AuthForm/LoginForm';

export default function LoginPage() {
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
          minHeight="350px"
          gap={2}
        >
          <Typography variant="h4" component="p" textAlign="center">
            Login
          </Typography>
          <Typography textAlign="center" variant="h6" component="p">
            Please enter your Email & Password
          </Typography>
          <LoginForm />
          <Typography variant="h6" component="p">
            Don't have an account?
          </Typography>
          <Typography textAlign="center">
            <Link component={RouterLink} to={'/register'} underline="always">
              Sign up
            </Link>
          </Typography>
        </Box>
      </Container>
    </>
  );
}
