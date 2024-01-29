import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_API_BACKEND;

export const articleService = {
    async get(params = { title: '', alias: '' }, limit: number, offset: number): Promise<void> {
        try {
            const queryParams: Record<string, any> = {
                limit: limit,
                page: offset,
            }

            if (params.title) {
                queryParams.title = params.title;
            }
            // if (params.alias) {
            //     queryParams.alias = params.alias;
            // }

            const res = await axios.get(`${BASE_URL}/api/article`, {
                params: queryParams,
            });

            const data = res.data;
            return data;
        } catch (error) {
            throw new Error('Error : ' + error);
        }
    },
    async store(title: string, content: string, image: File, userId: string): Promise<void> {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('image', image);
        formData.append('user_id', userId);

        try {
            await axios.post(`${BASE_URL}/api/article`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
        } catch (error) {
            throw new Error('Error : ' + error);
        }

    }
}