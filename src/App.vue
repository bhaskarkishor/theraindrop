<template>
  <v-app>
    <v-app-bar color="primary" dense dark sticky>
      <v-toolbar-title>The Rain Drop</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text v-if="loggedin" @click="logout">Log Out</v-btn>
    </v-app-bar>

    <v-content class="d-flex flex-direction-row align-content-center">
      <diary v-if="loggedin"/>
      <login v-else/>
    </v-content>
  </v-app>
</template>

<script>
import login from './components/login.vue'
import diary from './components/diary.vue'
import firebase from './firebase.js'

export default {
  name: 'App',

  components: {
    login,
    diary
  },

  data: () => ({
    loggedin:false,
  }),
  mounted:function(){
      firebase.auth().onAuthStateChanged(
        function(user){
          if(user){
            console.log(user);
            this.loggedin = !this.loggedin;
          }
        }.bind(this)
      );
    },
    methods:{
      logout:function(){
        firebase.auth().signOut().then(function(){
          this.loggedin = !this.loggedin;
        }.bind(this))
        .catch(function(error){
          console.log(error);
          alert(error);
        })
      }
    }
};
</script>
