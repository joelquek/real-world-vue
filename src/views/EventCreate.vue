<template>
  <div><h2>Create Event, {{ userName }}</h2>
  <p>This event is created by {{ userName }}</p>
  </div>
</template>
<script>
export default {
  computed:{
    userName(){
      return this.$store.state.user.name
    }
  }
}
</script>