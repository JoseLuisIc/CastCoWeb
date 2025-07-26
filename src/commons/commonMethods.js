import { roles } from '../roles.js'
import util from '../utils/util.js'

export default {
  data() {
    return {
      ADMIN: util.ADMIN,
      MANAGER: util.MANAGER,
      AGENCY: util.AGENCY,
      TALENT: util.TALENT
    }
  },
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
