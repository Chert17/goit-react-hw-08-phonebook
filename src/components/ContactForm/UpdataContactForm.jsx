import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { toast } from 'react-toastify';

import ContactNameInput from 'components/Inputs/ContactNameInput';
import NumberInput from 'components/Inputs/NumberInput';
import { useUpdateContactMutation } from 'redux/phonebookApi';

export default function UpdataContactForm({ contact, onClose }) {
  const { id, name: nameVal, number: numberVal } = contact;
  const [name, setNameVal] = useState(nameVal);
  const [number, setNumberVal] = useState(numberVal);
  const [updateContact] = useUpdateContactMutation();

  const changeInput = e => {
    const key = e.target.name;
    switch (key) {
      case 'name':
        return setNameVal(e.target.value);
      case 'number':
        return setNumberVal(e.target.value);
      default:
        return;
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    updateContact({ id, name, number })
      .unwrap()
      .then(toast.success('Contact updated'))
      .catch(error => {
        if (error?.status === 400) {
          return toast.error('Error updated contact');
        } else if (error?.status === 401) {
          return toast.error('Please authorization');
        }
      });
    onClose();
  };
  return (
    <>
      <Box
        component="form"
        onSubmit={onSubmit}
        display="flex"
        flexDirection="column"
        gap="20px"
      >
        <ContactNameInput name={name} changeInput={changeInput} />
        <NumberInput number={number} changeInput={changeInput} />
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Button variant="outlined" color="primary" type="submit">
            update contact
          </Button>
          <Button
            variant="outlined"
            color="error"
            type="button"
            onClick={onClose}
          >
            cancel
          </Button>
        </Box>
      </Box>
    </>
  );
}
