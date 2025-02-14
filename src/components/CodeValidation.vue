<template>
  <div id="hold-transition login-page">
    <img src="/static/img/logo.png" class="center-block logo">
    <div class="login-box">
      <!-- /.login-logo -->
      <div class="login-box-body">
        <p class="login-box-msg">Ingresa el código de validación</p>
        <div class="email-validation">
          <form @submit.prevent="sendCode">
            <div class="form-group has-feedback" v-bind:class="codeError ? 'has-error' : ''">
              <input class="form-control" name="text" placeholder="Ingresar código" type="text" v-model="code">
              <span class="form-control-feedback"> <i class="fa fa-key"></i></span>
            </div>
            <div>
              <button v-bind:class="'btn btn-primary btn-block btn-flat' + loading" type="submit">Validar código</button>
            </div>
          </form>

          <div v-if=response class="text-red">
            <p class="vertical-5p lead">{{ response }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- /.login-box-body -->
  </div>
</template>

<script>
import api from '../api'

export default {
  name: 'CodeValidation',
  data() {
    return {
      section: 'Login',
      loading: '',
      code: '',
      response: '',
      codeError: false
    }
  },
  methods: {
    async sendCode() {
      const { code } = this

      this.toggleLoading()
      this.resetResponse()
      this.$store.commit('TOGGLE_LOADING')
      if (!this.validateForm()) {
        return
      }
      /* Making API call to authenticate a user */
      api
        .request('post', 'validation_code/', { verification_code: code })
        .then(response => {
          this.toggleLoading()

          var data = response.data
          /* Setting user in the state and caching record to the localStorage */
          if (data) {
            console.log(data)
            this.$router.push({ path: `/password_reset/${data.token}`, params: data })
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
      this.codeError = false
      if (this.code === '') {
        this.codeError = true
        this.response = 'El campo email no puede estar en blanco.'
        return false
      }
      return true
    }
  }
}
</script>

<style scoped>
/* Aquí puedes agregar tu estilo */
</style>
