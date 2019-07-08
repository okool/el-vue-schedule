import ACSchedule from './src/components/Schedule'

/* istanbul ignore next */
ACSchedule.install = function(Vue) {
  Vue.component(ACSchedule.name, ACSchedule)
}

export default ACSchedule
