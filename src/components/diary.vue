<template>
  <div>
      <v-tabs>
          <v-tab>WriteUp page</v-tab>
          <v-tab-item>
              <write/>
          </v-tab-item>
          <v-tab>Diary pages</v-tab>
          <v-tab-item>
              <pages/>
          </v-tab-item>
      </v-tabs>
  </div>
</template>

<script>
import write from './write.vue'
import pages from './pages.vue'

export default {
    name:'diary',
    components:{
        write,
        pages
    }
}
</script>

<style>

</style>