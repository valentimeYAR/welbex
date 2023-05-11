import {createRouter, createWebHistory} from "vue-router";
import RegisterPage from "@/pages/RegisterPage/RegisterPage.vue";
import LoginPage from "@/pages/LoginPage/LoginPage.vue";


const routes = [
    {path: '/register', component:RegisterPage},
    {path: '/login', component: LoginPage}
]

export  const router = createRouter({
    routes, history: createWebHistory()
})