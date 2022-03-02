// material
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
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
