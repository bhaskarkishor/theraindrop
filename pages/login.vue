<template>
  <v-container class="login-window">
      <firebase-auth/>
  </v-container>
</template>

<script>
import firebaseAuth from '@/components/firebase-auth'
export default {
    middleware:'login',
    components:{
        firebaseAuth
    }
        
}
</script>

<style>
.login-window{
    display:flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
    min-width:500px;
}
</style>