<template>
  <div class="panel">
    <h1>{{ title }}</h1>
    <slot></slot>
    <slot name="action"></slot>
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