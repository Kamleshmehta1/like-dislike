import PropTypes from 'prop-types';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { authentication } from '../redux/slice/authSlice';
import { enqueueSnackbar } from 'notistack';
import { api } from '../redux/apiInterceptor';

import { delete_cookie } from '../utils/handleCookie';
import { useMemo, useState } from 'react';
import { useProfileQuery } from '../redux/action/authAction';
import { Skeleton } from '@mui/material';

const drawerWidth = 240;

export default function Header(props) {
  const { window } = props;
  const dispatch = useDispatch();

  const { data, isLoading, isFetching } = useProfileQuery();

  const isLoader = useMemo(
    () => isLoading || isFetching,
    [isFetching, isLoading]
  );

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const navItems = [
    {
      name: 'Log out',
      onClick: () => {
        delete_cookie(['accessToken', 'refreshToken']);
        dispatch(authentication({ isAuthenticated: false }));
        enqueueSnackbar('Logout successfully!', { variant: 'success' });
        dispatch(api.util.resetApiState());
      },
    },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, letterSpacing: '1px' }}>
        RECEPIE
      </Typography>
      <Divider />
      <List>
        {navItems.map(({ name, onClick }) => (
          <ListItem key={name} onClick={onClick} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'block', letterSpacing: '1px' },
            }}
          >
            RECEPIE
          </Typography>
          {isLoader ? (
            <Box
              sx={{
                minWidth: '300px !important',
                flex: 1,
                display: 'flex',
              }}
            >
              <Skeleton width="50%" animation="wave" />
              <Skeleton animation="wave" />
            </Box>
          ) : (
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                textTransform: 'capitalize',
              }}
            >
              {`Hi, ${data?.data?.email?.split('@')?.[0]}`}
            </Typography>
          )}
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map(({ name, onClick }) => {
              return (
                <Button key={name} sx={{ color: '#fff' }} onClick={onClick}>
                  {name}
                </Button>
              );
            })}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

Header.propTypes = {
  window: PropTypes.func,
};
