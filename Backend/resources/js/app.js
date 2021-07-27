import Vue from 'vue';
require('./bootstrap');

import route from "./router";
import Vuex from 'vuex';
Vue.use(Vuex);

import VeeValidate from 'vee-validate';
Vue.use(VeeValidate, {
    events: 'change|blur|xxx'
});

import storeData from "./store";
const store = new Vuex.Store(storeData);

import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
Vue.use(VueToast, {
    position: 'top'
});

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);

Vue.component('top-header', require('./components/common/Header').default);
Vue.component('loader', require('./components/common/Loader').default);

import mixin from "./mixin";
Vue.mixin(mixin);

const app = new Vue({
    el: '#app',
    store,
    router: route,
});
