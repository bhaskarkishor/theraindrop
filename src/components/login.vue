<template>
  <v-app id="inspire">

   <div class="text-center" v-if="loggingin">
    <v-progress-circular
      indeterminate
      color="primary"
    ></v-progress-circular>
   </div>


    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer />
                
                <v-tooltip right>
                  
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    name="login"
                    v-model="email"
                    type="text" required
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    v-model="pwd"
                    type="password" required
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="login && loggingin != loggingin">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import firebase from '../firebase.js'

export default {
    name:'login',
    props: {
      
    },
    data:()=>({
      logginin:false,
      email:"",
      pwd:""
    }),
    methods:{
      login:function(){
        this.loggingin = true;
        firebase.auth().signInWithEmailAndPassword(this.email,this.pwd)
        .catch(function(error){
          console.log(error);
          alert(error);
        });
      }
    },
    mounted:function(){
      firebase.auth().onAuthStateChanged(
        function(user){
          if(user){
            console.log(user);

          }
        }.bind(this)
      );
    }
}
</script>