import { roles } from '../roles.js'
import store from '../store'

export function can(permission) {
  const { role } = store.state.user
  return roles[role].includes(permission)
}
