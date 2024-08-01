import {  NYTIMES_API_KEY } from "../constant/app.constant";
import { nyTimesInterceptor } from "../interceptors/nytimes-interceptor.service";

class NyTimesService {
    async getNews(params?: any) {
        let url = `articlesearch.json?api-key=${NYTIMES_API_KEY}`;
       
        return await nyTimesInterceptor.get(url);
    }
  
}

export const nyTimesService = new NyTimesService();