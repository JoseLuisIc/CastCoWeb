<template>
  <div id="hold-transition login-page">
    <img src="/static/img/logo.png" class="center-block logo">
    <div class="login-box">
      <!-- /.login-logo -->
      <div class="login-box-body">
        <p class="login-box-msg">Validación de correo</p>
        <div class="email-validation">
          <form @submit.prevent="sendEmail">
            <div class="form-group has-feedback" v-bind:class="emailError ? 'has-error' : ''">
              <input class="form-control" name="email" placeholder="Ingresar correo" type="text" v-model="email">
              <span class="form-control-feedback"> <i class="fa fa-envelope"></i></span>
            </div>
            <div>
              <button v-bind:class="'btn btn-primary btn-block btn-flat' + loading" type="submit">Enviar código de
                validación</button>
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
  name: 'EmailValidation',
  data() {
    return {
      section: 'Login',
      loading: '',
      email: '',
      response: '',
      emailError: false
    }
  },
  methods: {
    async sendEmail() {
      const { email } = this

      this.toggleLoading()
      this.resetResponse()
      this.$store.commit('TOGGLE_LOADING')
      if (!this.validateForm()) {
        return
      }
      /* Making API call to authenticate a user */
      api
        .request('post', 'verification_code/', { email })
        .then(response => {
          this.toggleLoading()

          const data = response.data
          /* Setting user in the state and caching record to the localStorage */
          if (data) {
            console.log(data)
            this.$router.push('code_validation')
          }
        })
        .catch(error => {
          this.$store.commit('TOGGLE_LOADING')
          console.log(error.response)
          if (error.response) {
            const data = error.response.data
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

<style scoped>
/* Aquí puedes agregar tu estilo */
</style>
