import Vue from 'vue'
import MainApp from './MainApp.vue'
import router from './router'


import VueSweetalert2 from "vue-sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);


import VueToastr$1 from "vue-toastr";
Vue.use(VueToastr$1, {
  defaultPosition: "toast-top-center",
  defaultCloseOnHover: false
});

import VeeValidate from 'vee-validate';
Vue.use(VeeValidate, {
  events: 'change|blur|xxx'
});

import Vuex from 'vuex';
Vue.use(Vuex);
import storeData from './store'
const store = new Vuex.Store(storeData);


import mixin from "./mixin";
Vue.mixin(mixin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: function (h) { return h(MainApp) }
}).$mount('#app');
