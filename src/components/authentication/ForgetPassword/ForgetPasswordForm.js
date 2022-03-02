import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Stack, TextField, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import authService from '../../../services/auth.service';
// ----------------------------------------------------------------------

export default function ForgetPasswordForm() {
  const navigate = useNavigate();
  const LoginSchema = Yup.object().shape({
    phone: Yup.string().required('phone is required')
  });

  const formik = useFormik({
    initialValues: {
      phone: ''
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      authService
        .ForgetPassword(formik.values.phone)
        .then((response) => {
          console.log(response.data.Success);
          alert(response.data.Message);
          navigate('/changePassword');
        })
        .catch((errorResponse) => {
          console.log('errorResponse');
          console.log(errorResponse);
        });
    }
  });

  const { errors, touched, handleSubmit, getFieldProps, isSubmitting } = formik;
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="on" noValidate onSubmit={handleSubmit}>
        <Stack>
          <TextField
            fullWidth
            type="phone"
            label="Cell Phone"
            {...getFieldProps('phone')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineOutlinedIcon />
                </InputAdornment>
              )
            }}
            sx={{ marginBottom: 3 }}
            error={Boolean(touched.phone && errors.phone)}
            helperText={touched.phone && errors.phone}
          />
        </Stack>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
