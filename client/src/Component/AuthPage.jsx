import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SignUp from '../Component/SignUp';
import SignIn from '../Component/SignIn';
import { useState } from 'react';
import MuiContainer from '../layout/MuiContainer';
import { Card } from '@mui/material';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.any,
  index: PropTypes.any,
  value: PropTypes.any,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function AuthPage() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      className="auth-image"
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',

        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <MuiContainer maxWidth="sm">
        <Card
          sx={{ height: '350px', background: 'white', borderRadius: '20px' }}
        >
          <Tabs
            centered
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Sign In" {...a11yProps(0)} />
            <Tab label="Sign Up" {...a11yProps(1)} />
          </Tabs>
          <CustomTabPanel value={value} index={0}>
            <SignIn setValue={setValue} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <SignUp />
          </CustomTabPanel>
        </Card>
      </MuiContainer>
    </Box>
  );
}
