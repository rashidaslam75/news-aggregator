import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { SearchBox } from './SearchBox';
import { Grid } from '@mui/material';
import NewsCard from './NewsCard';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function CenteredTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="News" {...a11yProps(0)} />
          <Tab label="My Feed" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <SearchBox />
        <br />
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} sm={6} justifyContent={'center'}>
            <NewsCard />
          </Grid>
          <Grid item xs={12} md={4} sm={6}>
            <NewsCard />
          </Grid>
          <Grid item xs={12} md={4} sm={6}>
            <NewsCard />
          </Grid>
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Box sx={{ width: '100%' }}>
         <h1>Hello world</h1>
        </Box>
      </CustomTabPanel>
    </>
  );
}
