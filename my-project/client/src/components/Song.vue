<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" class="m-auto">
        <div class="Song">
          <panel title="Songs">
            <div slot="bye"><span>bye bye</span></div>
          </panel>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
 
<script>
import Panel from "@/components/Panel.vue";
export default {
  name: "Song",

  data() {
    return {};
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