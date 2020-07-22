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
        <v-btn color="primary" @click="writedata" :loading="loading">Submit</v-btn>
        
      </v-container>
  </div>
</template>

<script>
import {firebase} from "../firebase.js";
import moment from 'moment';

export default {
    name:'write',
    data: ()=>({
        pageData:"Dear Diary,\n",
        loading:false,
        loader:null
        }),
    methods:{
      writedata:function(){
        this.loading = true;
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
    },
    
  watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      },
    },
}
</script>

<style>
.custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>