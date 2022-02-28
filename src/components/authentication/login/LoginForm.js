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
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Modal,
  Backdrop,
  Box,
  Fade,
  Typography,
  TableCell,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Snackbar
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import authService from '../../../services/auth.service';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [openLicense, setOpenLicense] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpenLicense = () => setOpenLicense(true);
  const handleClose = () => setOpen(false);
  const handleCloseLicense = () => setOpenLicense(false);
  const [licence, setLicence] = useState([]);
  const [getApprove, setApprove] = useState(false);
  const [snackPack, setSnackPack] = useState([]);
  const [op, setOp] = useState(false);
  const [messageInfo, setMessageInfo] = useState(undefined);

  const LoginSchema = Yup.object().shape({
    phone: Yup.string().required('phone is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      phone: '',
      password: '',
      remember: true,
      phoneConfirm: '',
      SMSCode: ''
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      login();
    }
  });
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleClick = (message) => () => {
    setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
  };
  const login = () => {
    authService
      .login(formik.values.phone, formik.values.password)
      .then((response) => {
        console.log(response.data.Data);
        setLicence(response.data.Data);
        approve();
      })
      .catch((errorResponse) => {
        console.log('errorResponse');
        console.log(errorResponse);
      });
  };
  const approve = () => {
    authService
      .approvingUser(formik.values.phoneConfirm, formik.values.SMSCode)
      .then((response) => {
        console.log(response.data.Message);
        setApprove(true);
        // { Licences: response.data.Data, User: formik.values }
      })
      .catch((errorResponse) => {
        console.log('errorResponse');
        console.log(errorResponse);
      });
  };

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
            error={Boolean(touched.phone && errors.phone)}
            helperText={touched.phone && errors.phone}
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
                  <IconButton onClick={handleShowPassword} edge="end">
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
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="/forgotPassword">
            Forgot password?
          </Link>
        </Stack>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={handleOpen}
        >
          Login
        </LoadingButton>
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
                uhdfuhgırıg
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
                onClick={handleOpenLicense}
              >
                Confirm!
              </Button>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openLicense}
                onClose={handleCloseLicense}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500
                }}
              >
                <Fade in={openLicense}>
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
                    <Typography
                      id="transition-modal-title"
                      variant="h6"
                      component="h2"
                      pb={4}
                      pt={2}
                    >
                      Choose a licence to continue!
                    </Typography>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Profile Name</TableCell>
                            <TableCell align="right">Last Entrance</TableCell>
                            <TableCell align="right" />
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {licence.length > 0 ? (
                            <>
                              {licence.map((row) => (
                                <TableRow
                                  key={row.LicenceUserId}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                  <TableCell component="th" scope="row">
                                    {row.Licence.Profil}
                                  </TableCell>
                                  <TableCell align="right">
                                    <Moment>{row.EndDate}</Moment>
                                  </TableCell>
                                  <TableCell align="right">
                                    <Button
                                      sx={{ height: 30 }}
                                      to="/"
                                      size="medium"
                                      variant="contained"
                                      component={RouterLink}
                                      startIcon={<Icon icon={outlineArrowForward} />}
                                      onClick={handleClick('Message A')}
                                    >
                                      Login
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </>
                          ) : (
                            <Typography
                              id="transition-modal-title"
                              variant="h6"
                              component="h2"
                              pb={4}
                              pt={2}
                            >
                              Please enter your info first.
                            </Typography>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Fade>
              </Modal>
            </Stack>
          </Box>
        </Modal>
      </Form>
    </FormikProvider>
  );
}
