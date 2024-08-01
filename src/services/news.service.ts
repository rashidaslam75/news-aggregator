import { environments } from "../environments/environment";
import { newsApiInterceptor } from "../interceptors/newsapi-interceptor.service.ts";

class NewsService {
    async getNews(params: any, size:number) {
        let url = `everything?apiKey=${environments.NEWS_API_KEY}&page=1&pageSize=${size}`;
        let query = 'Politics';
        if (params?.query) {
            query = params.query;
        }
        url += `&q=${query}`;
        return await newsApiInterceptor.get(url);
    }
    async getFeed(query?: string) {
        let url = `everything?apiKey=${environments.NEWS_API_KEY}&${query}&page=1&pageSize=100`;
        return await newsApiInterceptor.get(url);
    }
    async getSource() {
        let url = `top-headlines/sources?apiKey=${environments.NEWS_API_KEY}&page=1&pageSize=20`;
        return await newsApiInterceptor.get(url);
    }
}

export const newsService = new NewsService();