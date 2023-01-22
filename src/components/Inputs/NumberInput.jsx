import { TextField } from '@mui/material';
import { PatternFormat } from 'react-number-format';

export default function NumberInput({ number, changeInput }) {
  return (
    <PatternFormat
      format="(###) ### ## ##"
      mask="_"
      allowEmptyFormatting
      customInput={TextField}
      name="number"
      type="tel"
      value={number}
      onChange={changeInput}
      pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
      required
      label="number"
      variant="outlined"
      fullWidth
    />
  );
}
