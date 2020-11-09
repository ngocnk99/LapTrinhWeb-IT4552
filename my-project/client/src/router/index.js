/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Postcomponent from '@/components/Postcomponent'
import Register from '@/components/Register'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'home',
            component: HelloWorld
        },
        {
            path: '/post',
            name: 'post',
            component: Postcomponent
        },
        {
            path: '/user/register',
            name: 'userRegister',
            component: Register
        },
        {
            path: '/user/login',
            name: 'userLogin',
            component: Login
        }
    ]
})