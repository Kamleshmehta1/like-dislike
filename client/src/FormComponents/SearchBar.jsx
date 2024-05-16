import PropTypes from 'prop-types';
import {
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
  styled,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const StyledTextField = styled(TextField)({
  '& .MuiInputLabel-root': {
    top: '-2px',
  },
  '& .MuiInputLabel-shrink': {
    top: '0px',
  },
});

function SearchBar({ label, disabled = false, onChange, ...others }) {
  return (
    <FormControl fullWidth>
      <StyledTextField
        label={label}
        fullWidth
        disabled={disabled}
        sx={{ maxWidth: '500px' }}
        onChange={onChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...others}
      />
    </FormControl>
  );
}

SearchBar.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  others: PropTypes.any,
  onChange: PropTypes.func,
};

export default SearchBar;
