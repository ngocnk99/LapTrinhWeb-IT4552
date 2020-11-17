// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 16p part 4
import Vue from 'vue'
import App from './App'
import router from './router'
import { sync } from 'vuex-router-sync'
import store from './store/store'
import Vueitfy from 'vuetify'
import 'vuetify/dist/vuetify.min.css'


Vue.use(Vueitfy);
Vue.config.productionTip = false
sync(store, router)
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})