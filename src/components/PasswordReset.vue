<template>
  <div id="hold-transition login-page">
    <img src="/static/img/logo.png" class="center-block logo">
    <div class="login-box">
      <!-- /.login-logo -->
      <div class="login-box-body">
        <p class="login-box-msg">Reestablecer contraseña</p>

        <form @submit.prevent="checkCreds" method="post" class="signin-form">
          <div class="form-group has-feedback" v-bind:class="passwordError ? 'has-error' : ''">
            <input class="form-control" name="password" placeholder="Password" type="password" v-model="password">
            <span class="form-control-feedback"> <i class="fa fa-lock"></i></span>
          </div>
          <div class="form-group has-feedback" v-bind:class="passwordConfirmError ? 'has-error' : ''">
            <input class="form-control" name="password" placeholder="Confirmar Password" type="password"
              v-model="passwordConfirm">
            <span class="form-control-feedback"> <i class="fa fa-lock"></i></span>
          </div>
          <div class="row">
            <div class="col-xs-6">

            </div>
            <!-- /.col -->
            <div class="col-xs-6">
              <button type="submit" v-bind:class="'btn btn-primary btn-block btn-flat' + loading">Restablecer</button>
            </div>

            <!-- /.col -->
          </div>
        </form>
        <!--
          <div class="social-auth-links text-center">
            <p>- OR -</p>
            <a href="#" class="btn btn-block btn-social btn-facebook btn-flat"><i class="fa fa-facebook"></i> Sign in
              using
              Facebook</a>
            <a href="#" class="btn btn-block btn-social btn-google btn-flat"><i class="fa fa-google-plus"></i> Sign in
              using
              Google+</a>
          </div>
           /.social-auth-links -->

        <!--<a href="login">Iniciar Sesion</a><br>-->
        <div v-if=response class="text-red">
          <p class="vertical-5p lead">{{ response }}</p>
        </div>
      </div>
      <!-- /.login-box-body -->
    </div>
  </div>
</template>

<script>
import api from '../api'
export default {
  name: 'ResetPassword',
  data(router) {
    return {
      section: 'Login',
      loading: '',
      password: '',
      passwordConfirm: '',
      response: '',
      passwordError: false,
      passwordConfirmError: false,
      token: ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.token = this.$route.params.token
    })
  },
  methods: {
    checkCreds() {
      const { token, password, passwordConfirm } = this

      this.toggleLoading()
      this.resetResponse()
      this.$store.commit('TOGGLE_LOADING')
      if (!this.validateForm()) {
        return
      }
      /* Making API call to authenticate a user */
      api
        .request('post', 'recover_password/', { token: token, password: password, confirm_password: passwordConfirm })
        .then(response => {
          this.toggleLoading()
          this.$router.push({ path: '/login' })
        })
        .catch(error => {
          this.$store.commit('TOGGLE_LOADING')
          console.log(error.response)
          if (error.response) {
            var data = error.response.data
            this.response = data.detail
          }
          this.toggleLoading()
        })
    },
    toggleLoading() {
      this.loading = this.loading === '' ? 'loading' : ''
    },
    resetResponse() {
      this.response = ''
    },
    validateForm() {
      this.response = ''
      this.emailError = false
      if (this.email === '') {
        this.emailError = true
        this.response = 'El campo email no puede estar en blanco.'
        return false
      }
      return true
    }
  }
}
</script>

<style>
#login {
  padding: 10em;
}

html,
body,
.container-table {
  height: 100%;
  background-color: #282b30 !important;
}

.container-table {
  display: table;
  color: white;
}

.vertical-center-row {
  display: table-cell;
  vertical-align: middle;
}

.vertical-20p {
  padding-top: 20%;
}

.vertical-10p {
  padding-top: 10%;
}

.vertical-5p {
  padding-top: 5%;
}

.logo {
  width: 15em;
  padding: 3em;
}

.input-group {
  padding-bottom: 2em;
  height: 4em;
  width: 100%;
}

.input-group span.input-group-addon {
  width: 2em;
  height: 4em;
}

@media (max-width: 1241px) {
  .input-group input {
    height: 4em;
  }
}

@media (min-width: 1242px) {

  .input-group input {
    height: 6em;
  }
}

.input-group-addon i {
  height: 15px;
  width: 15px;
}
</style>
