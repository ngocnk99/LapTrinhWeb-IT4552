<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" class="m-auto">
          <panel title="Register"> </panel>

          <div class="register">
            <div class="abc">
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                name="email"
                placeholder="Your Email"
              >
              </v-text-field>
            </div>
            <br />
            <div class="password">
              <v-text-field
                v-model="password"
                :type="show2 ? 'text' : 'password'"
                name="password"
                placeholder="Password"
                label="Password"
                hint="At least 6 characters"
              ></v-text-field>
              <font-awesome-icon
                v-if="!show2"
                class="icon"
                :icon="myIcon2"
                @click="show2 = !show2"
              />
              <font-awesome-icon
                v-if="show2"
                class="icon"
                :icon="myIcon1"
                @click="show2 = !show2"
              />
            </div>
            <br />
            <div class="password">
              <v-text-field
                v-model="confirm_password"
                :type="show1 ? 'text' : 'password'"
                name="password"
                placeholder="Confrim Password"
                label="Password"
                hint="At least 6 characters"
              ></v-text-field>
              <font-awesome-icon
                v-if="!show1"
                class="icon"
                :icon="myIcon2"
                @click="show1 = !show1"
              />
              <font-awesome-icon
                v-if="show1"
                class="icon"
                :icon="myIcon1"
                @click="show1 = !show1"
              />
            </div>
            <v-btn @click="register">Register!!</v-btn>
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
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
      confirm_password: "",
      error: "",
      show1: false,
      show2: false,
      myIcon1: faEyeSlash,
      myIcon2: faEye,
    };
  },
  methods: {
    async register() {
      if (this.password != this.confirm_password) {
        this.error = "Password verification is incorrect";
      } else {
        try {
          const response = await UserAuthenticationService.register({
            email: this.email,
            password: this.password,
          });
          this.$router.push({
            name: "userLogin",
          });
        } catch (err) {
          this.error = err.response.data.error;
        }
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
.password,
.confirm_password {
  position: relative;
}
.icon {
  position: absolute;
  top: 32%;
  right: 6px;
}
</style>
