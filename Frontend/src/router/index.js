import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/LoginComponent'

Vue.use(VueRouter);

const routes = [

    { path: '/login', name: 'login', component: Login },
    { path: '/dashboard', name: 'dashboard', component: () => import('../components/Dashboard') },

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});


router.beforeEach((to, from, next) => {
    if (to.name !== 'login' && !localStorage.getItem("token")) {
        next({ name: 'login' });
    }
    else {
        if (to.name == 'login' && localStorage.getItem("token")) {
            next({ name: 'dashboard' });
        }else{
            next();
        }
    }
});


export default router
