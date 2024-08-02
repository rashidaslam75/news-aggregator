import React, { useState } from 'react'
import { Box,  Grid,  Typography } from '@mui/material';
import NewsCard from './NewsCard';
import { newsService } from '../services/news.service';
import NewsSkeleton from '../skeleton/NewsSkeleton';
import { storageService } from '../services/storage.service';
import { STORAGE_KEYS } from '../constant/app.constant';

const MyFeed = () => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)

    const getFeed = (query: string) => {
        setLoading(true)
        newsService.getFeed(query)
            .then((response: any) => {
                setArticles(response?.data?.articles);
                setLoading(false)
            }).catch((error: any) => {
                console.log(error)
            })
    }

    React.useEffect(() => {
        let paramString: string = '';
        let query: string = '';
        let parsedData: string[]
        const sources: any = storageService.getItem(STORAGE_KEYS.SOURCES)

        parsedData = sources?.length > 0 ? JSON.parse(sources) : null
        if (parsedData && parsedData.length > 0) {
            paramString = parsedData.join(',');
            query += `domains=${paramString}`
        } else return
       
        getFeed(query)

    }, [])

    return (
        <div>
            {articles?.length === 0 && !loading && (
                <Box sx={{ display: "flex", width: '100%', justifyContent: "center" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <Typography variant="h6" textAlign={'center'} gutterBottom>
                            Welcome to your timeline
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Your feed is empty. Start adding the sources to your timeline and you will see the news up here.
                        </Typography>
                    </Box>
                </Box>
            )}
            <Grid container spacing={2}>
                {loading && [1, 2, 3, 4, 5, 6]?.map(article => (
                    <Grid item xs={12} md={4} sm={6} justifyContent={'center'}>
                        <NewsSkeleton />
                    </Grid>
                ))}
                {!loading && articles?.map(article => (
                    <Grid item xs={12} md={4} sm={6} justifyContent={'center'}>
                        <NewsCard article={article} />
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default MyFeed