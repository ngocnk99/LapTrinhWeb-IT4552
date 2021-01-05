<template>
  <div class="creatPost">
    <div class="container">
      <div class="box box-white">
        <div class="row">
          <div class="col-12">
            <div class="row">
              <div class="col-sm-3 d-flex">
                <div class="company-logo-wrap">
                  <a :href="`/employer/${employer.username}`">
                    <img :src="`${employer.avatar}`" alt="" />
                  </a>
                </div>
              </div>
              <div class="col-sm-9">
                <div class="">
                  <input
                    type="text"
                    placeholder="Tiêu đề tuyển dụng"
                    class="input-setup bc-none h2"
                    v-model="post.title"
                  />
                </div>
                <a :href="`/employer/${employer.username}`" class="companyName"
                  ><strong>{{ employer.companyName }}</strong></a
                >
                <div class="row">
                  <div class="col-sm-6">
                    <div class="d-flex">
                      <span><i class="fas fa-tag"></i></span>
                      <div class="input">
                        <input
                          type="text"
                          placeholder="Ngành/Nghề tuyển dụng"
                          class="input-setup bc-none span"
                          v-model="post.career"
                        />
                      </div>
                    </div>
                    <div class="d-flex">
                      <span><i class="fas fa-clock"></i></span>
                      <div class="input">
                        <input
                          type="text"
                          placeholder="Hình thức làm việc"
                          class="input-setup bc-none span"
                          v-model="post.formOfWork"
                        />
                      </div>
                    </div>
                    <div class="d-flex">
                      <span><i class="fa fa-transgender"></i></span>
                      <div class="input">
                        <input
                          type="text"
                          placeholder="Giới tính"
                          class="input-setup bc-none span"
                          v-model="post.sex"
                        />
                      </div>
                    </div>
                    <div class="d-flex">
                      <span> <i class="fas fa-map-marker-alt"></i></span>
                       <div class="input">
                        <input
                          type="text"
                          placeholder="Địa điểm"
                          class="input-setup bc-none span"
                          v-model="post.address"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="d-flex">
                      <span><i class="fas fa-dollar-sign"></i></span>
                      <div class="input">
                        <input
                          type="text"
                          placeholder="Mức lương"
                          class="input-setup bc-none span"
                          v-model="post.salary"
                        />
                      </div>
                    </div>
                    <div class="d-flex">
                      <span><i class="fa fa-calendar"></i></span>
                      <div class="input">
                        <input
                          type="text"
                          placeholder="Hạn ứng tuyển"
                          class="input-setup bc-none span"
                          v-model="post.dateline"
                        />
                      </div>
                    </div>
                    <div class="d-flex">
                      <span><i class="fa fa-users"></i></span>
                      <div class="input">
                        <input
                          type="text"
                          placeholder="Số lượng tuyển dụng"
                          class="input-setup bc-none span"
                          v-model="post.numberOfPeople"
                        />
                      </div>
                    </div>
                    <div class="d-flex">
                      <span><i class="fa fa-briefcase"></i></span>
                      <div class="input">
                        <input
                          type="text"
                          placeholder="Yêu cầu kinh nghiệm"
                          class="input-setup bc-none span"
                          v-model="post.experience"
                        />
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
            <input
              type="text"
              placeholder="Mô tả công việc"
              class="input-setup bc-none p"
              v-model="post.introduce[index]"
            />
          </div>
          <div class="d-flex">
            <div class="add-button " @click="addIntroduce"></div>
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
            <input
              type="text"
              placeholder="Yêu cầu ứng viên"
              class="input-setup bc-none p"
              v-model="post.request[index]"
            />
          </div>
          <div class="d-flex">
            <div class="add-button " @click="addRequest"></div>
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
            <input
              type="text"
              placeholder="Quyền lợi được hưởng"
              class="input-setup bc-none p"
              v-model="post.benefitsEnjoyed[index]"
            />
          </div>
          <div class="d-flex">
            <div class="add-button " @click="addBenefitsEnjoyed"></div>
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
        <button class="btn button-primary" @click="creatPost">
          Đăng tuyển
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Post from '@/models/post';
import PostService from '@/services/PostService';
import EmployerService from '@/services/employer.service';
export default {
  data() {
    return {
      employer: '',
      text: '',
      message: '',
      post: new Post(),
      error: null,
      required: value => !!value || 'Required.'
    };
  },
  methods: {
    async creatPost(){
      if (!this.post.title || !this.post.career || !this.post.dateline || !this.post.numberOfPeople || !this.post.formOfWork || !this.post.experience || !this.post.salary || !this.post.sex || !this.post.introduce   || !this.post.request   || !this.post.benefitsEnjoyed   ) {
        this.error = 'Please fill in all the required fields.';
        return ;
      }
      try {
        this.post.companyName = this.employer.companyName;
        this.post.employerId = this.employer.id;
        this.post.employerName = this.employer.username;
        this.post.avatar = this.employer.avatar

        const jobId = (await PostService.insertPost(this.post)).data.jobId;
  
        this.$router.push(`/job/${jobId}`);
      } catch (err) {
        this.error = err;
      }
    },
    addIntroduce() {
      this.post.introduce.push('');
    },
    addBenefitsEnjoyed() {
      this.post.benefitsEnjoyed.push('');
    },
    addRequest() {
      this.post.request.push('');
    }
  },
  computed: {
    currentEmployer() {
      return this.$store.state.employ.user;
    }
  },
  created() {
    if (!this.currentEmployer) {
      this.$router.push(`/employer/login`);
    } else {
      EmployerService.getInfo(this.currentEmployer.username).then(
        responseData => {
          this.employer = responseData.data;
        },
        error => {
          this.searchStatus = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    }
    this.post.introduce = ['Mô tả công việc'];
    this.post.request = ['Yêu cầu ứng viên'];
    this.post.benefitsEnjoyed = ['Quyền lợi được hưởng'];
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
