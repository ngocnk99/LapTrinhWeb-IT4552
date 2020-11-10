<template>
  <div class="fixed header">
    <div class="rightmenu">
      <v-btn class="logo" @click="navigateTo({ name: 'home' })">Home</v-btn>
    </div>
    <div class="leftmenu">
      <v-btn
        v-if="!$store.state.isUserLoggedIn"
        @click="navigateTo({ name: 'userRegister' })"
      >
        Register
      </v-btn>
      <v-btn
        v-if="!$store.state.isUserLoggedIn"
        @click="navigateTo({ name: 'userLogin' })"
      >
        Login
      </v-btn>
      <v-btn v-if="$store.state.isUserLoggedIn" @click="logout">
        Log out
      </v-btn>
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
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.push({
        name: "home",
      });
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

