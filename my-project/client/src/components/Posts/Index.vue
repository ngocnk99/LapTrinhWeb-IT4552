<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <posts-search-panel></posts-search-panel>
      <posts-panel title="Posts"></posts-panel>
    </v-flex>
  </v-layout>
</template>
 
<script>
import PostsPanel from './PostsPanel';
import PostService from '@/services/PostService';
import PostsSearchPanel from './PostsSearchPanel.vue';

export default {
  name: 'Index',

  data() {
    return {
      posts: [],
    };
  },
  async created() {
    this.posts = (await PostService.getOnePost(this.$store.state.route.params.postId)).data;
  },
  methods: {
    async createPost() {
      await PostService.insertPost(this.text);
      this.posts = await PostService.getPosts();
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    },
    navigateTo(route) {
      this.$router.push(route);
    },
  },

  components: {
    PostsPanel,
    PostsSearchPanel,
  },
};
</script>

 <style  scoped>
.post {
  border: 1px solid gray;
  border-radius: 2px;
  padding-bottom: 10px;
}

.title {
  background-color: aqua;
  color: white;
  font-size: 20px;
}

.m-auto {
  margin: auto;
}
</style>