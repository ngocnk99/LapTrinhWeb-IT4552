<template>
     <body>
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-5">
                                <div class="card shadow-lg border-0 rounded-lg mt-5">
                                    <div class="card-header"><h3 class="text-center font-weight-light my-4">ADMIN</h3></div>
                                    <div class="card-body">
                                        <form  name="form" @submit.prevent="handleLogin">
                                            <div class="form-group">
                                                <label class="small mb-1" for="inputEmailAddress">Admin Name</label>
                                                <input
                                                    v-model="username"
                                                    v-validate="'required'"
                                                    type="text"
                                                    class="form-control py-4"
                                                    name="username"
                                                />
                                                <div
                                                v-if="errors.has('username')"
                                                class="alert alert-danger"
                                                role="alert"
                                                 >
                                                    Admin name is required!
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="small mb-1" for="inputPassword">Password</label>
                                                 <input
                                                  class="form-control py-4" 
                                                  v-validate="'required'"
                                                  v-model="password"
                                                  type="password" 
                                                  placeholder="Enter password" 
                                                />
                                                <div
                                                    v-if="errors.has('password')"
                                                    class="alert alert-danger"
                                                    role="alert"
                                                 >
                                                    Admin name is required!
                                                </div>
                                            </div>
                                            
                                            <div class="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <button class="btn btn-primary btn-block" :disabled="loading">
                                                    <span
                                                        v-show="loading"
                                                        class="spinner-border spinner-border-sm"
                                                    ></span>
                                                    <span>Login</span>
                                                </button>
                                            </div>
                                             <div class="form-group">
                                                <div v-if="message" class="alert alert-danger" role="alert">
                                                    {{ message }}
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <div id="layoutAuthentication_footer">
                <footer class="py-4 bg-light mt-auto">
                    <div class="container-fluid">
                        <div class="d-flex align-items-center justify-content-between small">
                            <div class="text-muted">Copyright &copy; JOBS 2020</div>
                            <div>
                                <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    </body>
</template>

<script>
import adminService from '../../services/AdminService'
export default {
  name: 'Login',
  data() {
    return {
        username: '',
        password: '',
        loading: false,
        message: '',
    };
  },

  methods: {
     handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (this.username && this.password) {
            adminService.login(this.username,this.password)
            .then(() =>{
                this.$store.state.admin = true;
                this.$router.push('/admin');
            },
            (error) => {
              this.loading = false;
              this.message =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
            })
        }
      });
    },
  },
  created() {
    const admin = JSON.parse(sessionStorage.getItem('admin'));
    if(admin){
        this.$router.push('/admin');
    }
   
  },
};
</script>

<style scoped>
main{
    background-color: #f6fbf9;
    height: 90vh;
}
</style>