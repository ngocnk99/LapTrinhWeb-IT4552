import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
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
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/profile',
            name: 'profile',
            // lazy-loaded
            component: () =>
                import ('./components/Profile.vue')
        },
        {
            path: '/admin',
            name: 'admin',
            // lazy-loaded
            component: () =>
                import ('./components/BoardAdmin.vue')
        },
        {
            path: '/mod',
            name: 'moderator',
            // lazy-loaded
            component: () =>
                import ('./components/BoardModerator.vue')
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