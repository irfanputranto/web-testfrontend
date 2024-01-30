import axios from "axios";
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';

const BASE_URL = import.meta.env.VITE_APP_API_BACKEND;
const toast = useToast();
const router = useRouter();

export const authService = {
    async login(email: string, password: string): Promise<string> {
        try {
            const res = await axios.post(`${BASE_URL}/api/login`, { email, password });
            const token = res.data.authorization.token;
            localStorage.setItem('token', token);
            return token;
        } catch (error) {
            throw new Error('Invalid credentials');
        }
    },
    async logout(): Promise<void> {
        try {
            const res = await axios.post(`${BASE_URL}/api/logout`, null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            const data = res.data;
            localStorage.removeItem('token');

            return data;
        } catch (error) {
            localStorage.removeItem('token');
            throw new Error('Invalid credentials');
        }
    },
    async checkUser(): Promise<void> {
        try {
            const res = await axios.get(`${BASE_URL}/api/user`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                }
            });
            const data = res.data.user;
            return data;
        } catch (error: any) {
            if (error) {
                if (error.response.data.message === "Token has expired") {
                    toast.error("Token has expired", {
                        timeout: 5000
                    });
                    localStorage.removeItem('token');
                    setTimeout(() => {
                        window.location.href = '/';
                        // router.push({ name: 'home' });
                    }, 6000);
                }
            }

            throw new Error('Invalid credentials');
        }
    }
}