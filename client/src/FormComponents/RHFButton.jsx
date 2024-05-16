import PropTypes from 'prop-types';
import { Button, CircularProgress, Typography } from '@mui/material';

function RHFButton({
  title,
  isLoading,
  variant = 'contained',
  size = 'large',
  ...others
}) {
  return (
    <Button
      size={size}
      variant={variant}
      fullWidth
      sx={{ textTransform: 'none' }}
      {...others}
    >
      <Typography color="inherit" variant="button">
        {title}
      </Typography>
      {isLoading ? (
        <CircularProgress sx={{ ml: 1 }} size={15} color="inherit" />
      ) : null}
    </Button>
  );
}

RHFButton.propTypes = {
  title: PropTypes.string,
  variant: PropTypes.string,
  others: PropTypes.any,
  isLoading: PropTypes.bool,
  size: PropTypes.string,
};

export default RHFButton;
