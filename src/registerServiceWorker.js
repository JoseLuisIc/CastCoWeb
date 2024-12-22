export default {
  install(Vue) {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js', { scope: '/' })
        .then((registration) => {
          console.log('Service Worker registrado con éxito:', registration.scope)
        })
        .catch((error) => {
          console.error('Error al registrar el Service Worker:', error)
        })
    } else {
      console.warn('El navegador no soporta Service Workers.')
    }
  }
}
