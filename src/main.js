import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store, axios } from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify, { lang: 'ru' })

Vue.prototype.$http = axios

new Vue({
  vuetify: new Vuetify(),
  props: { source: String },
  data: () => ({ drawer: null }),
  created () { this.$vuetify.theme.dark = true },
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
