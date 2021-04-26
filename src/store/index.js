import Vue from 'vue'
import Vuex from 'vuex'
import rootModule from './store'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store(rootModule)
store.$http = axios
store.$set = Vue.set

export { store, axios }
