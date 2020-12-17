<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" class="m-auto">
          <v-text-field v-model="search" label="Search by text"> </v-text-field>
          <i class="fas fa-search"></i>
      </v-col>
    </v-row>
  </v-container>
</template>
 
<script>
import EmployerService from '@/services/employer.service';
import _ from 'lodash';
export default {
  name: 'PostsSearch',
  data() {
    return {
      search: '',
      reponseData: [],
    };
  },
  watch: {
    search: _.debounce(async function () {
      if (this.search !== '') {
         this.reponseData = (await EmployerService.search(this.search)).data;
         console.log(this.reponseData);
      }
    }, 500),
    '$route.query.search': {
      immediate: true,
      handler(value) {
        this.search = value;
      },
    },
  },
};
</script>

 <style  scoped>
.m-auto {
  margin: auto;
}
</style>