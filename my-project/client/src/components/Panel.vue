<template>
  <div class="panel">
    <h1>{{ title }}</h1>
    <!-- <slot name="bye">No slot</slot> -->
  </div>
</template>
 
<script>
export default {
  name: "Panel",

  data() {
    return {};
  },
  props: ["title"],
};
</script>



 <style  scoped>
.panel {
}
</style>