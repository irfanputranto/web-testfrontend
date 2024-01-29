import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { useAuthStore } from "../store/auth";


export function authMiddleware(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
    const store = useAuthStore();
    from.name

    if (to.meta.requiresAuth && store.isAuthenticated) {
        next();
    } else {
        next({ name: 'home' });
    }
}