

export default async function (session, firebase, ctx, inject) {
  await import(/* webpackChunkName: 'firebase-auth' */'firebase/auth')

  const authService = session.auth()

  authService.useEmulator('http://localhost:9099')

    if (process.client) {
    const persistence = firebase.auth.Auth.Persistence.LOCAL
    try {
      await authService.setPersistence(persistence)
    } catch (err) {
      if (err.code === 'auth/invalid-persistence-type') {
        console.warn(`[@nuxtjs/firebase]: Invalid persistence type '${persistence}' provided`)
      } else if (err.code === 'auth/unsupported-persistence-type') {
        console.warn(`[@nuxtjs/firebase]: Persistence type '${persistence}' is not supported in this environment.`)
      }
    }
  }

  // Sets up a listener, mutations and action for every onAuthStateChanged by Firebase.
  const fireAuthStore = {
    unsubscribe() {
      if (this.unsubscribeAuthStateListener) {
        this.unsubscribeAuthStateListener()
        delete this.unsubscribeAuthStateListener
      }
      if (this.unsubscribeIdTokenListener) {
        this.unsubscribeIdTokenListener()
        delete this.unsubscribeIdTokenListener
      }
    },
    subscribe() {
      return new Promise(resolve => {
        this.unsubscribeAuthStateListener = authService.onAuthStateChanged(async authUser => {
          const claims = authUser ? (await authUser.getIdTokenResult(true)).claims : null

          ctx.store.commit("ON_AUTH_STATE_CHANGED_MUTATION", { authUser, claims })

          await ctx.store.dispatch("onAuthStateChangedAction", { authUser, claims })

          resolve()
        })
      })
    }
  }
  inject('fireAuthStore', fireAuthStore)

  return authService
}
