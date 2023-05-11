import {createRouter, createWebHistory} from "vue-router";
import RegisterPage from "@/pages/RegisterPage/RegisterPage.vue";
import LoginPage from "@/pages/LoginPage/LoginPage.vue";
import CreateArticlePage from "@/pages/CreateArticlePage/CreateArticlePage.vue";
import MainPage from "@/pages/MainPage/MainPage.vue";
import ArticlePage from "@/pages/ArticlePage/ArticlePage.vue";


const routes = [
    {path: '/register', component:RegisterPage},
    {path: '/login', component: LoginPage},
    {path: '/create-article', component: CreateArticlePage},
    {path: '/', component: MainPage},
    {path: '/article/:id', component: ArticlePage, props: true}
]

export  const router = createRouter({
    routes, history: createWebHistory()
})