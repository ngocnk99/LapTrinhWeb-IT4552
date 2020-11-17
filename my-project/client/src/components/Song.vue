<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" class="m-auto">
        <div class="Song">
          <panel title="Songs">
            <div v-for="song in songs" :key="song.titile">
              {{ song.title }}
              {{ song.artist }}
              {{ song.album }}
            </div>
          </panel>
          <div
            class="post"
            v-for="(post, index) in posts"
            :item="post"
            :index="index"
            :key="post._id"
          >
            {{
              `${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}`
            }}
            <p class="text">{{ post._id }} {{ post.text }} {{ post.name }}</p>
          </div>
          <router-link :to="{ name: 'songs-create' }">
            <i class="fas fa-plus"></i>
          </router-link>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
 
<script>
import Panel from "@/components/Panel.vue";
import PostService from "../services/PostService";
export default {
  name: "Song",

  data() {
    return {
      songs: [
        { title: "song 1", artist: "artis1", album: "album1" },
        { title: "song 2", artist: "artis2", album: "album2" },
        { title: "song 3", artist: "artis3", album: "album3" },
      ],
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
  },

  components: {
    Panel,
  },
};
</script>

 <style  scoped>
.Song {
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