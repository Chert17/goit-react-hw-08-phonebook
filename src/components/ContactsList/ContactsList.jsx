import { useSelector } from 'react-redux';
import { List, Typography } from '@mui/material';

import { selectFilter } from 'redux/filterSlice';
import { useGetContactsQuery } from 'redux/phonebookApi';
import ContactItem from 'components/ContactItem/ContactItem';

export default function ContactsList() {
  const filter = useSelector(selectFilter);

  const { currentData, isLoading, isSuccess } = useGetContactsQuery(filter);

  if (!currentData && isLoading)
    return <Typography variant="h6">Loading...</Typography>;

  if (!currentData?.length)
    return <Typography variant="h6">Contact list is empty</Typography>;

  function filterContacts() {
    const normalizeFilter = filter.trim().toLowerCase();

    return currentData?.filter(({ name }) =>
      name?.toLowerCase().includes(normalizeFilter)
    );
  }

  return (
    <>
      <List sx={{ width: '100%' }}>
        {isSuccess &&
          filterContacts()?.map(contact => (
            <ContactItem key={contact.id} {...contact} />
          ))}
      </List>
    </>
  );
}
