import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import store from './store';
import Vueitfy from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import VeeValidate from 'vee-validate';
import Vuex from 'vuex';
import firebase from 'firebase/app'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
    faHome,
    faUser,
    faUserPlus,
    faSignInAlt,
    faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);

Vue.config.productionTip = false;

const firebaseConfig = {
    apiKey: "AIzaSyCvN6rCUm93uTHFg2MGIJ_OOCmx7pDiNis",
    authDomain: "laptrinhweb-4dbf0.firebaseapp.com",
    databaseURL: "https://laptrinhweb-4dbf0.firebaseio.com",
    projectId: "laptrinhweb-4dbf0",
    storageBucket: "laptrinhweb-4dbf0.appspot.com",
    messagingSenderId: "400599525776",
    appId: "1:400599525776:web:e8c7656f87715da77f2b15",
    measurementId: "G-W62V750BFN"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.use(VeeValidate);
Vue.use(Vueitfy);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(Vuex);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');