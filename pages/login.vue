<template>
  <v-row>
    <v-col sm="4" cols="0" class="primary"></v-col>
    <v-col sm="8" cols="12" class="login-container">

      <div class="login-window text-center mt-10">
          <p class="text-h2">
            Sign In here
          </p>
          <p class="text-bold">
            Your data is encrypted
          </p>
          <firebase-auth></firebase-auth>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import firebaseAuth from '@/components/firebase-auth'
export default {
    middleware:'login',
    layout:'login',
    components:{
        firebaseAuth
    }
};
</script>

<style>
.login-window{
    margin:auto;
    position: absolute;
    margin:0;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
}
.login-container{
  height:100vh;
  position:relative;
}
</style>