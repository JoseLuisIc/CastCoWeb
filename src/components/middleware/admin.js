import store from '../../store'

export default function admin({ next, router }) {
  if (store.state.user.role !== 4) {
    router.push({ path: 'notfound' })
  }
  return next()
}
