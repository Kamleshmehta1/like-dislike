import { Box, Toolbar } from '@mui/material';
import PropTypes from 'prop-types';

function RoutesLayout({ children }) {
  return (
    <Box component="main" sx={{ p: 3 }}>
      <Toolbar />
      {children}
    </Box>
  );
}

RoutesLayout.propTypes = {
  children: PropTypes.any,
};

export default RoutesLayout;
