import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home.vue';

//user
import UserLogin from '@/components/User/Login.vue';
import UserRegister from '@/components/User/Register.vue';

//employer
import EmployerLogin from '@/components/Employer/Login.vue'
import EmployerRegister from '@/components/Employer/Register.vue'
import EmployerIndex from '@/components/Employer/Index.vue'
import EmployerSearch from '@/components/Employer/Search.vue'


//Job
import CreatePost from '@/components/Posts/CreatePost'
import EditPost from '@/components/Posts/EditPost'
import SearchJob from '@/components/ViewJob/SearchJob'
import ViewJob from '@/components/ViewJob/index'

//Admin
import AdminLogin from '@/components/Admin/Login.vue'
import Admin from '@/components/Admin/Index.vue'

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/home',
            component: Home
        },
        //user
        {
            path: '/user',
            name: 'user',
            // lazy-loaded
            component: () =>
                import ('./components/User/BoardUser.vue')
        },
        {
            path: '/user/login',
            name: 'userLogin',
            component: UserLogin
        },
        {
            path: '/user/register',
            name: 'userRegister',
            component: UserRegister
        },
        {
            path: '/user/profile',
            name: 'userProfile',
            // lazy-loaded
            component: () =>
                import ('./components/User/Profile.vue')
        },
        //employer
        {
            path: '/employer',
            name: 'employer',
            // lazy-loaded
            component: () =>
                import ('./components/Employer/BoardEmployer.vue')
        },
        {
            path: '/employer/login',
            name: 'employerLogin',
            component: EmployerLogin
        },
        {
            path: '/employer/register',
            name: 'employerRegister',
            component: EmployerRegister
        },
        {
            path: '/employer',
            name: 'employerIndex',
            component: EmployerIndex
        },
        {
            path: '/employer/search',
            name: 'employerSearch',
            component: EmployerSearch
        },
        {
            path: '/employer/:employerName',
            name: 'employerProfile',
            // lazy-loaded
            component: () =>
                import ('./components/Employer/Profile.vue')
        },
        //job
        {
            path: '/job/search',
            name: 'jobSearch',
            component: SearchJob
        },
        {
            path: '/post/create',
            name: 'posts-create',
            component: CreatePost
        },
        {
            path: '/job/:jobId',
            name: 'ViewJob',
            component: ViewJob
        },
        {
            path: '/post/:postId/edit',
            name: 'post-edit',
            component: EditPost
        },
        {
            path: '/admin',
            name: 'admin',
            // lazy-loaded
            component: Admin,
        },
        {
            path: '/admin/login',
            name: 'adminLogin',
            // lazy-loaded
            component: AdminLogin,
        },
    ]
});

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register', '/home'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// });