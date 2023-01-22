import * as React from 'react';
import Drawer from '@mui/material/Drawer';

import AddContactForm from 'components/ContactForm/AddContactForm';
import { Typography } from '@mui/material';

export default function TemporaryDrawer({ showDrawer, onClose }) {
  const openRight = 'right';

  return (
    <div>
      <Drawer
        anchor={openRight}
        open={showDrawer}
        onClose={onClose(false)}
        PaperProps={{
          sx: {
            width: '300px',
            bgcolor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}
      >
        <Typography variant="h6" component="p" textAlign="center">
          Creat a new contact
        </Typography>
        <AddContactForm onClose={onClose} />
      </Drawer>
    </div>
  );
}
