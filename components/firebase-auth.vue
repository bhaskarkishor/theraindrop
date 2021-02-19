<template>
  <div id="firebaseui-auth-container"/>
</template>

<script>
import * as firebaseui from 'firebaseui'
export default {
  mounted: function () {
    var uiConfig = {
      signInSuccessUrl: '/home',
      signInOptions: [
        this.$fireModule.auth.EmailAuthProvider.PROVIDER_ID,
        this.$fireModule.auth.GoogleAuthProvider.PROVIDER_ID,
        ]
      };
    var ui = new firebaseui.auth.AuthUI(this.$fireModule.auth());
    ui.start('#firebaseui-auth-container', uiConfig);
  }
}
</script>

<style src="~/node_modules/firebaseui/dist/firebaseui.css"></style>