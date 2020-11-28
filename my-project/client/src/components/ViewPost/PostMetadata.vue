<template>
  <div>
    <span>{{ post }}</span>
    <!-- <span>{{post.text}}</span> -->
    <!-- <div>{{post.text}}</div> -->

    <v-btn
      :to="{
        name: 'post-edit',
        params() {
          return {
            postId: post._id,
          };
        },
      }"
    >
      Edit Post
    </v-btn>
  </div>
</template>
 
<script>
export default {
  name: 'PostMetaData',
  data() {
    return {
      //   post0: "",
      //   post: "",
    };
  },
  props: ['post'],
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
  },
  //   async mounted() {
  //     this.post0 = await PostService.getOnePost(
  //       this.$store.state.route.params.postId
  //     );
  //     this.post = this.post0.data;
  //   },
};
</script>

 <style  scoped>
</style>