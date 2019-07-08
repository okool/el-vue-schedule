<script>
import Vue from 'vue'
import OrderSchedule from './Pages/OrderSchedule.vue'

export default {
  name: 'app',
  components:{
    [OrderSchedule.name]:OrderSchedule
  }
}
</script>
<template>
  <div>
      <order-schedule />
  </div>
</template>


