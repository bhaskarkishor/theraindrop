<template>
  <v-container>
  	<v-row>
  		<v-col cols="12" sm="4"  v-for="(content,i) in journals" :key="i">
        <v-card class="mt-3">
        	<v-card-title>
        		{{content.data.date}}
        	</v-card-title>
        	<v-card-text>
        		{{content.data.content}}
        	</v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="modalPassPhrase">
      <v-card>
        <v-card-text>
          Choose a passphrase for encryption and remember it well.
        
          <v-text-field 
          type="password"
            v-model="passPhrase"
            label="This text will be required for Decrypting added Journals">
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn @click="addPassPhrase">
            Done
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import CryptoJS from 'crypto-js'
  
export default {
    middleware:'auth',
    data(){
    	return {
        modalPassPhrase: false,
        passPhrase: '',
        journals: []
    	}
    },
    async created(){
      await this.$store.dispatch('fetchPages')
      this.journals = this.$store.getters.getJournals
      console.log("Starting decryption...")
      this.decyptJournals()
    },
    computed:{
    	
    },
    methods:{
      decyptJournals(){
        if(window.localStorage.passPhrase){
          let passphrase =  window.localStorage.passPhrase
          this.journals.map(item=>{
            let bytes = CryptoJS.AES.decrypt(item.data.content, passphrase)
            item.data.content = bytes.toString(CryptoJS.enc.Utf8)
          })
        }
        else{
          this.modalPassPhrase = true
        }
        
        console.log("After Decryption",this.journals)
        // let bytes = CryptoJS.AES.decrypt(journal, passphrase)
        // return bytes.toString(CryptoJS.enc.Utf8)
        // console.log(dc)
      },
      addPassPhrase(){
        if(!this.passPhrase || this.passPhrase.length<4){
          alert("Choose a better stronger Pass phrase")
        }
        else{
          window.localStorage.passPhrase = this.passPhrase
          this.modalPassPhrase = false
          this.decyptJournals()
        }
      }
    }
};
</script>

<style>

</style>