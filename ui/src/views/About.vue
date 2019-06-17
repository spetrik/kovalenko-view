<template>
  <div>
    <NavBar></NavBar>
    <div>
      <h1>Hi {{user.email}}!</h1>
      <p>You're logged in with Vue + Vuex & JWT!!</p>
    </div>
  </div>
</template>

<script>
  import NavBar from './NavBar'
  export default {
    components: { NavBar },
    computed: {
      user () {
        return this.$store.state.auth.user;
      }
    }
  };
</script>