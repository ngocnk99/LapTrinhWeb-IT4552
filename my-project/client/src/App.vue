<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href class="navbar-brand" @click.prevent>bezKoder</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/home" class="nav-link">
            <font-awesome-icon icon="home" />Home
          </router-link>
        </li>
        <!-- <li v-if="showAdminBoard " class="nav-item">
          <router-link to="/admin" class="nav-link">Admin Board</router-link>
        </li>-->
        <li v-if="currentEmployer" class="nav-item">
          <router-link to="/employer" class="nav-link"
            >Employer Board</router-link
          >
        </li>
        <li class="nav-item">
          <router-link v-if="currentUser" to="/user" class="nav-link"
            >User</router-link
          >
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/user/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" />LogOut
          </a>
        </li>
      </div>
      <div v-else-if="currentEmployer" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/employer/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentEmployer.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" />LogOut
          </a>
        </li>
      </div>
      <div v-else class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/user/register" class="nav-link">
            <font-awesome-icon icon="user-plus" />Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/user/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" />Login
          </router-link>
        </li>
      </div>
    </nav>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    currentEmployer() {
      return this.$store.state.employ.user;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$store.dispatch('employ/logout');
      this.$router.push('/user/login');
    },
  },
};
</script>
