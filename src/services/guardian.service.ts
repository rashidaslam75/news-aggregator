import dayjs from "dayjs";
import { environments } from "../environments/environment";
import { guardianInterceptor } from "../interceptors/guardian-interceptor.service";
import { DATE_FORMATE, DATE_FORMATE2 } from "../constant/app.constant";

class GuardianService {
    async getNews(params?: any) {
        let url = `search?api-key=${environments.GUARDIAN_API_KEY}&page=1&page-size=40`;
        const defaultQuery: string = `&q=Politics`;
        let query: string = defaultQuery;
        const payload = {
            ...(params?.keyword && { q: params.keyword }),
            ...(params?.fromDate && { 'from-date': dayjs(params.fromDate).format(DATE_FORMATE2) }),
            ...(params?.toDate && { 'to-date': dayjs(params.toDate).format(DATE_FORMATE2) }),
        }
        if (Object.keys(payload).length > 0) {
            query = '&' + new URLSearchParams(payload).toString();
            if (!params?.keyword) {
                query += defaultQuery;
            }
        }
        url += `${query}`;
        return await guardianInterceptor.get(url);
    }
}

export const guardianService = new GuardianService();