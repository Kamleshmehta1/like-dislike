import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import { Input as InputForFile } from '@mui/material';

function Input({ name, disabled, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { value, onChange, ...field },
        fieldState: { error },
      }) => {
        return (
          <InputForFile
            {...field}
            value={value?.fileName}
            onChange={(event) => {
              onChange(event.target.files[0]);
            }}
            fullWidth
            error={!!error && !disabled}
            {...other}
          />
        );
      }}
    />
  );
}

Input.propTypes = {
  disabled: PropTypes.any,
  name: PropTypes.any,
};

export default Input;
