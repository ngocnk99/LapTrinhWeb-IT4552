<template>
  <v-layout>
    <v-flex xs4>
      <div>{{ this.post }}</div>
      <panel title="Post Metadata">
        <v-text-field label="text" v-model="post.text"></v-text-field>
      </panel>
    </v-flex>
    <div>{{ post.text }}</div>
    <v-flex xs8>
      <div class="danger-alert" v-if="error">
        {{ error }}
      </div>

      <v-btn dark class="cyan" @click="edit"> Save Post </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import PostService from '@/services/PostService';
import Panel from '@/components/Panel.vue';
export default {
  data() {
    return {
      post: {
        text: 'a',
      },
      error: null,
    };
  },
  async mounted() {
    this.post0 = await PostService.getOnePost(
      this.$store.state.route.params.postId
    );
    this.post = this.post0.data;
  },
  methods: {
    async edit() {
      try {
        await PostService.editPost(this.post);
        this.$router.push({
          name: 'post',
          params: {
            postId: this.$store.state.route.params.postId,
          },
        });
      } catch (err) {
        this.error = err;
      }
    },
  },
  components: {
    Panel,
  },
};
</script>

<style scoped>
</style>

