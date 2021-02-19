import colors from 'vuetify/es5/util/colors'
export default {
    target:'static',
    ssr:false,
    modules: ['@nuxtjs/firebase'],
    buildModules: [
      '@nuxtjs/vuetify',
    ],
    vuetify: {
      theme: {
        dark: false,
        themes: {
          dark: {
            primary: '#dc1354',
            accent: colors.teal.lighten4,
            secondary: colors.teal,
            info: colors.teal.lighten1,
            warning: colors.amber.base,
            error: colors.deepOrange.accent4,
            success: colors.green.accent3
  
          },
          light:{
            primary: '#dc1354',
            accent: colors.teal.lighten4,
            secondary: colors.teal,
            info: colors.teal.lighten1,
            warning: colors.amber.base,
            error: colors.deepOrange.accent4,
            success: colors.green.accent3,
            bg: colors.grey.lighten2
          }
        }
      }
    }, 
    
    firebase: {
        config: {
            apiKey: "AIzaSyDNQ-k_6i0mSOKe7KuM943fF3VLwDOQe-s",
            authDomain: "diaryinvue.firebaseapp.com",
            databaseURL: "https://diaryinvue.firebaseio.com",
            projectId: "diaryinvue",
            storageBucket: "diaryinvue.appspot.com",
            messagingSenderId: "311235602572",
            appId: "1:311235602572:web:3fddecc525cdbe7b83b3a9"
        },
        services:{
            auth: {
            persistence: 'local', // default
            initialize: {
              onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
              onAuthStateChangedAction: 'onAuthStateChangedAction',
              subscribeManually: false
            },
            ssr: false, // default
            emulatorPort: process.env.NODE_ENV === 'production' ? undefined : 9099,
            emulatorHost: 'http://localhost',
          },
        firestore: {
            memoryOnly: false, // default
            chunkName: process.env.NODE_ENV !== 'production' ? 'firebase-auth' : '[id]', // default
            enablePersistence: false,
            emulatorPort: process.env.NODE_ENV === 'production' ? undefined : 8080 ,
            emulatorHost: 'localhost',
            settings: {
              // Firestore Settings - currently only works in SPA mode
            }
          }
        }
        
    }
}