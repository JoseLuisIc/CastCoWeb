import session from '../../utils/session'
export default function admin({ next, router }) {
  if (session.user.role !== 3) {
    router.push({ path: '*' })
  }
  return next()
}
