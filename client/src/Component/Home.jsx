import { Grid } from '@mui/material';
import SearchBar from '../FormComponents/SearchBar';
import { useCallback, useMemo, useState } from 'react';
import RHFButton from '../FormComponents/RHFButton';
import ModalWrapper from '../HOC/ModalWrapper';
import AddRecepie from './AddRecepie';
import { handleDebounce } from '../utils/debounce';
import RenderRecepies from './RenderRecepies';
import { useGetRecepieQuery } from '../redux/action/recepieAction';

function Home() {
  const [open, setOpen] = useState({ state: false, data: {} });
  const [search, setSearch] = useState('');

  const { data } = useGetRecepieQuery({ search });

  const handleClose = () => {
    setOpen({ state: false, data: {} });
  };

  const handleChange = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const handleSearch = handleDebounce(handleChange, 300);

  const isUpdate = useMemo(
    () => !!Object?.keys(open?.data || {})?.length,
    [open?.data]
  );

  return (
    <>
      <Grid
        container
        sx={{ display: 'flex', alignItems: 'center' }}
        spacing={2}
      >
        <Grid item xs={12} sm={8} md={10} lg={10}>
          <SearchBar
            name={'search'}
            label={'Search recepie...'}
            onChange={handleSearch}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={2} lg={2}>
          <RHFButton
            title="Add Recepie"
            onClick={() => setOpen({ ...open, state: true })}
          />
        </Grid>
        <Grid
          item
          xs={12}
          className={data?.data?.length ? 'recepie-dashboard' : ''}
          mt={2}
        >
          <RenderRecepies data={data} setOpen={setOpen} open={open} />
        </Grid>
      </Grid>
      <ModalWrapper
        open={open?.state}
        title={isUpdate ? 'Upate recepie' : 'Add recepie'}
        handleClose={handleClose}
      >
        <AddRecepie data={open} isUpdate={isUpdate} handleClose={handleClose} />
      </ModalWrapper>
    </>
  );
}

export default Home;
