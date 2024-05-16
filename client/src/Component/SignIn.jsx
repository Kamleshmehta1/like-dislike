import PropTypes from 'prop-types';
import FormProvider from '../FormComponents/FormProvider';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import RHFTextField from '../FormComponents/RHFTextField';
import { Stack } from '@mui/material';
import RHFButton from '../FormComponents/RHFButton';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSignInMutation } from '../redux/action/authAction';
import { authentication } from '../redux/slice/authSlice';
import { useDispatch } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import { AUTHORIZED_ROUTES } from '../routes/path';
import { useNavigate } from 'react-router-dom';

function SignIn({ setValue }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signIn, { isLoading }] = useSignInMutation();

  const schema = yup.object().shape({
    email: yup.string().email().required('Email is required !'),
    password: yup.string().required('Password is required !'),
  });

  const methods = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(schema),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = useCallback(
    async (data) => {
      const res = await signIn(data);

      if (res?.data?.status === 200) {
        dispatch(authentication({ isAuthenticated: true }));
        navigate(AUTHORIZED_ROUTES.HOME.fullpath);
        reset();
        enqueueSnackbar(res?.data?.message, { variant: 'success' });
      }
    },
    [dispatch, navigate, reset, signIn]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <RHFTextField name="email" label="Email" />
        <RHFTextField name="password" type="password" label="Password" />
        <RHFButton
          title="Sign In"
          type="submit"
          disabled={isLoading}
          isLoading={isLoading}
        />
        <RHFButton
          title="Create new account"
          disabled={isLoading}
          onClick={() => setValue(1)}
        />
      </Stack>
    </FormProvider>
  );
}

SignIn.propTypes = {
  setValue: PropTypes.any,
};

export default SignIn;
