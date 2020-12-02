<template>
  <div>
    <post-metadata :post="post" />
  </div>
</template>
 
<script>
import PostMetadata from './PostMetadata';
import PostService from '@/services/PostService';
export default {
  name: 'ViewPost',
  data() {
    return {
      post0: null,
      post: null,
    };
  },
  async mounted() {
    this.post0 = await PostService.getOnePost(
      this.$store.state.route.params.postId
    );
    this.post = this.post0.data;
  },
  components: {
    PostMetadata,
  },
};
</script>

 <style  scoped>
</style>