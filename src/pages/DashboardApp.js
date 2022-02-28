// material
import { Box, Grid, Container, Typography } from '@mui/material';
import { Scheduler } from '@aldabil/react-scheduler';
// components
import { useState } from 'react';
import { EVENTS } from './events';
import Page from '../components/Page';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Dashboard | MediLaw">
      <Container maxWidth="xl">
        <Box sx={{ pb: 10 }}>
          <Typography variant="h4">Hi, Welcome to MediLaw</Typography>
        </Box>
        <Grid container spacing={3} />
        <Scheduler view="week" events={EVENTS} selectedDate={new Date(2021, 4, 5)} />
      </Container>
    </Page>
  );
}
