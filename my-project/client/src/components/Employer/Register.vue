<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <form name="form" @submit.prevent="handleRegister">
        <div v-if="!successful">
          <div class="form-group">
            <label for="username">Employername</label>
            <input
              v-model="user.username"
              v-validate="'required|min:6|max:20'"
              type="text"
              class="form-control"
              name="username"
            />
            <div
              v-if="submitted && errors.has('username')"
              class="alert-danger"
            >
              {{ errors.first('username') }}
            </div>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              v-model="user.email"
              v-validate="'required|email|max:50'"
              type="email"
              class="form-control"
              name="email"
            />
            <div v-if="submitted && errors.has('email')" class="alert-danger">
              {{ errors.first('email') }}
            </div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              v-model="user.password"
              v-validate="'required|min:6|max:40'"
              type="password"
              class="form-control"
              name="password"
            />
            <div
              v-if="submitted && errors.has('password')"
              class="alert-danger"
            >
              {{ errors.first('password') }}
            </div>
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block">Sign Up</button>
          </div>
          <div class="form__main-or">OR</div>
          <div class="form__main-bot">
            <div class="bot-btn">
              <div class="facebook-btn">Facebook</div>
              <div class="google-btn">Google</div>
            </div>
            <div style="margin-top: 10px">
              Don't Have an Account?
              <router-link to="/employer/login" class="nav-link">
                Sign In Now
              </router-link>
            </div>
          </div>
          <router-link to="/user/register" class="nav-link">
            Are you jobker ?
          </router-link>
        </div>
      </form>

      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import Employer from '@/models/employer';

export default {
  name: 'Register',
  data() {
    return {
      user: new Employer(),
      submitted: false,
      successful: false,
      message: '',
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.employ.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/employer/profile');
    }
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then((isValid) => {
        if (isValid) {
          this.$store.dispatch('employ/register', this.user).then(
            (data) => {
              this.message = data.message;
              this.successful = true;
            },
            (error) => {
              this.message =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      });
    },
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
.form__main-or {
  text-align: center;
  margin: 16px 0;
  position: relative;
}

.form__main-or::after {
  position: absolute;
  width: 40%;
  height: 1px;
  content: '';
  margin: auto;
  position: absolute;
  top: 50%;
  left: 59%;
  background: #beb7b7;
}

.form__main-or::before {
  position: absolute;
  width: 40%;
  height: 1px;
  content: '';
  margin: auto;
  position: absolute;
  top: 50%;
  right: 59%;
  background: #beb7b7;
}

.form__main-bot {
  text-align: center;
}

.form__main-bot a {
  color: black;
}

.form__main-bot a:hover {
  color: #ff324d;
}

.form__main-bot .bot-btn {
  display: flex;
  justify-content: center;
  color: white;
}

.form__main-bot .bot-btn .facebook-btn {
  background-color: #3b5998;
  margin-right: 16px;
  width: 140px;
  height: 45px;
  line-height: 45px;
  border-radius: 10px;
  cursor: pointer;
}

.form__main-bot .bot-btn .google-btn {
  background-color: #d85040;
  width: 140px;
  height: 45px;
  line-height: 45px;
  border-radius: 10px;
  cursor: pointer;
}
</style>