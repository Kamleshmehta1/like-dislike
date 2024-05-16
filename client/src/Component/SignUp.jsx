import FormProvider from '../FormComponents/FormProvider';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import RHFTextField from '../FormComponents/RHFTextField';
import { Stack } from '@mui/material';
import RHFButton from '../FormComponents/RHFButton';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSignUpMutation } from '../redux/action/authAction';
import { enqueueSnackbar } from 'notistack';

function SignUp() {
  const [signUp, { isLoading }] = useSignUpMutation();

  const schema = yup.object().shape({
    email: yup.string().email().required('Email is required !'),
    password: yup.string().required('Password is required !'),
    confirmPassword: yup.string().required('Confirm Password is required !'),
  });

  const methods = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: { email: '', password: '', confirmPassword: '' },
    resolver: yupResolver(schema),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = useCallback(
    async (data) => {
      const res = await signUp(data);

      if (res?.data?.status === 200) {
        enqueueSnackbar(res?.data?.message, { variant: 'success' });
        reset();
      }
    },
    [reset, signUp]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <RHFTextField name="email" label="Email" />
        <RHFTextField name="password" type="password" label="Password" />
        <RHFTextField
          name="confirmPassword"
          type="password"
          label="Confirm Password"
        />
        <RHFButton
          title="Sign Up"
          type="submit"
          disabled={isLoading}
          isLoading={isLoading}
        />
      </Stack>
    </FormProvider>
  );
}

export default SignUp;
