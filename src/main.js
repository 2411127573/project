import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import MintUI from 'mint-ui'
import "mint-ui/lib/style.min.css"
import axios from 'axios'
import moment from 'moment'
import qs from 'qs'

axios.defaults.baseURL="http://127.0.0.1:3000";
Vue.prototype.axios=axios
Vue.use(MintUI)
Vue.config.productionTip = false
Vue.prototype.moment=moment
Vue.prototype.qs=qs

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
