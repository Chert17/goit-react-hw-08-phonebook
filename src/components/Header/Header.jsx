import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectToken, selectUser } from 'redux/authSelectors';
import { useLogoutMutation } from 'redux/phonebookApi';

export default function Header() {
  const [logout] = useLogoutMutation();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);

  return (
    <>
      <AppBar position="static" sx={{ mb: '50px', bgcolor: 'transparent' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography variant="h4" component="p">
              Phonebook
            </Typography>
            {isLoggedIn && (
              <>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  gap={2}
                  ml="auto"
                >
                  <>
                    <Avatar alt={user?.name} />
                    <Typography variant="h6" component="p" mr={2}>
                      Hi, {user?.name}
                    </Typography>
                  </>

                  <Button
                    onClick={() => logout(token)}
                    type="button "
                    variant="outlined"
                  >
                    LOGOUT
                  </Button>
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
