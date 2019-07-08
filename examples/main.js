import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
Vue.config.productionTip = false

Vue.use(ElementUI, { locale, size: 'small' })

new Vue({
  render: h => h(App),
}).$mount('#app')
