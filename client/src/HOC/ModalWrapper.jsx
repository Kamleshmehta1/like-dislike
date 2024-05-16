import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import {
  Dialog,
  DialogTitle,
  IconButton,
  Slide,
  Stack,
  Typography,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function ModalWrapper({
  handleClose,
  open,
  children,
  title,
  sx,
  titleStyle,
  clearIcon = true,
  isLoading,
  maxWidth = 'sm',
  ...other
}) {
  return (
    <Dialog
      open={open}
      fullWidth
      TransitionComponent={Transition}
      maxWidth={maxWidth}
      sx={sx}
      {...other}
    >
      <DialogTitle
        variant="h5"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignSelf: !title ? 'end' : '',
          alignItems: 'center',
          p: 2,
          ...titleStyle,
        }}
      >
        <Stack direction={'row'} spacing={2} alignItems={'center'}>
          <Typography variant="h5">{title}</Typography>
        </Stack>
        {clearIcon ? (
          <IconButton onClick={handleClose} disabled={isLoading}>
            <ClearIcon sx={{ cursor: 'pointer' }} />
          </IconButton>
        ) : null}
      </DialogTitle>
      {children}
    </Dialog>
  );
}

ModalWrapper.propTypes = {
  children: PropTypes.any,
  clearIcon: PropTypes.bool,
  handleClose: PropTypes.func,
  isLoading: PropTypes.bool,
  open: PropTypes.bool,
  sx: PropTypes.object,
  title: PropTypes.string,
  titleStyle: PropTypes.any,
  maxWidth: PropTypes.string,
};

export default ModalWrapper;
