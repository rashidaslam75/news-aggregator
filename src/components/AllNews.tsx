import React, { useState } from 'react'
import { Grid } from '@mui/material';
import NewsCard from './NewsCard';
import { newsService } from '../services/news.service';
import NewsSkeleton from '../skeleton/NewsSkeleton';
import { guardianService } from '../services/guardian.service';
import { nyTimesService } from '../services/nytimes.service';

const AllNews = () => {
    const [articles, setArticles] = useState<any[]>([])
    const [search, setsearch] = useState('');
    const [loading, setLoading] = useState(false)

    const getNews = (params?: { query: string }) => {
        setLoading(true)
        const newsAPI = newsService.getNews(params,20);
        const guardianAPI = guardianService.getNews(params);
        const nyTimesAPI = nyTimesService.getNews(params);
        const promises = [newsAPI, guardianAPI,nyTimesAPI];

        Promise.all(promises).then((response: any) => {
            setLoading(false)
            const newsApiArticles = response[0]?.data?.articles;
            const guardianArticles = response[1]?.data?.response?.results;
            const nyTimesArticles = response[2]?.data?.response?.docs;
            setArticles([...newsApiArticles, ...guardianArticles,...nyTimesArticles]);
            
        }).catch((error: any) => {
            console.log(error)
        })
    }
    
    const handleSearchClick = () => {
        getNews({ query: search })
    }

    React.useEffect(() => {
        getNews()
    }, [])

    return (
        <div>
            
            <div className="wrapper">
                <div className="searchBar">
                    <input id="searchQueryInput" value={search} onChange={e => setsearch(e.target.value)} type="text" name="searchQueryInput" placeholder="Search" />
                    <button id="searchQuerySubmit" type="button" onClick={handleSearchClick} name="searchQuerySubmit">
                        <svg style={{ width: '24px', height: "24px" }} viewBox="0 0 24 24"><path fill="#666666" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                        </svg>
                    </button>
                </div>
            </div>
            <br />
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

export default AllNews