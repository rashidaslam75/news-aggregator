import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Article } from '../interfaces/Article';
import { format } from 'date-fns';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { storageService } from '../services/storage.service';
import { STORAGE_KEYS } from '../constant/app.constant';

export default function NewsCard({ article }: { article: Article }) {
  const imageUrl = article.urlToImage ? article.urlToImage : '/assets/images/default.png';
  const date = article.publishedAt || article.webPublicationDate || article.pub_date;
  const title = article.title || article.webTitle || article.abstract;
  const sourceName = article?.source?.name || article.source;
  const content = article.content || article.lead_paragraph;
  let navigate = useNavigate();

  const onRedirect = (article: Article) => {
    storageService.setItem(STORAGE_KEYS.ARTICLE_DETAIL, JSON.stringify(article))
    navigate("/news-detail");
  }

  return (
    <Card >
      <CardHeader
        title={title}
        classes="text"
        subheader={format(date, 'yyyy/MM/dd')}
      />
      <CardMedia
        component="img"
        height="194"
        image={imageUrl}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardActions >
        <Box sx={{ width: '100%', display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            {sourceName}
          </Typography>
          <Button onClick={() => onRedirect(article)} color="primary">More Detail</Button>
        </Box>
      </CardActions>
    </Card>
  );
}
