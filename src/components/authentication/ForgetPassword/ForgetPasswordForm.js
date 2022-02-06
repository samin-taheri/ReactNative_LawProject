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
  Button
} from '@mui/material';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { ResizableBox } from 'react-resizable';
import authService from '../../../services/auth.service';

// ----------------------------------------------------------------------

export default function ForgetPasswordForm() {
  const navigate = useNavigate();
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
        <Dialog
          open={open2}
          onClose={handleClose2}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth={false}
        >
          <ResizableBox height={290} width={340}>
            <DialogTitle id="alert-dialog-title">{message}</DialogTitle>
            <DialogActions
              sx={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}
            >
              <img
                src="/static/illustrations/tick.png"
                alt="login"
                width="155"
                height="155"
                mb={30}
              />
            </DialogActions>
            <DialogActions>
              <Button onClick={handleClose2} to="/" component={RouterLink}>
                OK
              </Button>
            </DialogActions>
          </ResizableBox>
        </Dialog>
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
