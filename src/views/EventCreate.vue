<template>
  <div><h2>Create Event, {{ user.name }}</h2>
  <p>This event is created by {{ user.name }}</p>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState(['categories', 'user']),
    ...mapGetters(['getCategoriesLength','getEventById'])
  }// <- using object spread operator
}
</script>