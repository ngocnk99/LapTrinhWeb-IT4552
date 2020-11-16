<template>
  <v-form autocomplete="on">
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" class="m-auto">
          <panel title="Login"> </panel>
          <div class="login">
            <div class="email">
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                name="email"
                placeholder="Your Email"
              ></v-text-field>
            </div>
            <br />
            <div class="password">
              <v-text-field
                v-model="password"
                :type="show ? 'text' : 'password'"
                name="password"
                placeholder="Password"
                label="Password"
                hint="At least 6 characters"
              ></v-text-field>
              <font-awesome-icon
                v-if="!show"
                class="icon"
                :icon="myIcon2"
                @click="show = !show"
              />
              <font-awesome-icon
                v-if="show"
                class="icon"
                :icon="myIcon1"
                @click="show = !show"
              />
            </div>
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
import Panel from "@/components/Panel.vue";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      confirm_password: "",
      error: "",
      show: false,
      myIcon1: faEyeSlash,
      myIcon2: faEye,
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
  components: {
    Panel,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
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

.password {
  position: relative;
}
.icon {
  position: absolute;
  top: 32%;
  right: 6px;
}
</style>
