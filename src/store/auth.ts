import { defineStore } from "pinia";
import { authService } from "../service/authService";


interface AuthState {
    isAuthenticated: boolean;
    isAdmin: boolean;
    token: string | null;
    userData: any;
}

export const useAuthStore = defineStore({
    id: 'auth',
    state: (): AuthState => ({
        isAuthenticated: false,
        isAdmin: false,
        token: localStorage.getItem('token') || null,
        userData: null,
    }),
    actions: {
        async login(email: string, password: string): Promise<void> {
            await authService.login(email, password);
            this.isAuthenticated = true;
            this.isAdmin = true;
            this.token = localStorage.getItem('token');
        },
        async logout(): Promise<void> {
            await authService.logout();
            this.isAuthenticated = false;
            this.isAdmin = false;
        },
        checkToken(): void {
            if (this.token) {
                this.isAuthenticated = true;
            }
        },
        async checkUser(): Promise<void> {
            const data = await authService.checkUser();
            this.userData = data;
        }
    }
});