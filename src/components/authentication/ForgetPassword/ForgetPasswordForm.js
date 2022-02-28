import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import Moment from 'react-moment';
import outlineArrowForward from '@iconify/icons-ic/outline-arrow-forward';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeOutline from '@iconify/icons-eva/eye-outline';
import eyeOffOutline from '@iconify/icons-eva/eye-off-outline';
// material
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import {
  Link,
  Stack,
  TextField,
  InputAdornment,
  Modal,
  Backdrop,
  Box,
  Fade,
  Typography,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  IconButton
} from '@mui/material';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { ResizableBox } from 'react-resizable';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import authService from '../../../services/auth.service';

// ----------------------------------------------------------------------

export default function ForgetPasswordForm() {
  const navigate = useNavigate();
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [message, setMessage] = useState([]);
  const [open2, setOpen2] = useState(false);

  const handleClickOpen = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };
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
          const success = response.ok;

          if (!success) {
            // handle errors here
            setMessage(response.data.Message);
            console.log(response.data.Message);
          }
          // handle successful requests here
          console.log(response.data.Message);
          // setPass(response.data);
          // { Licences: response.data.Data, User: formik.values }
        })
        .catch((errorResponse) => {
          console.log('errorResponse');
          console.log(errorResponse);
        });
    }
  });
  const formikUpdat = useFormik({
    initialValues: {
      phoneUpdate: '',
      SMSCode: '',
      passwordUpdate: ''
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      authService
        .UpdateUserPassword(
          formikUpdat.values.phoneUpdate,
          formikUpdat.values.SMSCode,
          formikUpdat.values.passwordUpdate
        )
        .then((response) => {
          const statusCode = response.status;
          const success = response.ok;

          if (!success) {
            // handle errors here
            setMessage(response.data.Message);
            console.log(response.data.Message);
          }
          // handle successful requests here
          console.log(response.data.Message);
          // setPass(response.data);
          // { Licences: response.data.Data, User: formik.values }
        })
        .catch((errorResponse) => {
          console.log('errorResponse');
          console.log(errorResponse);
        });
    }
  });
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
  const { handleSubmitUpdate, getFieldPropsUpdate } = formikUpdat;
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
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
          loading={false}
          onClick={handleClickOpen}
        >
          Reset Password
        </LoadingButton>
        <Modal
          open={open2}
          onClose={handleClose2}
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
                {message} please enter the SMS code sent to your phone to update the password!
              </Typography>
              <TextField
                fullWidth
                type="phone"
                label="Cell phone"
                {...getFieldProps('phoneUpdate')}
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
              <TextField
                fullWidth
                type="password"
                label="New Password"
                {...getFieldProps('passwordUpdate')}
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
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
              <Button fullWidth size="large" type="submit" variant="contained" loading={false}>
                Update Password!
              </Button>
            </Stack>
          </Box>
        </Modal>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={open}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 900,
                height: 500,
                bgcolor: 'background.paper',
                border: '2px solid #fff',
                boxShadow: 24,
                borderRadius: 2,
                p: 4
              }}
            >
              <Typography id="transition-modal-title" variant="h6" component="h2" pb={4} pt={2}>
                Choose a licence to continue!
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </Form>
    </FormikProvider>
  );
}
