import PropTypes from 'prop-types';
import { Autocomplete, Chip, TextField, styled } from '@mui/material';

import { makeStyles } from '@mui/styles';

import { Controller, useFormContext } from 'react-hook-form';
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

function AutoAdd({ name, label, disabled = false, defaultValues, ...others }) {
  const helperTextStyles = useHelperTextStyles();

  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: 'Veuillez choisir une réponse',
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <Autocomplete
            multiple
            disabled={disabled}
            blurOnSelect={true}
            defaultValue={defaultValues || []}
            options={['Salt', 'Pepper', 'Mushroom']}
            freeSolo
            renderTags={(tagValue, getTagProps) => {
              return value || !!defaultValues?.length
                ? (tagValue || defaultValues).map((option, index) => {
                    return (
                      <Chip
                        {...getTagProps({ index })}
                        key={option}
                        label={option}
                      />
                    );
                  })
                : null;
            }}
            onChange={(event, values) => {
              onChange(
                values?.map((item) => {
                  return { item };
                })
              );
            }}
            renderInput={(params) => (
              <StyledTextField
                {...params}
                label={label}
                FormHelperTextProps={{
                  classes: {
                    root: helperTextStyles.root,
                  },
                }}
                error={!!Object?.keys(error?.[name] || {})?.length && !disabled}
                helperText={error?.[name]?.message}
                {...others}
              />
            )}
          />
        );
      }}
    />
  );
}

AutoAdd.propTypes = {
  disabled: PropTypes.any,
  label: PropTypes.any,
  name: PropTypes.any,
  defaultValues: PropTypes.any,
};

export default AutoAdd;
