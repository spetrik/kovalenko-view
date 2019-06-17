<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-light mb-3">
    <template v-if="loggedIn">
    <ul class="navbar-nav">
      <li class="nav-item"><router-link to="/" class="nav-link">Home</router-link></li>
      <li class="nav-item"><router-link to="/books" class="nav-link">Books</router-link></li>
      <li class="nav-item"><router-link to="/users" class="nav-link">Users</router-link></li>
      <li class="nav-item"><router-link to="/about" class="nav-link">About</router-link></li>
    </ul>
    <ul class="navbar-nav ml-auto">
      <li class="nav-item"><a class="nav-link" @click="logout">Logout</a></li>
    </ul>
    </template>
    <template v-else>
      <ul class="navbar-nav">
        <li class="nav-item"><router-link to="/login" class="nav-link">Login</router-link></li>
      </ul>
    </template>
  </nav>
</template>

<script>
  export default {
    name: "NavBar",
    computed: {
      loggedIn () {
        return this.$store.getters['auth/loggedIn'];
      }
    },
    methods: {
      logout() {
        this.$store.commit('auth/logout');
        this.$router.push('/login');
      }
    }
  }
</script>
<style scoped>
  .nav-link.router-link-exact-active {
    color: black !important;
  }
</style>