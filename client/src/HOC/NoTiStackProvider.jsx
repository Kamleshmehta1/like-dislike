import PropTypes from 'prop-types';
import { SnackbarProvider } from 'notistack';

function NoTiStackProvider({ children }) {
  return (
    <SnackbarProvider
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      {children}
    </SnackbarProvider>
  );
}

NoTiStackProvider.propTypes = {
  children: PropTypes.any,
};

export default NoTiStackProvider;
