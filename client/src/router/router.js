import {createRouter, createWebHistory} from "vue-router";
import RegisterPage from "@/pages/RegisterPage/RegisterPage.vue";
import LoginPage from "@/pages/LoginPage/LoginPage.vue";
import CreateArticlePage from "@/pages/CreateArticlePage/CreateArticlePage.vue";
import MainPage from "@/pages/MainPage/MainPage.vue";


const routes = [
    {path: '/register', component:RegisterPage},
    {path: '/login', component: LoginPage},
    {path: '/create-article', component: CreateArticlePage},
    {path: '/', component: MainPage}
]

export  const router = createRouter({
    routes, history: createWebHistory()
})