import { environments } from "../environments/environment";
import { newsApiInterceptor } from "../interceptors/newsapi-interceptor.service.ts";
import { ISearch } from "../interfaces/Search";

class NewsService {
    async getNews(params: ISearch, size: number) {
        let url = `everything?apiKey=${environments.NEWS_API_KEY}&page=1&pageSize=${size}`;
        const defaultQuery: string = `&q=Politics`;
        let query: string = defaultQuery;
        debugger
        const payload = {
            ...(params?.keyword && { q: params.keyword }),
            ...(params?.source && { domains: params.source }),
            ...(params?.fromDate && { from: params.fromDate }),
            ...(params?.toDate && { to: params.toDate }),
        }
        if (Object.keys(payload).length > 0) {
            query = '&' + new URLSearchParams(payload).toString();
            if (!params?.keyword) {
                query += defaultQuery;
            }
        }

        url += `${query}`;
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