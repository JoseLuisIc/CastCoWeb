import { roles } from '../roles.js'

export default {
  methods: {
    logout() {
      this.$store.commit('SET_USER', null)
      this.$store.commit('SET_TOKEN', null)

      if (window.localStorage) {
        window.localStorage.setItem('user', null)
        window.localStorage.setItem('token', null)
      }

      this.$router.push('/login')
    },
    can(permission) {
      const { role } = this.$store.state.user
      return roles[role].includes(permission)
    }
  }
}
