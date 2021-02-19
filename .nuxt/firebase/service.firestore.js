

export default async function (session) {
  await import(/* webpackChunkName: 'firebase-auth' */'firebase/firestore')

  const firestoreService = session.firestore()

    firestoreService.settings({})

  // If statement fixes Issue #390, only runs useEmulator when not yet called (relevant on server)
  if (process.client || firestoreService._delegate._settings.host === 'firestore.googleapis.com') {
    firestoreService.useEmulator('localhost', 8080)
  }

  return firestoreService
}
