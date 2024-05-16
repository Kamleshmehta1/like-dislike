export const ROOT = '/';
export const USER = '/user';

export const UN_AUTHORIZED_ROUTES = {
  AUTH: { path: '/auth', fullpath: '/auth' },
};

export const AUTHORIZED_ROUTES = {
  root: USER,
  HOME: { path: '/home', fullpath: `${USER}/home` },
};
