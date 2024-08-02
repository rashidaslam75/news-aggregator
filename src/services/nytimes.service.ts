import dayjs from "dayjs";
import { DATE_FORMATE2 } from "../constant/app.constant";
import { environments } from "../environments/environment";
import { nyTimesInterceptor } from "../interceptors/nytimes-interceptor.service";

class NyTimesService {
    async getNews(params?: any) {
        let url = `articlesearch.json?api-key=${environments.NYTIMES_API_KEY}`;
        const defaultQuery: string = `&q=Politics`;
        let query: string = defaultQuery;
        const payload = {
            ...(params?.keyword && { q: params.keyword }),
            ...(params?.fromDate && { 'begin_date': dayjs(params.fromDate).format(DATE_FORMATE2) }),
            ...(params?.toDate && { 'end_date': dayjs(params.toDate).format(DATE_FORMATE2) }),
        }
        if (Object.keys(payload).length > 0) {
            query = '&' + new URLSearchParams(payload).toString();
            if (!params?.keyword) {
                query += defaultQuery;
            }
        }

        url += `${query}`;
        return await nyTimesInterceptor.get(url);
    }

}

export const nyTimesService = new NyTimesService();