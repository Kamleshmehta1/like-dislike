import { CircularProgress, Stack } from '@mui/material';

function Loader() {
  return (
    <Stack
      flex={1}
      height={'100vh'}
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress size={'5rem'} />
    </Stack>
  );
}

export default Loader;
