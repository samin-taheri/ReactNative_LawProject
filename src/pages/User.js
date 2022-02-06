// material
import { Link as RouterLink } from 'react-router-dom';
import { Box, Grid, Container, Typography, Link } from '@mui/material';
import { MHidden } from '../components/@material-extend';
import DosyaDurumu from '../components/_dashboard/app/DosyaDurumu';
import DosyaTipi from '../components/_dashboard/app/DosyaTipi';
// eslint-disable-next-line import/no-unresolved
import GörevTipleri from '../components/_dashboard/app/GörevTipleri';
import HesapHareketleri from '../components/_dashboard/app/HesapHareketleri';
import Mahkeme from '../components/_dashboard/app/Mahkeme';
// eslint-disable-next-line import/no-unresolved
import Süreç from '../components/_dashboard/app/Süreç';
// components
import Page from '../components/Page';
// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Definitions | MediLaw">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome to MediLaw</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <DosyaDurumu />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DosyaTipi />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Mahkeme />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <HesapHareketleri />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <GörevTipleri />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Süreç />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
