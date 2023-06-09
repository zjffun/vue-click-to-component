import Vue from 'vue'
import App from './App.vue'
import 'vue-click-to-component/client.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
