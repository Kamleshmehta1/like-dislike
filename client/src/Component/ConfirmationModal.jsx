import PropTypes from 'prop-types';
import { Stack, Typography } from '@mui/material';
import RHFButton from '../FormComponents/RHFButton';

function ConfirmationModal({ handleClose, handleDelete, isLoading, id }) {
  return (
    <Stack p={2} spacing={2}>
      <Typography variant="h6">
        Are you sure you want to delete this ?
      </Typography>
      <Stack direction="row" justifyContent="end" spacing={2}>
        <RHFButton
          title="Yes"
          color="error"
          variant="contained"
          onClick={() => handleDelete(id)}
          disabled={isLoading}
          isLoading={isLoading}
        />
        <RHFButton
          title="No"
          variant="contained"
          disabled={isLoading}
          onClick={handleClose}
        />
      </Stack>
    </Stack>
  );
}

ConfirmationModal.propTypes = {
  handleClose: PropTypes.func,
  handleDelete: PropTypes.func,
  id: PropTypes.any,
  isLoading: PropTypes.bool,
};

export default ConfirmationModal;
