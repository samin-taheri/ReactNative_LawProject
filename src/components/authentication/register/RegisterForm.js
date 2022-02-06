import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeOutline from '@iconify/icons-eva/eye-outline';
import eyeOffOutline from '@iconify/icons-eva/eye-off-outline';
import { useNavigate } from 'react-router-dom';
// material
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import SubtitlesOutlinedIcon from '@mui/icons-material/SubtitlesOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Modal,
  Box,
  Typography,
  Button
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import authService from '../../../services/auth.service';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    title: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Title is required'),
    phone: Yup.string().required('Cell phone is required'),
    password: Yup.string().required('Password is required'),
    passwordAgain: Yup.string().required('Password confirmation is required')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      title: '',
      phone: '',
      password: '',
      passordAgain: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      authService
        .register(
          formik.values.firstName,
          formik.values.lastName,
          formik.values.title,
          formik.values.phone,
          formik.values.password
        )
        .then((response) => {
          console.log(response.data.Message);
          setMessage(response.data.Message);
          // navigate('/dashboard', { replace: true });
          // { Licences: response.data.Data, User: formik.values }
        })
        .catch((errorResponse) => {
          console.log('errorResponse');
          console.log(errorResponse.response);
        });
    }
  });
  const formikConfirm = useFormik({
    initialValues: {
      phoneConfirm: '',
      SMSCode: ''
    },
    onSubmit: () => {
      authService
        .approvingUser(formik.values.phone, formik.values.SMSCode)
        .then((response) => {
          console.log(response.data.Message);
          // navigate('/dashboard', { replace: true });
          // { Licences: response.data.Data, User: formik.values }
        })
        .catch((errorResponse) => {
          console.log('errorResponse');
          console.log(errorResponse.response);
        });
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;
  const { handleSubmitConfirm, getFieldPropsConfirm } = formikConfirm;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="First Name"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineOutlinedIcon />
                  </InputAdornment>
                )
              }}
            />

            <TextField
              fullWidth
              label="Last Name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineOutlinedIcon />
                  </InputAdornment>
                )
              }}
            />
          </Stack>

          <TextField
            fullWidth
            label="Title"
            {...getFieldProps('title')}
            error={Boolean(touched.title && errors.title)}
            helperText={touched.title && errors.title}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SubtitlesOutlinedIcon />
                </InputAdornment>
              )
            }}
          />

          <TextField
            fullWidth
            type="phone"
            label="Cell phone"
            {...getFieldProps('phone')}
            error={Boolean(touched.phone && errors.phone)}
            helperText={touched.phone && errors.phone}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneOutlinedIcon />
                </InputAdornment>
              )
            }}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeOutline : eyeOffOutline} />
                  </IconButton>
                </InputAdornment>
              ),
              startAdornment: (
                <InputAdornment position="start">
                  <VpnKeyOutlinedIcon />
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Confirm Password"
            {...getFieldProps('passwordAgain')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPasswordAgain((prev) => !prev)}>
                    <Icon icon={showPasswordAgain ? eyeOutline : eyeOffOutline} />
                  </IconButton>
                </InputAdornment>
              ),
              startAdornment: (
                <InputAdornment position="start">
                  <VpnKeyOutlinedIcon />
                </InputAdornment>
              )
            }}
            error={Boolean(touched.passwordAgain && errors.passwordAgain)}
            helperText={touched.passwordAgain && errors.passwordAgain}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={handleOpen}
            loading={false}
          >
            Sign Up!
          </LoadingButton>
          <FormikProvider value={formikConfirm}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmitConfirm}>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #fff',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2
                  }}
                >
                  <Stack spacing={2.5}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      {message}
                    </Typography>
                    <TextField
                      fullWidth
                      type="phone"
                      label="Cell phone"
                      {...getFieldProps('phoneConfirm')}
                      error={Boolean(touched.phone && errors.phone)}
                      helperText={touched.phone && errors.phone}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneOutlinedIcon />
                          </InputAdornment>
                        )
                      }}
                    />
                    <TextField
                      fullWidth
                      type="number"
                      label="SMS Code"
                      {...getFieldProps('SMSCode')}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <TextsmsOutlinedIcon />
                          </InputAdornment>
                        )
                      }}
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
                    />
                    <Button
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      loading={false}
                    >
                      Confirm!
                    </Button>
                  </Stack>
                </Box>
              </Modal>
            </Form>
          </FormikProvider>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
