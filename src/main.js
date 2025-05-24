// Import ES6 Promise
import 'es6-promise/auto'

// Import System requirements
import Vue from 'vue'
import VueRouter from 'vue-router'

import { sync } from 'vuex-router-sync'
import routes from './routes'
import store from './store'

// Import Helpers for filters
import { domain, count, prettyDate, pluralize } from './filters'

// Import Views - Top level
import AppView from './components/App.vue'

import { roles } from './roles.js' // Importa los roles y permisos definidos
// import registerServiceWorker from './registerServiceWorker'

// Import Install and register helper items
Vue.filter('count', count)
Vue.filter('domain', domain)
Vue.filter('prettyDate', prettyDate)
Vue.filter('pluralize', pluralize)

Vue.directive('can', {
  bind(el, binding) {
    const { role } = store.state.user // Obten el rol del usuario desde Vuex
    const requiredPermission = binding.value
    const hasAccess = roles[role].includes(requiredPermission)
    if (!hasAccess) {
      el.style.display = 'none'
    }
  }
})
// Vue.use(registerServiceWorker)
Vue.use(VueRouter)

// Routing logic
const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL,
  linkExactActiveClass: 'active',
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})

// Creates a `nextMiddleware()` function which not only
// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index]
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters)
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1)
    subsequentMiddleware({ ...context, next: nextMiddleware })
  }
}
// Some middleware to help us ensure the user is authenticated.
router.beforeEach((to, from, next) => {
  if (
    to.matched.some(record => record.meta.requiresAuth) &&
    (!router.app.$store.state.token || router.app.$store.state.token === 'null')
  ) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    window.console.log('Not authenticated')
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    // console.log(to, from)
    if (to.meta.middleware) {
      const middleware = Array.isArray(to.meta.middleware)
        ? to.meta.middleware
        : [to.meta.middleware]
      const context = {
        from,
        next,
        router,
        to
      }
      const nextMiddleware = nextFactory(context, middleware, 1)

      return middleware[0]({ ...context, next: nextMiddleware })
    }

    return next()
  }
})

sync(store, router)
// Check local storage to handle refreshes
if (window.localStorage) {
  const localUserString = window.localStorage.getItem('user') || null
  try {
    const localUser = JSON.parse(localUserString)
    if (localUser && store.state.user !== localUser) {
      store.commit('SET_USER', localUser)
      store.commit('SET_TOKEN', window.localStorage.getItem('token'))
    }
  } catch (error) {
    console.log(error)
  }
}
// Start out app!
// eslint-disable-next-line no-new
new Vue({
  el: '#root',
  router,
  store,
  render: h => h(AppView)
})

// change this. demo
window.bugsnagClient = window.bugsnag('02fe1c2caaf5874c50b6ee19534f5932')
window.bugsnagClient.use(window.bugsnag__vue(Vue))
