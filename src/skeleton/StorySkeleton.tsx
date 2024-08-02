import { Avatar, Box, Skeleton } from '@mui/material'

const StorySkeleton = () => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ margin: 1 }}>
                <Skeleton variant="rectangular" animation={false}>
                    <Avatar />
                </Skeleton>
            </Box>
            <Box sx={{ width: '100%' }}>
            <Skeleton animation={false} />
            <Skeleton animation={false} />
            </Box>
        </Box>
    )
}

export default StorySkeleton