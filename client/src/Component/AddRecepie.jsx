import PropTypes from 'prop-types';
import { Stack } from '@mui/material';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import FormProvider from '../FormComponents/FormProvider';
import RHFTextField from '../FormComponents/RHFTextField';
import AutoAdd from '../FormComponents/AutoAdd';
import RHFButton from '../FormComponents/RHFButton';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useAddRecepieMutation,
  useUpdateRecepieMutation,
} from '../redux/action/recepieAction';
import { enqueueSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import Input from '../FormComponents/Input';

function AddRecepie({ data, isUpdate, handleClose }) {
  const editData = useMemo(() => data?.data, [data?.data]);

  const profileDetails = useSelector(
    (state) => state?.authSlice?.profileDetails
  );

  const [addRecepie, { isLoading: isAdding }] = useAddRecepieMutation();
  const [updateRecepie, { isLoading: isUpdating }] = useUpdateRecepieMutation();

  const isLoading = useMemo(
    () => isAdding || isUpdating,
    [isAdding, isUpdating]
  );

  const schema = yup.object().shape({
    title: yup.string().required('Title is required !'),
    ...(!isUpdate && {
      ingredients: yup
        .array()
        .of(
          yup.object().shape({
            item: yup.string(),
          })
        )
        .required('Ingredients are required !'),
    }),
    instructions: yup.string().required('Instructions are required !'),
  });

  const methods = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      title: editData?.title || '',
      ingredients: editData?.ingredients || null,
      instructions: editData?.title || '',
      recepieImg: editData?.recepieImg || '',
    },
    resolver: yupResolver(schema),
  });

  const { handleSubmit, reset } = methods;

  const onAdd = useCallback(
    async (data) => {
      const recepieImg = new FormData();
      recepieImg.append('recepieImg', data?.recepieImg);
      recepieImg.append(
        'data',
        JSON.stringify({ ...data, email: profileDetails?.email })
      );

      const res = await addRecepie(recepieImg);

      if (res?.data?.status === 200) {
        enqueueSnackbar(res?.data?.message, { variant: 'success' });
        reset();
        handleClose();
      }
    },
    [addRecepie, handleClose, profileDetails?.email, reset]
  );

  const onUpdate = useCallback(
    async (data) => {
      const recepieImg = new FormData();
      recepieImg.append('recepieImg', data?.recepieImg);
      recepieImg.append(
        'data',
        JSON.stringify({ ...data, _id: editData?.id, email: editData?.email })
      );

      const res = await updateRecepie(recepieImg);
      if (res?.data?.status === 200) {
        enqueueSnackbar(res?.data?.message, { variant: 'success' });
        reset();
        handleClose();
      }
    },
    [editData?.id, editData?.email, updateRecepie, reset, handleClose]
  );

  return (
    <Stack p={2}>
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(isUpdate ? onUpdate : onAdd)}
      >
        <Stack spacing={2}>
          <Input name="recepieImg" type="file" />
          <RHFTextField name="title" label="Title" />
          <AutoAdd
            name="ingredients"
            label="Ingredients"
            defaultValues={editData?.ingredients?.map((ele) => ele?.item)}
          />
          <RHFTextField
            name="instructions"
            label="Cooking Instructions"
            multiline
            rows={3}
          />
          <RHFButton
            isLoading={isLoading}
            disabled={isLoading}
            title={isUpdate ? 'Update recepie' : 'Add recepie'}
            type="submit"
          />
        </Stack>
      </FormProvider>
    </Stack>
  );
}

AddRecepie.propTypes = {
  data: PropTypes.any,
  isUpdate: PropTypes.any,
  handleClose: PropTypes.func,
};

export default AddRecepie;
