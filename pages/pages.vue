<template>
  <v-row>
    <v-col class="col-0 col-sm-4 secondary left-side-box"></v-col>
    <v-col class="col-12 col-sm-8 right-side-box">
      <v-container class="masonary">
        <v-row>
          <v-col class="col-12 col-sm-6" v-for="(content,i) in journals" :key="i">
            <v-card class="mt-3" flat outlined>
              
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
    	return {
        modalPassPhrase: false,
        passPhrase: '',
        journals: []
    	}
    },

    // mounted(){
    //   this.resizeAllMasonryItems()
    // },
    async created(){
      await this.$store.dispatch('fetchPages')
      this.journals = this.$store.getters.getJournals
      console.log("Starting decryption...")
      this.decyptJournals()
      // let masonryEvents = ['load', 'resize']
      // let vm = this
      // masonryEvents.forEach(function (event) {
      //     window.addEventListener(event, vm.resizeAllMasonryItems);
      // });
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
      },
      resizeMasonryItem (item) {
        let grid = document.getElementsByClassName('masonry')[0],
          rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap')),
          rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
        let rowSpan = Math.ceil((item.querySelector('.card-content').getBoundingClientRect().height+rowGap) / (rowHeight + rowGap));
        item.style.gridRowEnd = 'span ' + rowSpan;
      },
      resizeAllMasonryItems () {
        let allItems = document.getElementsByClassName('card');
        for (let i = 0; i < allItems.length; i++) {
          this.resizeMasonryItem(allItems[i]);
        }
      }
    }
};
</script>

<style scoped>
.left-side-box {
}
.right-side-box{
  position: relative;
}
.masonry {
        display: grid;
        grid-gap: 15px;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        grid-auto-rows: 0;
    }
</style>