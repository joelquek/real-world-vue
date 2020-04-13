<template>
  <div>
    <h2>Create Event, {{ user.name }}</h2>
    <p>This event is created by {{ user.name }}</p>
    <button @click="incrementCount">Increment</button>
    <input type="number" v-model.number="incrementBy">
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  data(){
    return {
      incrementBy: 1
      }
  },
  computed: {
    ...mapState(['categories', 'user']),
    ...mapGetters(['categoriesLength','getEventById'])
  },
  methods:{
    incrementCount(){
      this.$store.dispatch('updateCount', this.incrementBy)
    }
  }
}
</script>