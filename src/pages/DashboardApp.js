// material
import { Box, Grid, Container, Typography } from '@mui/material';
import { Scheduler } from '@aldabil/react-scheduler';
// components
import { EVENTS } from './events';
import Page from '../components/Page';
import { app } from '../Global';

export default function DashboardApp() {
  console.log(app.item.UserId);

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
