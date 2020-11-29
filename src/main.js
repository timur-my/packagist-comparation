import Vue from 'vue'
import VueMaterial from 'vue-material'
import App from './App.vue'
import store from './store/index'

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)

new Vue({
    store,
    render: h => h(App),
}).$mount('#app')