import React, { useState } from 'react'
import { newsService } from '../services/news.service';
import { Box, Link, Typography } from '@mui/material';
import { Article } from '../interfaces/Article';
import StorySkeleton from '../skeleton/StorySkeleton';

const TopStories = () => {
    const [articles, setArticles] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    const getNews = (params?: { query: string }) => {
        setLoading(true)

        newsService.getNews(params, 10).then((response: any) => {
            setLoading(false)
            setArticles(response.data?.articles);

        }).catch((error: any) => {
            console.log(error)
        })
    }

    React.useEffect(() => {
        getNews()

    }, [])

    return (
        <div >
            <Typography variant="h6" component="h6">
                Popular Stories
            </Typography>
            {loading && [1, 2, 3, 4, 5, 6].map(item => (
                <StorySkeleton />
            ))}
            {!loading && articles.map((article: Article) => (
                <Box margin={"20px 0"} display={"flex"}>
                    <img src={article.urlToImage} alt='image' width={"30%"} />&nbsp;&nbsp;
                    <Box display={"flex"} flexDirection={'column'} alignItems={'start'}>
                        <Typography variant="body2" color="text.secondary">
                            {article.title}
                        </Typography>
                        <Link target='_blank' href={article.url} underline="none">
                            More Detail
                        </Link>
                    </Box>
                </Box>
            ))}
        </div>
    )
}

export default TopStories