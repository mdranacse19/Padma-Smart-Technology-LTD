import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    { path: '/', name: 'Login', component: () => import('../components/Login') },
    { path: '/home', name: 'Home', component: () => import('../components/Home') },
]


const router = new VueRouter({
    // mode: 'history',
    routes
});


export default router;


