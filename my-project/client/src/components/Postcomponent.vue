<template>
  <div class="container">
    <h1>Latest Posts</h1>
    <!---CREATE POST HERE --->
    <hr />

    <hr />
    <div class="posts-container">
      <div
        class="post"
        v-for="(post, index) in posts"
        :item="post"
        :index="index"
        :key="post._id"
        @click="deletePost(post._id)"
      >
        {{
          `${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}`
        }}
        <p class="text">{{ post.text }} {{ post.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import PostService from '../services/PostService';
export default {
  name: 'PostComponent',
  data() {
    return {
      posts: [],
      error: '',
      text: '',
      info: null,
      id: 'a',
    };
  },
  async created() {
    this.posts = await PostService.getPosts();
  },
  methods: {
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.post {
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>
