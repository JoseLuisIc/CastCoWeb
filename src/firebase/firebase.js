// firebase.js
import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: "<API_KEY>",
  authDomain: "<PROJECT_ID>.firebaseapp.com",
  projectId: "<PROJECT_ID>",
  storageBucket: "<PROJECT_ID>.appspot.com",
  messagingSenderId: "<SENDER_ID>",
  appId: "<APP_ID>"
}

const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app)

// Solicitar permiso para recibir notificaciones
export const requestNotificationPermission = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: '<YOUR_PUBLIC_VAPID_KEY>'
    })
    if (token) {
      console.log('FCM Token:', token)
      return token
    } else {
      console.log('No token available.')
    }
  } catch (err) {
    console.error('Error retrieving token:', err)
  }
}

// Escuchar mensajes en primer plano
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload)
    })
  })
