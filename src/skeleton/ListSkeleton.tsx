import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function ListSkeleton() {
  return (
    <Box sx={{ width: 300, display: 'flex', justifyContent: 'space-between',alignItems: 'center' }}>
      <Box sx={{ margin: 1, width:"60%" }}>
        <Skeleton  animation={false}>
        </Skeleton>
      </Box>
      <Box sx={{ width: '10%' }}>
        <Skeleton animation={false} height={'40px'}/>
      </Box>
    </Box>
  );
}