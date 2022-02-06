import PropTypes from 'prop-types';
// material
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Icon, MenuItem, TextField } from '@mui/material';

// ----------------------------------------------------------------------

DatePicker.propTypes = {
  options: PropTypes.array,
  onSort: PropTypes.func
};

export default function DatePicker({ options, onSort }) {
  return (
    <TextField sx={{ width: 300 }} select size="small" value="All" onChange={onSort}>
      {options.map((option) => (
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}>

          <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
          </DatePicker>
      ))}
    </TextField>
  );
}
