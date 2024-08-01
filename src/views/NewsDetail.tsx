import { storageService } from '../services/storage.service'
import { STORAGE_KEYS } from '../constant/app.constant'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import TopStories from '../components/TopStories';

const NewsDetail = () => {
    const navigate = useNavigate();
    let article: any, storageData: any = storageService.getItem(STORAGE_KEYS.ARTICLE_DETAIL)
    if (!storageData) {
        navigate('/')
    }
    article = JSON.parse(storageData)
    const imageUrl = article?.urlToImage ? article?.urlToImage : '/assets/images/default.png';
    const date = article?.publishedAt || article?.webPublicationDate || article?.pub_date;
    const title = article?.title || article?.webTitle || article?.abstract;
    const sourceName = article?.source?.name || article?.source;
    const content = article?.content || article?.lead_paragraph;

    return (
        <div>
            <Grid container spacing={4} className='pointer' >
                <Grid item md={8}  >
                    <Button href="/" startIcon={<ArrowBackIosIcon />}>
                        Back
                    </Button>
                    <Box margin={"20px 0"}>
                        <Typography variant="h3" component="h5">
                            {title}
                        </Typography>
                    </Box>
                    <Typography variant="body2" component="h5">
                        <strong>Published on:</strong>  {format(date, 'yyyy/MM/dd')}
                    </Typography>
                    <Box margin={"20px 0"}>
                        <img src={imageUrl} width={'100%'} />
                    </Box>
                    <Typography variant="body1" component="h5">
                        {content}
                    </Typography>
                    <Box margin={"20px 0"}>
                        <Typography variant="body2" color="text.secondary">
                            {sourceName}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item md={4} margin={"60px 0 0"} >
                    <TopStories />
                </Grid>
            </Grid>
        </div>
    )
}

export default NewsDetail