<template>
  <div class="creatPost">
    <search-job-panel></search-job-panel>
    <div class="back" v-if="currentAdmin">
      <a href="/admin">
       <button class=" back-btn"  >
          <i class="fas fa-arrow-left"></i> Admin Page
        </button>
      </a>
    </div>
    <div class="container"
      v-if="!this.post||this.post.status.status != 1 && !(currentAdmin||currentEmployer)"
    >
     <div class="d-flex">
       <div class="m-auto">
        Bài đăng tuyển không tồn tại
       </div>
     </div>
    </div>
    <div class="job-wrap"
    v-else
    >
      <div class="container"
        v-if="currentAdmin||currentEmployer"
      >
        <div class="d-flex">
          <div class="m-auto">
            <strong>
            Trạng thái bài đăng tuyển:
            <span v-if="this.post.status.status == 1">Đã kiểm duyệt</span>
            <span v-if="this.post.status.status == 2">Đã xóa</span>
            <span v-if="this.post.status.status == 0">Chưa kiểm duyệt</span>
            </strong>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="box box-white">
          <div class="row">
            <div class="col-12">
              <div class="row">
                <div class="col-sm-3 d-flex">
                  <div class="company-logo-wrap">
                    <a :href="`/employer/${employer.username}`">
                      <img :src="`${post.avatar}`" alt="" />
                    </a>
                  </div>
                </div>
                <div class="col-sm-9">
                  <div class="h2">
                  {{post.title}}
                  </div>
                  <a :href="`/employer/${employer.username}`" class="companyName"
                    ><strong>{{ employer.companyName }}</strong></a
                  >
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="d-flex">
                        <span><i class="fas fa-tag"></i></span>
                        <div class="input span">
                          {{post.career}}
                        </div>
                      </div>
                      <div class="d-flex">
                        <span><i class="fas fa-clock"></i></span>
                        <div class="input span">
                            {{post.formOfWork}}
                        </div>
                      </div>
                      <div class="d-flex">
                        <span><i class="fa fa-transgender"></i></span>
                        <div class="input span">
                            {{post.sex}}
                        </div>
                      </div>
                      <div class="d-flex">
                        <span> <i class="fas fa-map-marker-alt"></i></span>
                        <div class="input span">
                          {{post.address}}
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="d-flex">
                        <span><i class="fas fa-dollar-sign"></i></span>
                        <div class="input span">
                          {{post.salary}}
                        </div>
                      </div>
                      <div class="d-flex">
                        <span><i class="fa fa-calendar"></i></span>
                        <div class="input span">
                            {{post.dateline}}
                        </div>
                      </div>
                      <div class="d-flex">
                        <span><i class="fa fa-users"></i></span>
                        <div class="input span">
                          {{post.numberOfPeople}}
                        </div>
                      </div>
                      <div class="d-flex">
                        <span><i class="fa fa-briefcase"></i></span>
                        <div class="input span">
                          {{post.experience}}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="box box-white">
          <h3>Mô Tả công việc</h3>
          <div class="box-input">
            <div
              class="introduction-wrap"
              v-for="(info, index) in post.introduce"
              :key="index"
            >
              <div class="p">
                  - {{post.introduce[index]}}
              </div>
              
            </div>
          </div>
        </div>
        <div class="box box-white">
          <h3>Yêu cầu ứng viên</h3>
          <div class="box-input">
            <div
              class="introduction-wrap"
              v-for="(info, index) in post.request"
              :key="index"
            >
              <div class="p">
                  - {{post.request[index]}}
              </div>
            </div>
          </div>
        </div>
        <div class="box box-white">
          <h3>Quyền lợi được hưởng</h3>
          <div class="box-input">
            <div
              class="introduction-wrap"
              v-for="(info, index) in post.benefitsEnjoyed"
              :key="index"
            >
              <div class="p">
                  - {{post.benefitsEnjoyed[index]}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex">
        <div class="m-auto" v-if="error">
          {{ error }}
        </div>
      </div>
      <div class="d-flex">
        <div class="creat-wrap">
          <div v-if="!currentAdmin">
            <div v-if="!currentEmployer" >
              <button class="btn button-primary" v-if="applyStatus != 0 && applyStatus != 1 && applyStatus != 2" @click="apply">
                Ứng tuyển 
              </button>
               <button class="btn button-primary" v-if="applyStatus == 1" >
                Đã thông qua
              </button>
              <button class="btn button-primary" style="width:auto" v-if="applyStatus == 2" @click="apply">
                Ứng tuyển một lần nữa
              </button>
              <button class="btn button-primary" v-if="applyStatus == 0" >
                Đã ứng tuyển 
              </button>
              
            </div>

            <button class="btn button-primary" v-if="currentEmployer && this.post.status.status != 2" @click="editPost">
            Chỉnh sửa
            </button>
            <button class="btn button-red ml-1" v-if="currentEmployer && this.post.status.status != 2" @click="removePost">
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from '@/services/PostService';
import EmployerService from '@/services/employer.service';
import SearchJobPanel from '../SearchJobPanel.vue';
import UserService from '@/services/auth.service';
export default {
  data() {
    return {
      employer: '',
      text: '',
      message: '',
      post: '',
      error: '',
      currentEmployer:false,
      currentAdmin:false,
      applyStatus:4,
    };
  },
  methods: {
    async apply(){
      if(this.currentUser){
        await UserService.apply(this.currentUser.username,this.$route.params.jobId);
        await PostService.apply(this.currentUser.username,this.$route.params.jobId);
        this.post = (await PostService.getOnePost(this.$route.params.jobId)).data[0];
        const found = this.post.jobkers.filter(el => el.username === this.$store.state.auth.user.username);
        if(found[0]){
          this.applyStatus = found[0].status;
        }
      }else{
        let routeData = this.$router.resolve({name: 'userLogin'});
        window.open(routeData.href, '_blank');
      }
    },
    editPost(){
      this.$router.push(`/post/${this.$route.params.jobId}/edit`)
    },
    removePost(){
      PostService.deletePost(this.$route.params.jobId)
      this.$router.push(`/employer/${this.Employer.username}`)
    }
  },
  computed: {
    Employer() {
      return this.$store.state.employ.user;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  components: {
    SearchJobPanel,
  },
  async created() {
    if(this.Employer) {
      EmployerService.getInfo(this.Employer.username).then(
        responseData => {
          this.employer = responseData.data;
        },
        error => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    }
    this.post = (await PostService.getOnePost(this.$route.params.jobId)).data[0];
    if (this.$store.state.employ.user) {
      if(this.post.employerName == this.$store.state.employ.user.username){
        this.currentEmployer = true;
      }
    }
    
    if(this.$store.state.auth.user){
      const found = this.post.jobkers.filter(el => el.username === this.$store.state.auth.user.username);
      if(found[0]){
        this.applyStatus = found[0].status;
      }
    }

    const admin = JSON.parse(sessionStorage.getItem('admin'));
    if(admin){
      this.currentAdmin = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.back{
  position: fixed;
  top:50%;
  left:10px;
}
.creatPost {
  background-color: #f6f6f6;
  .company-logo-wrap {
    margin: auto;
    img {
      width: 99%;
      max-width: 200px;
      vertical-align: middle;
    }
  }
  .introduction-wrap {
    input {
      margin: 0.5rem 0;
    }
  }
  .creat-wrap {
    margin: 0 auto 16px auto;
  }
  .input {
    flex: 1;
    margin: 0 0 10px;
  }
  .col-sm-3,
  .col-sm-9,
  .col-sm-6 {
    padding-bottom: 0;
  }
  .companyName {
    margin-left: 10px;
    color: black;
  }
}
input {
  width: 100%;
}

.button-primary {
  background-color: #00b14f;
  color: white;
}
.button-red{
  background-color:red ;
  color: white;
}
</style>
