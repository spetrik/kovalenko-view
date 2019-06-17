<template>
  <div>
    <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    computed: {
      alert () {
        return this.$store.state.alert
      }
    },
    watch:{
      $route (to, from){
        // clear alert on location change
        this.$store.commit('alert/clear');
      }
    }
  };
</script>
