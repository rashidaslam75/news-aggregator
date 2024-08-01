import { Box } from '@mui/material';
import TopNavBar from './components/TopNavbar';
import Sidebar from './components/Sidebar';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './views/Home';
import NewsDetail from './views/NewsDetail';

function App() {
  return (
    <div className="App">
      <TopNavBar />
      <ToastContainer />

      <Box sx={{ marginTop: "30px" }}>
        <Box sx={{ padding: "20px", marginTop: "10px", display: "flex" }}>
          <Box width={"20%"} sx={{ display: { sm: 'none', xs: 'none', md: 'block' } }}>
            <Sidebar />
          </Box>
          <Box marginLeft={"5%"} sx={{ width: { sm: '100%', xs: '100%', md: '75%' } }}>
            <BrowserRouter>
              <Routes>
                <Route path="/" Component={Home} />
                <Route path="/news-detail" Component={NewsDetail} />
              </Routes>
            </BrowserRouter>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default App;
