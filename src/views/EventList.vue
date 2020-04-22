<template>
  <div>
    <h1>Events for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event"/>
    <div class='pagination'>
      <template v-if="page !=1">
        <router-link :to="{ name:'event-list', query : {page : page-1}}" rel="prev">Prev Page</router-link>
      </template>
      <template v-else>
         <div></div>
      </template>
      <template v-if="event.eventsTotal > (this.page * 3)">
        <router-link :to="{ name:'event-list', query: { page : page+1 } }"> Next Page </router-link>
      </template>
    </div>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import {mapState} from 'vuex'

export default {
  components: {
    EventCard
  },
  created() {
    this.$store.dispatch('fetchEvents',{
      perPage: 3,
      page: this.page
    })
  },
  computed: {
    page(){
      return parseInt(this.$route.query.page) || 1
    },
    ...mapState(['event', 'user'])
  }
}
</script>

<style scoped>
.pagination{
  display: flex;
  justify-content: space-between;
}
</style>
