<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-sm-6 col-md-4">
        <h2 class="text-center login-title">Registration Details</h2>
          <div class="signup-wall">
            <em v-if="loading">Creating user...</em>
            <span v-if="error" class="text-danger">{{error}}</span>
            <form @submit.prevent="handleSubmit">
              <input class="form-control" v-model.trim="email" type="email" name="email" placeholder="Email" required="required" />
              <input class="form-control nomargin" v-model.trim="password" type="password" name="password" placeholder="Password" required="required" />
              <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
              <span class="clearfix"></span>
            </form>
          </div>
      </div>
    </div>
  </div></template>

<script>
  import { userService } from '../services';

  export default {
    name: "Register",
    data () {
      return {
        email: '',
        password: '',
        loading: false,
        error: null
      }
    },
    methods: {
      reset() {
        this.loading = true;
        this.error = null;
      },
      handleSubmit (e) {
        this.reset();
        const { email, password } = this;
        if (this.email && this.password) {
          userService.create(email, password)
            .then(
              user => {
                this.$router.push('/login');
                this.$nextTick(() => {
                  this.$store.commit('alert/success', `Created ${user.email} user`);
                })
              },
              error => this.error = error
            )
            .then(() => this.loading = false );
        }
      }
    }
  }
</script>
