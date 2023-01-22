import { Box, Button, Container } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { useAddContactMutation, useGetContactsQuery } from 'redux/phonebookApi';
import NumberInput from 'components/Inputs/NumberInput';
import ContactNameInput from 'components/Inputs/ContactNameInput';

export default function AddContactForm({ onClose }) {
  const [name, setNameVal] = useState('');
  const [number, setNumberVal] = useState('');
  const [addContact] = useAddContactMutation();
  const { data: contacts } = useGetContactsQuery();

  const changeInput = e => {
    const key = e.target.name;
    const value = e.target.value;
    switch (key) {
      case 'name':
        return setNameVal(value);
      case 'number':
        return setNumberVal(value);
      default:
        return;
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    if (contacts.find(contact => contact.name === name)) {
      return toast.info(`${name} is alredy in contacts`);
    }
    addContact({ name, number })
      .unwrap()
      .then(toast.success('Contact created'))
      .catch(error => {
        if (error?.status === 400) {
          return toast.error('Error created contact');
        } else if (error?.status === 401) {
          return toast.error('Please authorization');
        }
      });

    setNameVal('');
    setNumberVal('');
    onClose(false)();
  };

  return (
    <>
      <Container>
        <form onSubmit={onSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <ContactNameInput name={name} changeInput={changeInput} />
            <NumberInput number={number} changeInput={changeInput} />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Button variant="outlined" color="primary" type="submit">
                add contact
              </Button>
              <Button
                onClick={onClose(false)}
                variant="outlined"
                color="error"
                type="button"
              >
                cancel
              </Button>
            </Box>
          </Box>
        </form>
      </Container>
    </>
  );
}
