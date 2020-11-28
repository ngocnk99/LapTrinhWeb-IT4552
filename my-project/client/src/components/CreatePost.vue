<template>
  <v-layout>
    <v-flex xs4>
      <panel title="Post Metadata">
        <v-text-field label="text" v-model="post.text"></v-text-field>
      </panel>
      <panel title="Post Metadata">
        <v-text-field label="text" v-model="post.title"></v-text-field>
      </panel>
    </v-flex>

    <v-flex xs8>
      <div class="danger-alert" v-if="error">
        {{ error }}
      </div>

      <v-btn dark class="cyan" @click="create"> Create Post </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import PostService from '@/services/PostService';
import Panel from '@/components/Panel.vue';
export default {
  data() {
    return {
      text: '',
      post: {
        text: null,
        title: null,
      },
      error: null,
      required: (value) => !!value || 'Required.',
    };
  },
  methods: {
    async create() {
      this.error = null;
      const areAllFieldsFilledIn = Object.keys(this.post).every(
        (key) => !!this.post[key]
      );
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields.';
        return;
      }
      try {
        await PostService.insertPost(this.post);
        this.$router.push({
          name: 'posts',
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

