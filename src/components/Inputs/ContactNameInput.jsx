import { TextField } from '@mui/material';

export default function ContactNameInput({ name, changeInput }) {
  return (
    <TextField
      name="name"
      type="text"
      value={name}
      onChange={changeInput}
      pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
      required
      label="name"
      variant="outlined"
      fullWidth
    />
  );
}
