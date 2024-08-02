import { environments } from "../environments/environment";
import { nyTimesInterceptor } from "../interceptors/nytimes-interceptor.service";

class NyTimesService {
    async getNews(params?: any) {
        let url = `articlesearch.json?api-key=${environments.NYTIMES_API_KEY}`;
        let query = 'politics';
        if (params?.query) {
            query = params.query;
        }
        url += `&q=${query}`;
        return await nyTimesInterceptor.get(url);
    }
  
}

export const nyTimesService = new NyTimesService();