import Vue from 'vue'
import App from './App.vue'
import store from './store/index'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import 'vue-select/dist/vue-select.css';

Vue.use(VueMaterial)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
    store,
    render: h => h(App),
}).$mount('#app')