import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CreateIcon from '@mui/icons-material/Create';
import {
  Avatar,
  Box,
  Button,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import { useDeleteContactMutation } from 'redux/phonebookApi';
import UpdataContactForm from 'components/ContactForm/UpdataContactForm';

export default function ContactItem({ id, name, number }) {
  const [showModal, setShowModal] = useState(false);

  const onModal = () => {
    setShowModal(!showModal);
    if (showModal) {
      setShowModal(!showModal);
    }
  };
  const [deleteContact, { isLoading }] = useDeleteContactMutation();

  return (
    <>
      <ListItem
        disablePadding
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Box display="flex" gap={1} alignItems="center">
          <Avatar sx={{ mr: 2 }} alt={name} src="/broken-image.jpg" />
          <ListItemText
            primary={<Typography color="#fff">{name}</Typography>}
            secondary={<Typography>{number}</Typography>}
          />
        </Box>
        <Box display="flex" gap={1}>
          <Button
            onClick={onModal}
            disabled={isLoading}
            type="button"
            variant="outlined"
            color="primary"
            sx={{ mr: 2, p: 0, minWidth: 0 }}
          >
            <CreateIcon />
          </Button>
          <Button
            onClick={() => deleteContact(id)}
            disabled={isLoading}
            type="button"
            variant="outlined"
            color="error"
            sx={{ p: 0, minWidth: 0 }}
          >
            <DeleteForeverIcon />
          </Button>
        </Box>
      </ListItem>
      {showModal && (
        <UpdataContactForm contact={{ id, name, number }} onClose={onModal} />
      )}
    </>
  );
}
