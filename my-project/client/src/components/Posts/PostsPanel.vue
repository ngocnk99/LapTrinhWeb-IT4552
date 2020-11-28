<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" class="m-auto">
        <div class="Post">
          <panel title="Posts">
            <div
              class="post"
              v-for="(post, index) in posts"
              :item="post"
              :index="index"
              :key="post._id"
            >
              <!-- {{
                `${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}`
              }} -->
              <p class="text">{{ post._id }} {{ post.text }} {{ post.name }}</p>
              <v-btn
                @click="
                  navigateTo({
                    name: 'post',
                    params: { postId: post._id },
                  })
                "
              >
                View Post
              </v-btn>
            </div>
          </panel>
          <router-link :to="{ name: 'posts-create' }">
            <i class="fas fa-plus"></i>
          </router-link>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
 
<script>
import Panel from '@/components/Panel.vue';
import PostService from '@/services/PostService';
export default {
  name: 'PostsPanel',

  data() {
    return {
      posts: [],
    };
  },
  async created() {
    this.posts = await PostService.getPosts();
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
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler(value) {
        this.posts = (await PostService.index(value)).data;
      },
    },
  },
  components: {
    Panel,
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