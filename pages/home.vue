<template>
  <v-row>
    <v-col cols="0" sm="4" class="secondary"></v-col>
    <v-col class="col-12 col-sm-8 write-window">
      <v-container>
        <v-textarea
          color="black"
          v-model="content"
          :label="label"
          rows="10"
          auto-grow
          placeholder="Write your day here"
        ></v-textarea>
        <v-btn color="primary" @click="addPage">
          Save Page
        </v-btn>
        <v-dialog v-model="modalPassPhrase">
          <v-card>
            <v-card-text>
              Choose a passphrase for encryption and remember it well.
            
              <v-text-field 
                v-model="passPhrase"
                label="This text will be required for Decrypting added Journals">
              </v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="addPassPhrase">
                Done
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import CryptoJS from 'crypto-js'

export default {
    middleware:'auth',
    layout:'login',
    data(){
      return{
        content:'',
        modalPassPhrase: false,
        passPhrase:null
      }
    },
    computed:{
      label(){
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let today  = new Date();
        return today.toLocaleDateString("en-US", options)
      }
    },
    mounted(){

    },
    methods:{
      async addPage(){
        if(window.localStorage.passPhrase){
          let passphrase = window.localStorage.passPhrase
          // Encryption using passphrase
          let encryptedText = CryptoJS.AES.encrypt(this.content, passphrase).toString();
          // Encytion over
          this.$store.dispatch('addPage',{
            content: encryptedText,
            date: this.label
          });
          console.log('Page added')
          this.$router.push('/pages')
        }
        else{
          this.modalPassPhrase = true
        }
      },
      addPassPhrase(){
        if(!this.passPhrase || this.passPhrase.length<4){
          alert("Choose a better stronger Pass phrase")
        }
        else{
          window.localStorage.passPhrase = this.passPhrase
          this.modalPassPhrase = false
          this.addPage()
        }
      }
    }
};
</script>

<style>
.write-window{
  height:100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>