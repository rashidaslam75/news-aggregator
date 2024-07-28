import { Box, Typography } from '@mui/material';
import CenteredTabs from './components/Tabs';
import TopNavBar from './components/TopNavbar';
import Favourites from './components/Favourites';

function App() {
  return (
    <div className="App">
      <TopNavBar />
      <Box sx={{ marginTop: "30px" }}>
        <Box sx={{ padding: "20px", marginTop: "10px", display: "flex" }}>
          <Box width={"25%"} sx={{ display: { sm: 'none', xs: 'none', md: 'block' } }}>
            <Typography variant="h6" >
              Authors
            </Typography>
            <Favourites />
            <Typography variant="h6" >
              Source
            </Typography>
            <Favourites />
          </Box>
          <Box sx={{ width: { sm: '100%', xs: '100%', md: '75%' } }}>
            <CenteredTabs />
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default App;
