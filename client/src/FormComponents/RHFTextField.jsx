import PropTypes from 'prop-types';
import { TextField, styled } from '@mui/material';
import { Controller } from 'react-hook-form';

import { makeStyles } from '@mui/styles';

const StyledTextField = styled(TextField)({
  '& .MuiInputLabel-root': {
    top: '-2px',
  },
  '& .MuiInputLabel-shrink': {
    top: '0px',
  },
});

const useHelperTextStyles = makeStyles(() => ({
  root: { marginLeft: '0px' },
}));

function RHFTextField({ name, disabled = false, ...others }) {
  const helperTextStyles = useHelperTextStyles();

  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <StyledTextField
            {...field}
            fullWidth
            disabled={disabled}
            FormHelperTextProps={{
              classes: {
                root: helperTextStyles.root,
              },
            }}
            error={!!Object?.keys(error || {})?.length && !disabled}
            helperText={error?.message}
            {...others}
          />
        );
      }}
    />
  );
}

RHFTextField.propTypes = {
  disabled: PropTypes.bool,
  name: PropTypes.any,
  others: PropTypes.any,
};

export default RHFTextField;
