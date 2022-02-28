import { Link as RouterLink } from 'react-router-dom';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Stack, Link, Container, Typography } from '@mui/material';
// layouts
import { Icon } from '@iconify/react';
import baselineGavel from '@iconify/icons-ic/baseline-gavel';
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import { LoginForm } from '../components/authentication/login';
import AuthSocial from '../components/authentication/AuthSocial';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

// ----------------------------------------------------------------------

export default function Licences() {
  return (
    <RootStyle title="Licences | MediLaw">
      <Container>
        <Typography variant="h4" gutterBottom>
          Licences
        </Typography>
      </Container>
    </RootStyle>
  );
}
