<template>
  <v-layout>
    <v-flex xs4>
      <panel title="Song Metadata">
        <v-text-field
          label="text"
          required
          :rules="[required]"
          v-model="song.text"
        ></v-text-field>

        <v-text-field
          label="YouTube ID"
          v-model="song.youtubeId"
        ></v-text-field>
      </panel>
    </v-flex>

    <v-flex xs8>
      <panel title="Song Structure" class="ml-2">
        <v-text-field label="Tab" multi-line v-model="song.tab"></v-text-field>

        <v-text-field label="Lyrics" multi-line v-model="text"></v-text-field>
      </panel>

      <div class="danger-alert" v-if="error">
        {{ error }}
      </div>

      <v-btn dark class="cyan" @click="create"> Create Song </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import PostService from "../services/PostService";
import Panel from "@/components/Panel.vue";
export default {
  data() {
    return {
      text: "",
      song: {
        text: null,
        youtubeId: null,
        tab: null,
      },
      error: null,
      required: (value) => !!value || "Required.",
    };
  },
  methods: {
    async create() {
      this.error = null;
      const areAllFieldsFilledIn = Object.keys(this.song).every(
        (key) => !!this.song[key]
      );
      console.log(areAllFieldsFilledIn);
      if (!areAllFieldsFilledIn) {
        this.error = "Please fill in all the required fields.";

        return;
      }
      try {
        await PostService.insertPost(this.song);
      } catch (err) {
        console.log(err);
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

