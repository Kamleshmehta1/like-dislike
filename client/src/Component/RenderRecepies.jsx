import PropTypes from 'prop-types';
import HandleCard from './HandleCard';
import { Grid } from '@mui/material';

export default function RenderRecepies({ data, setOpen, open }) {
  return (
    <Grid container spacing={4}>
      {data?.data?.map((ele) => {
        const {
          _id: id,
          email,
          title,
          createdAt,
          recepieImg,
          instructions,
          ingredients,
        } = ele;

        const user = email?.substring(0, 1)?.toUpperCase();
        const recepieTitle =
          title?.substring(0, 1)?.toUpperCase() + title?.substring(1);
        return (
          <Grid item xs={12} sm={6} md={6} lg={4} xl={4} key={id}>
            <HandleCard
              user={user}
              title={recepieTitle}
              createdAt={createdAt}
              recepieImg={recepieImg}
              instructions={instructions}
              ingredients={ingredients}
              setOpen={setOpen}
              id={id}
              open={open}
              email={email}
              likes={ele?.likes}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

RenderRecepies.propTypes = {
  data: PropTypes.any,
  open: PropTypes.any,
  setOpen: PropTypes.any,
};
