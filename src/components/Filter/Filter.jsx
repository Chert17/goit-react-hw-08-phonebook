import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@mui/material';

import { selectFilter, setFilter } from '../../redux/filterSlice';

export default function Filter() {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();
  return (
    <>
      <TextField
        type="text"
        name="filter"
        value={filter}
        onChange={evt => dispatch(setFilter(evt.target.value))}
        label="Find contact by name"
        variant="filled"
        fullWidth
      />
    </>
  );
}
