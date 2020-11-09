<template>
  <div class="fixed header">
    <div class="rightmenu">
      <div class="logo" @click="navigateTo({ name: 'home' })">logo</div>
    </div>
    <div class="leftmenu">
      <v-btn @click="navigateTo({ name: 'userRegister' })"> Register </v-btn>
      <v-btn @click="navigateTo({ name: 'userLogin' })"> Login </v-btn>
    </div>
  </div>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
  },
};
</script>

<style scoped>
.header {
  background-color: cyan;
  width: 100%;
  padding: 5px 20px;
  justify-content: space-between;
  display: flex;
}
.fixed {
  position: sticky;
}
.home {
  cursor: pointer;
}
.home:hover {
  color: #e9e;
}
</style>

