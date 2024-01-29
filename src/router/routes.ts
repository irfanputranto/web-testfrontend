import { RouteRecordRaw } from "vue-router";
import AboutVue from "../views/About.vue";
import Details from "../views/Details.vue";
import ArticleVue from "../views/Article/Article.vue";
import { authMiddleware } from "../middleware/authMiddleware";
import LoginVue from "../views/Login.vue";
import HomeVue from "../views/Home.vue";

const routes: RouteRecordRaw[] = [
    { path: '/', name: 'home', component: HomeVue },
    {
        path: '/details/:id',
        component: Details,
        name: 'details',
        props: true
    },
    { path: '/about', name: 'about', component: AboutVue },
    {
        path: '/article',
        name: 'article',
        component: ArticleVue,
        meta: { requiresAuth: true, requiresAdmin: true },
        beforeEnter: authMiddleware
    },
    { path: '/login', name: 'login', component: LoginVue }
];

export default routes;