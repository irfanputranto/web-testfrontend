import { defineStore } from "pinia";
import { articleService } from "../service/articleService";


interface DataState {
    data: any,
    totalItems: number;
    itemsPerPage: number;
    offset: number;
    currentPage: number;
    limit: number;
    isLoading: boolean;
    error: Error | null;
}

export const useArticleStore = defineStore({
    id: 'article',
    state: (): DataState => ({
        data: [],
        totalItems: 0,
        itemsPerPage: 5,
        offset: 0,
        currentPage: 1,
        limit: 9,
        isLoading: false,
        error: null,
    }),
    actions: {
        async get(params = { title: '', alias: '', limit: 0, offset: 0 }): Promise<void> {
            this.isLoading = true;
            try {
                const res = await articleService.get(params, params.limit, params.offset);
                this.data = res;
            } catch (err) {
                console.log('error data article', err);
            } finally {
                this.isLoading = false;
            }
        },
        async store(title: string, content: string, image: File, userId: string): Promise<void> {
            this.isLoading = true;
            try {
                await articleService.store(title, content, image, userId);
            } catch (err) {
                console.log('error store article', err);
            } finally {
                this.isLoading = false;
            }
        }
    }
})