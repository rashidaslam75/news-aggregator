import { environments } from "../environments/environment";
import { guardianInterceptor } from "../interceptors/guardian-interceptor.service";

class GuardianService {
    async getNews(params?: any) {
        let url = `search?api-key=${environments.GUARDIAN_API_KEY}&page=1&page-size=40`;
        let query = 'Politics';
        if (params?.query) {
            query = params.query;
        }
        url += `&q=${query}`;
        return await guardianInterceptor.get(url);
    }
}

export const guardianService = new GuardianService();