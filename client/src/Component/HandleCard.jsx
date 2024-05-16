import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  styled,
  Collapse,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import dayjs from 'dayjs';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ModalWrapper from '../HOC/ModalWrapper';
import ConfirmationModal from './ConfirmationModal';
import { useCallback, useState } from 'react';
import {
  useDeleteRecepieMutation,
  useUpdateRecepieForLikesMutation,
  useUpdateRecepieForDisLikeMutation,
} from '../redux/action/recepieAction';
import { enqueueSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExpandMore = styled((props) => {
  const { ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function HandleCard({
  user,
  title,
  createdAt,
  recepieImg,
  instructions,
  id,
  ingredients,
  setOpen,
  email,
  likes,
}) {
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const [deleteRecepie, { isLoading }] = useDeleteRecepieMutation();
  const [updateRecepieForLikes] = useUpdateRecepieForLikesMutation();
  const [updateRecepieForDisLike] = useUpdateRecepieForDisLikeMutation();

  const handleClose = () => {
    setConfirmationModal(false);
  };

  const handleDelete = useCallback(
    async (id) => {
      const res = await deleteRecepie({ id });

      handleClose();
      enqueueSnackbar(res?.data?.message, { variant: 'success' });
    },
    [deleteRecepie]
  );

  const currentUserLike = useSelector(
    (state) => state?.authSlice?.profileDetails
  );

  const handleLike = useCallback(
    async (id) => {
      if (likes?.includes(currentUserLike?._id)) {
        const res = await updateRecepieForDisLike({ id });
        enqueueSnackbar(res?.data?.message, { variant: 'error' });
      } else {
        const res = await updateRecepieForLikes({ id });
        enqueueSnackbar(res?.data?.message, { variant: 'success' });
      }
    },
    [
      currentUserLike?._id,
      likes,
      updateRecepieForDisLike,
      updateRecepieForLikes,
    ]
  );

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Card
        sx={{
          height: 480,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: 'red' }}>{user}</Avatar>}
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={title}
          subheader={dayjs(createdAt)?.format('DD/MM/YYYY')}
        />
        <CardMedia
          component="img"
          height="194"
          loading="lazy"
          image={recepieImg}
          alt="recepieImg"
        />
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            letterSpacing={'1px'}
          >
            {`${instructions?.slice(0, 200)}...`}{' '}
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              sx={{ m: 0, p: 0 }}
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </Typography>
        </CardContent>
        <CardActions disableSpacing sx={{ mt: 'auto' }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            flex={1}
            alignItems="center"
          >
            <Stack direction="row" alignItems="center" justifyContent="center">
              <IconButton
                color={
                  likes?.includes(currentUserLike?._id) ? 'error' : 'default'
                }
                onClick={() => handleLike(id)}
              >
                <Stack justifyContent="center" alignItems="center">
                  <FavoriteIcon />
                  <Typography variant="caption">
                    {likes?.length} like
                  </Typography>
                </Stack>
              </IconButton>
              <IconButton>
                <Stack justifyContent="center" alignItems="center">
                  <ShareIcon />
                  <Typography variant="caption">share</Typography>
                </Stack>
              </IconButton>
            </Stack>
            <Stack direction="row">
              <IconButton
                color="primary"
                onClick={() =>
                  setOpen({
                    data: {
                      title,
                      ingredients,
                      instructions,
                      recepieImg,
                      id,
                      email,
                    },
                    state: true,
                  })
                }
              >
                <Stack justifyContent="center" alignItems="center">
                  <EditIcon />
                  <Typography variant="caption">Edit</Typography>
                </Stack>
              </IconButton>
              <IconButton
                color="error"
                onClick={() => setConfirmationModal(true)}
              >
                <Stack justifyContent="center" alignItems="center">
                  <DeleteIcon />
                  <Typography variant="caption">Delete</Typography>
                </Stack>
              </IconButton>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <Stack justifyContent="center" alignItems="center">
                  <ExpandMoreIcon />
                  <Typography variant="caption">Expand</Typography>
                </Stack>
              </ExpandMore>
            </Stack>
          </Stack>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <List dense={true}>
              {ingredients?.map(({ item }) => {
                return (
                  <ListItem key={item}>
                    <ListItemIcon>
                      <ArrowRightIcon />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                );
              })}
            </List>
            <Typography paragraph variant="h6" color="text.secondary">
              Instructions:
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              letterSpacing={'1px'}
            >
              {instructions}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
      <ModalWrapper
        open={confirmationModal}
        title="Delete"
        handleClose={handleClose}
        isLoading={isLoading}
      >
        <ConfirmationModal
          id={id}
          handleClose={handleClose}
          handleDelete={handleDelete}
          isLoading={isLoading}
        />
      </ModalWrapper>
    </>
  );
}

HandleCard.propTypes = {
  createdAt: PropTypes.any,
  id: PropTypes.any,
  ingredients: PropTypes.any,
  instructions: PropTypes.any,
  recepieImg: PropTypes.any,
  setOpen: PropTypes.func,
  title: PropTypes.any,
  user: PropTypes.any,
  email: PropTypes.any,
  likes: PropTypes.any,
};

export default HandleCard;
