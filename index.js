import ACSchedule from './src/components/Schedule/index.vue'

/* istanbul ignore next */
ACSchedule.install = function(Vue) {
  Vue.component(ACSchedule.name, ACSchedule)
}

export default ACSchedule
