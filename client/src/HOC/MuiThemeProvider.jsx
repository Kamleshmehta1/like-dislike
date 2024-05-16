import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function MuiThemeProvider({ children }) {
  const themeOptions = useMemo(
    () => ({
      typography: {
        button: {
          textTransform: 'none',
        },
      },
    }),
    []
  );
  const theme = createTheme(themeOptions);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

MuiThemeProvider.propTypes = {
  children: PropTypes.any,
};

export default MuiThemeProvider;
