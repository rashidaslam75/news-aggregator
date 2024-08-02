import { Avatar, Box, Button, Stack } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { Source } from '../interfaces/Source';
import { storageService } from '../services/storage.service';
import { useEffect, useState } from 'react';
import { toasterService } from '../services/toaster.service';
import { STORAGE_KEYS } from '../constant/app.constant';
import { newsService } from '../services/news.service';
import ListSkeleton from '../skeleton/ListSkeleton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function Sources() {
  const [favourites, setFavourites] = useState<string[]>([]);
  const [sources, setSources] = useState([])
  const [loading, setLoading] = useState(false)

  const onAddFavourite = (source: string) => {
    const storage: any = storageService.getItem(STORAGE_KEYS.SOURCES)
    if (storage) {
      let parsed: string[] = JSON.parse(storage);
      parsed.push(source)
      storageService.setItem(STORAGE_KEYS.SOURCES, JSON.stringify(parsed))
    } else {
      storageService.setItem(STORAGE_KEYS.SOURCES, JSON.stringify([source]))
    }
    toasterService.show("Source added to favourites.")
    refreshFavourites()
  }

  const onRemoveFavourite = (source: string) => {
    const storage: any = storageService.getItem(STORAGE_KEYS.SOURCES)
    if (storage) {
      let parsed: string[] = JSON.parse(storage);
      const index = parsed.findIndex((item: string) => item === source);
      if (index > -1) {
        parsed.splice(index, 1);
      }
      storageService.setItem(STORAGE_KEYS.SOURCES, JSON.stringify(parsed))
      toasterService.show("Source removed from favourites.")
    }
    refreshFavourites()
  }

  const refreshFavourites = () => {
    const favourites: any = storageService.getItem(STORAGE_KEYS.SOURCES)
    if (favourites) {
      let parsed: string[] = JSON.parse(favourites);
      setFavourites(parsed)
    }
  }

  const isBookMark = (source: string) => {
    return favourites.some((item: string) => item === source)
  }

  const getSource = () => {
    setLoading(true)
    newsService.getSource()
      .then((response: any) => {
        setLoading(false)
        const sources = response?.data?.sources.slice(0, 10).map((item: any) => {
          let url;
          if (item?.url.includes('www')) {
            url = item?.url?.slice(12).split("/")[0]
          } else {
            url = item?.url?.slice(8).split("/")[0]
          }
          return { ...item, link: item.url, url };
        })
        setSources(sources);
        storageService.setItem('SOURCE_LIST', JSON.stringify(sources))
      }).catch((error: any) => {
        console.log(error)
      })
  }

  useEffect(() => {
    refreshFavourites()
    getSource()
  }, [])

  return (
    <>
      {loading && (
        [1, 2, 3, 4, 5, 6, 7, 8].map(item => (
          <ListSkeleton />
        ))
      )}
      {!loading && (
        <>
          <ul>
            {sources.map((item: Source) => (
              <li key={item.id}>
                <Stack direction={"row"} >
                  <Box width={"100%"} sx={{ display: "flex" }}>
                    <Avatar sx={{ bgcolor: deepOrange[500], height: 30, width: 30 }}>A</Avatar>
                    <Button target="_blank" href={item.link}>{item.name}</Button>
                  </Box>
                  {isBookMark(item.url) ? <FavoriteIcon className='pointer' onClick={() => onRemoveFavourite(item.url)} />
                    : <FavoriteBorderIcon className='pointer' onClick={() => onAddFavourite(item.url)} />}

                </Stack> </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
