<template>
  <div>
    <NavBar></NavBar>
    <div>
      <h3>Users from secure api end point:</h3>
      <em v-if="loading">Loading users...</em>
      <span v-if="error" class="text-danger">{{error}}</span>
      <ul>
        <li v-for="user in users" :key="user.email">
          {{user.email}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { userService } from '../services';
  import NavBar from './NavBar';

  export default {
    name: "Users",
    components: {NavBar},
    created () {
      this.setUsers();
    },
    data () {
      return {
        users: [],
        loading: false,
        error: null
      }
    },
    methods: {
      reset() {
        this.loading = true;
        this.error = null;
      },
      setUsers() {
        this.reset();
        userService.getAll()
          .then(
            users => this.users = users,
            error => this.error = error
          )
          .then(() => this.loading = false );
      }
    }
  }
</script>
