import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
  Stack,
  Button,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Icon,
  Paper
} from '@mui/material';
import Moment from 'react-moment';
import authService from '../../../services/auth.service';
import { app } from '../../../Global';
import LicencesService from '../../../services/licences.service';

// ----------------------------------------------------------------------

export default function LicencesListForm() {
  console.log(app.item.UserId);

  const navigate = useNavigate();
  const [licence, setLicence] = useState([]);
  const [snackPack, setSnackPack] = useState([]);

  const LoginSchema = Yup.object().shape({
    phone: Yup.string().required('phone is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      UserId: ''
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      LicencesService.GetAllByUserId(formik.values.UserId)
        .then((response) => {
          alert(response.data.Message);
          console.log(response.data.Message);
          navigate('/dashboard');
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
        <Stack spacing={2.5}>
          <Box
            sx={{
              position: 'absolute',
              top: '58%',
              left: '59%',
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
              Please choose a licence!
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Profile Name</TableCell>
                    <TableCell align="right">Person Type</TableCell>
                    <TableCell align="right">Country</TableCell>
                    <TableCell align="right">City</TableCell>
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
                      No data.
                    </Typography>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
