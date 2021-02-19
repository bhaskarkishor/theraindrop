import createApp from './app.js'

import authService from './service.auth.js'
import firestoreService from './service.firestore.js'

const appConfig = {"apiKey":"AIzaSyDNQ-k_6i0mSOKe7KuM943fF3VLwDOQe-s","authDomain":"diaryinvue.firebaseapp.com","databaseURL":"https:\u002F\u002Fdiaryinvue.firebaseio.com","projectId":"diaryinvue","storageBucket":"diaryinvue.appspot.com","messagingSenderId":"311235602572","appId":"1:311235602572:web:3fddecc525cdbe7b83b3a9"}

export default async (ctx, inject) => {
  const { firebase, session } = await createApp(appConfig, ctx)

  let servicePromises = []

  if (process.server) {
    servicePromises = [
      authService(session, firebase, ctx, inject),
    firestoreService(session, firebase, ctx, inject),

    ]
  }

  if (process.client) {
    servicePromises = [
      authService(session, firebase, ctx, inject),
      firestoreService(session, firebase, ctx, inject),

    ]
  }

  const [
    auth,
    firestore
  ] = await Promise.all(servicePromises)

  const fire = {
    auth: auth,
    firestore: firestore
  }

    inject('fireModule', firebase)
    ctx.$fireModule = firebase

  inject('fire', fire)
  ctx.$fire = fire
}

function forceInject (ctx, inject, key, value) {
  inject(key, value)
  const injectKey = '$' + key
  ctx[injectKey] = value
  if (typeof window !== "undefined" && window.$nuxt) {
  // If clause makes sure it's only run when ready() is called in a component, not in a plugin.
    window.$nuxt.$options[injectKey] = value
  }
}