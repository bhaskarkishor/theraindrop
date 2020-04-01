<template>
  <div>
      <v-container class="px-5 py-5">
        <v-textarea
          outlined
          rounded
          name="input-7-7"
          :label="date"
          rows="12"
          auto-grow
          v-model="pageData"
        ></v-textarea>
        <v-btn rounded color="primary" @click="writedata">Submit</v-btn>
        
      </v-container>
  </div>
</template>

<script>
import firebase from "../firebase.js";
import moment from 'moment';

export default {
    name:'write',
    data: ()=>({
        pageData:"Dear Diary,\n",
        
        
    }),
    methods:{
      writedata:function(){
        firebase.firestore().collection("pages")
        .add({
          date:this.date,
          content:this.pageData
        })
        .then(function(docRef){
          
          alert("document saved",docRef);
        })
        .catch(function(error){
          alert(error);
          
        })
      }
    },
    computed:{
      date:function(date){
        return moment(date).format('DD-MM-YYYY');
      }
    }
}
</script>

<style>

</style>