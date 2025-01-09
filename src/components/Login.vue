<template>
  <div id="login">
    <img src="/static/img/logo.png" class="center-block logo">

    <div class="text-center col-md-12 col-lg-4 col-xl-5"></div>
    <div class="text-center col-md-12 col-lg-4 col-xl-5">
      <!-- login form -->
      <form @submit.prevent="checkCreds" class="signin-form">
        <div class="input-group" v-bind:class="emailError ? 'has-error' : ''">
          <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
          <input class="form-control" name="email" placeholder="Username" type="text" v-model="email">
        </div>

        <div class="input-group" v-bind:class="passwordError ? 'has-error' : ''">
          <span class="input-group-addon"><i class="fa fa-lock"></i></span>
          <input class="form-control" name="password" placeholder="Password" type="password" v-model="password">
        </div>
        <button type="submit" v-bind:class="'btn btn-primary btn-lg ' + loading">Iniciar sesión</button>
      </form>
      <!-- errors -->
      <div v-if=response class="text-red">
        <p class="vertical-5p lead">{{ response }}</p>
      </div>
    </div>
    <div class="text-center col-md-12 col-lg-4 col-xl-5"></div>
  </div>
</template>

<script>
import api from '../api'
import jwtdecode from 'jwt-decode'
import util from '../utils/util'
import store from '../store'
export default {
  name: 'Login',
  data(router) {
    return {
      section: 'Login',
      loading: '',
      email: '',
      password: '',
      response: '',
      passwordError: false,
      emailError: false
    }
  },
  methods: {
    checkCreds() {
      const { email, password } = this

      this.toggleLoading()
      this.resetResponse()
      this.$store.commit('TOGGLE_LOADING')
      if (!this.validateForm()) {
        return
      }
      /* Making API call to authenticate a user */
      api
        .request('post', 'token/', { email, password })
        .then(response => {
          this.toggleLoading()

          var data = response.data
          /* Setting user in the state and caching record to the localStorage */
          if (data) {
            var token = 'Bearer ' + data.access

            var decoded = jwtdecode(data.access)
            this.$store.commit('SET_USER', decoded.user)
            this.$store.commit('SET_TOKEN', token)
            store.state.user = decoded.user
            console.log(decoded)
            if (window.localStorage) {
              window.localStorage.setItem('user', JSON.stringify(decoded.user))
              window.localStorage.setItem('token', token)
              window.localStorage.setItem('access', data.access)
              window.localStorage.setItem('refresh', data.refresh)
            }
            switch (decoded.user.role) {
              case util.ADMIN:
                this.$router.push({ path: 'admin/dashboard' })
                break
              case util.MANAGER:
                this.$router.push({ path: 'manager/dashboard' })
                break
              case util.AGENCY:
                this.$router.push({ path: 'agency/talents' })
                break
              default:
                this.$router.push('talent/profile')
                break
            }
          }
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
      this.passwordError = false
      if (this.email === '') {
        this.emailError = true
        this.response = 'El campo email no puede estar en blanco.'
        return false
      }
      if (this.password === '') {
        this.passwordError = true
        this.response = 'El campo password no puede estar en blanco.'
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
