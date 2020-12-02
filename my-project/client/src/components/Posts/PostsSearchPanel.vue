<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" class="m-auto">
        <panel title="Search">
          <v-text-field v-model="search" label="Search by text"> </v-text-field>
        </panel>
      </v-col>
    </v-row>
  </v-container>
</template>
 
<script>
import _ from 'lodash';
import Panel from '@/components/Panel.vue';
export default {
  name: 'PostsSearch',
  data() {
    return {
      search: '',
    };
  },
  components: {
    Panel,
  },
  watch: {
    search: _.debounce(async function () {
      const route = {
        name: 'posts',
      };
      if (this.search !== '') {
        route.query = {
          search: this.search,
          // text: "testtext",
        };
      }
      this.$router.push(route);
    }, 700),
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