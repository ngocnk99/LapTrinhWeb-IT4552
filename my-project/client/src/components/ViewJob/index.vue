<template>
  <div class="creatPost">
    <search-job-panel></search-job-panel>
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
        <button class="btn button-primary" @click="recruitment">
          Ứng tuyển 
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from '@/services/PostService';
import EmployerService from '@/services/employer.service';
import SearchJobPanel from '../SearchJobPanel.vue';
export default {
  data() {
    return {
      employer: '',
      text: '',
      message: '',
      post: '',
      error: '',
    };
  },
  methods: {
    async recruitment(){
      
    },
  },
  computed: {
    currentEmployer() {
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
    if(this.currentEmployer) {
      EmployerService.getInfo(this.currentEmployer.username).then(
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

  }
};
</script>

<style lang="scss" scoped>
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
</style>
