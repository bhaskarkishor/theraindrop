<template>
  <div>
   
      <div v-for="(text, idx) in texts" :key="idx" class="justify-content-center">
       
        <v-card
                class="float-left mx-3 my-3"
                max-width="344"
                min-width="200"
                outlined
                height="300"
            >
            
            <div v-for="( docid,idy ) in text" :key="idy">
            
            <v-card-text style="">{{ docid.content | truncate(300,'...')}}</v-card-text> 
         
            </div>
            <v-card-actions>
              <v-btn text>More</v-btn>
              <v-btn @click="deleteDoc(text.id[0])" color="secondary">Delete</v-btn>
            </v-card-actions>
        </v-card>
      
      </div>
  
  </div>
</template>

<script>
import firebase from '../firebase.js'

export default {
    name:'pages',
    data: ()=>({
        sample:'randomeosdhfihs',
        texts:[],
        locations:[]
    }),
    methods:{
      deleteDoc:function(docid){
        firebase.firestore().collection("pages").doc(docid).delete().then(function() {
            console.log("Document successfully deleted!");
            alert("deleted");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
});

      }
    },
    mounted(){
      const db = firebase.firestore();
      db
      .collection('pages')
      .get()
      .then(snap=>{
        const texts = [];
        snap.forEach(doc=>{
          texts.push({'id':[doc.id],[doc.id]:doc.data()});
        });
        this.texts = texts;
        console.log(texts);
      })
    },
    filters: {
        truncate: function (text, length, suffix) {
            if (text && text.length > length) {
                return text.substring(0, length) + suffix;
            } else {
                return text;
            }
        },
    }
}
</script>

<style>

</style>