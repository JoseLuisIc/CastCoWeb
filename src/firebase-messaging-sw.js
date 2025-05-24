/* importScripts('https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/10.3.1/firebase-messaging.js')

const firebaseConfig = {
  apiKey: "<API_KEY>",
  authDomain: "<PROJECT_ID>.firebaseapp.com",
  projectId: "<PROJECT_ID>",
  storageBucket: "<PROJECT_ID>.appspot.com",
  messagingSenderId: "<SENDER_ID>",
  appId: "<APP_ID>"
}

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message:', payload)
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
*/
