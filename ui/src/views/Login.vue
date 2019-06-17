<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-sm-6 col-md-4">
        <h2 class="text-center login-title">Login</h2>
        <div class="account-wall">
          <img class="profile-img" src="images/login.png" />
          <form @submit.prevent="handleSubmit">
            <input class="form-control" v-model="email" type="text" name="email" placeholder="Email" required="required" autofocus="autofocus" />
            <input class="form-control" v-model="password" type="password" name="password" placeholder="Password" required="required" />
            <button class="btn btn-lg btn-primary btn-block" type="submit">Login</button>
            <span class="clearfix"></span>
          </form>
        </div>
        <a class="text-center new-account"><router-link to="/Register">Create an account</router-link></a>
      </div>
    </div>
  </div>
</template>

<script>
  import { authService } from '../services';

  export default {
    data () {
      return {
        email: '',
        password: '',
        submitted: false
      }
    },
    created () {
      // reset login status
      this.$store.commit('auth/logout');
    },
    methods: {
      handleSubmit (e) {
        this.submitted = true;
        const { email, password } = this;
        if (this.email && this.password) {
          const nextUrl = this.$route.params.nextUrl;
          authService.login(email, password)
            .then(user => {
                this.$store.commit('auth/loginSuccess', user);
                this.$router.push(nextUrl || '/');
                // setTimeout(() => this.$router.push(nextUrl || '/'), 100)
                /*this.$nextTick(() => {
                  this.$router.push(nextUrl || '/');
                });*/
              },
              error => {
                this.$store.commit('alert/error', error);
              }
            );
        }
      }
    }
  };
</script>
<style scoped>
  .account-wall{
    margin-top: 10px;
    padding: 20px 0px 20px 0px;
    background-color: #f7f7f7;
    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  }
  .profile-img{
    width: 96px;
    height: 96px;
    margin: 0 auto 10px;
    display: block;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
  }
  form {
    padding: 0 10px 0 10px;
  }
  form button {
    margin: 10px 0 0 0;
  }
  .new-account{
    display: block;
    margin-top: 10px;
  }
</style>