<template>
  <v-form autocomplete="on">
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" class="m-auto">
          <h1>Login</h1>
          <div class="register">
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              name="email"
              placeholder="Your Email"
            ></v-text-field>
            <br />
            <v-text-field
              v-model="password"
              type="password"
              name="password"
              placeholder="Password"
              label="Password"
              hint="At least 6 characters"
            ></v-text-field>
            <br />
            <v-btn @click="login">Login!!</v-btn>
          </div>
          <br />
          <div class="error" v-html="error" />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
/* eslint-disable */
import UserAuthenticationService from "@/services/UserAuthenticationService";
export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
      confirm_password: "",
      error: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await UserAuthenticationService.login({
          email: this.email,
          password: this.password,
        });
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
        this.$router.push({
          name: "home",
        });
      } catch (err) {
        this.error = err.response.data.error;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.register {
  padding: 10px 10px;
  border: 1px solid gray;
  border-radius: 5px;
}
.m-auto {
  margin: auto;
}
.error {
  color: red;
}
</style>
