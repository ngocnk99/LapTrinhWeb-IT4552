import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home.vue';

//user
import UserLogin from '@/components/User/Login.vue';
import UserRegister from '@/components/User/Register.vue';

//employer
import EmployerLogin from '@/components/Employer/Login.vue'
import EmployerRegister from '@/components/Employer/Register.vue'

//post
import Postcomponent from '@/components/Postcomponent'
import Post from '@/components/Posts/Index'
import CreatePost from '@/components/CreatePost'
import EditPost from '@/components/EditPost'
import ViewPost from '@/components/ViewPost/index'

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
            name: 'profile',
            // lazy-loaded
            component: () =>
                import ('./components/User/Profile.vue')
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
            path: '/employer/profile',
            name: 'profile',
            // lazy-loaded
            component: () =>
                import ('./components/Employer/Profile.vue')
        },
        {
            path: '/admin',
            name: 'admin',
            // lazy-loaded
            component: () =>
                import ('./components/BoardAdmin.vue')
        },
        {
            path: '/employer',
            name: 'employer',
            // lazy-loaded
            component: () =>
                import ('./components/BoardEmployer.vue')
        },
        {
            path: '/user',
            name: 'user',
            // lazy-loaded
            component: () =>
                import ('./components/BoardUser.vue')
        },
        {
            path: '/post',
            name: 'post',
            component: Postcomponent
        },
        {
            path: '/user/post',
            name: 'posts',
            component: Post
        },
        {
            path: '/post/create',
            name: 'posts-create',
            component: CreatePost
        },
        {
            path: '/post/:postId',
            name: 'post',
            component: ViewPost
        },
        {
            path: '/post/:postId/edit',
            name: 'post-edit',
            component: EditPost
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