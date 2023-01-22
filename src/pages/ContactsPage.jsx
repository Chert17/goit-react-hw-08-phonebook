import { Box, Button, Container, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';

import TemporaryDrawer from 'components/Drawer/Drawer';
import ContactsList from 'components/ContactsList/ContactsList';
import Filter from 'components/Filter/Filter';

export default function ContactsPage() {
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = open => () => {
    setShowDrawer(open);
  };

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
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Typography variant="h4" component="p" textAlign="center">
              Contacts
            </Typography>
            <Button
              onClick={toggleDrawer(true)}
              variant="outlined"
              type="button"
            >
              <AddIcon />
            </Button>
          </Box>
          <Filter />
          <ContactsList />
        </Box>
      </Container>
      <TemporaryDrawer showDrawer={showDrawer} onClose={toggleDrawer} />
    </>
  );
}
