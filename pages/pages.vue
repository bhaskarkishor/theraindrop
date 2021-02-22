<template>
      <div>
        <v-row  v-masonry transition-duration="0.3s" item-selector=".item" class="pt-5">
          <v-col v-masonry-tile class="mx-3 item col-12 col-sm-6" v-for="(content,i) in journals" :key="i">
            <v-card class="" flat outlined>
              
            	<v-card-title>
            		{{content.data.date}}
            	</v-card-title>
            	<v-card-text v-html="content.data.content" style="white-space: pre-wrap;">
            		{{}}
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
              <v-spacer></v-spacer>
              <v-btn @click="addPassPhrase">
                Done
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
</div>
</template>

<script>
import CryptoJS from 'crypto-js'
  
export default {
    middleware:'auth',
    layout:'login', 
    data(){
    	return {
        modalPassPhrase: false,
        passPhrase: '',
        journals: []
    	}
    },

    mounted(){
      if (typeof this.$redrawVueMasonry === 'function') {
        this.$redrawVueMasonry()
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

<style lang="scss">

</style>