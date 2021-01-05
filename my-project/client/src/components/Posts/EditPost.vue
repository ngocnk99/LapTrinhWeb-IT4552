<template>
  <div class="editPost"> 
    <div class="container">
      <div class="box box-white">
        <div class="row">
          <div class="col-12">
            <div class="row">
            
              <div class="col-sm-9">
                <div class="">
                  <input
                    type="text"
                    placeholder="Tiêu đề tuyển dụng"
                    class="input-setup bc-none h2"
                    v-model="post.title"
                  />
                </div>
                <!-- <a :href="`/employer/${employer.username}`" class="companyName"
                  ><strong>{{ employer.companyName }}</strong></a
                > -->
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
              <div class="col-sm-3 m-auto ">
                <div class="d-flex mt-1">
                  <div class="m-auto">
                    <button class="btn button-primary" @click="edit">
                      Hoàn thành
                    </button>
                  </div>
                </div>
                  <div class="d-flex mt-1">
                  <div class="m-auto">
                    <button class="btn button-red" @click="removePost">
                      Xóa
                    </button>
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
   
  </div> 
</template>

<script>
import PostService from '@/services/PostService';
export default {
  data() {
    return {
      post: '',
      error: null,
    };
  },
  async created() {
    const post0 = await PostService.getOnePost(this.$route.params.postId);
    this.post = post0.data[0]
  },
  methods: {
    async edit() {
      
      await PostService.editPost(this.post);
      this.$router.push(`/job/${this.post._id}`);
    },
    removePost(){
      PostService.deletePost(this.$route.params.postId)
      this.$router.push(`/job/${this.post._id}`);
      // this.$router.push(`/employer/${this.Employer.username}`)
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
  
};
</script>

<style scoped>
.button-primary {
  background-color: #00b14f;
  color: white;
}
.button-red{
  background-color:red ;
  color: white;
}
.button-blue{
  background-color:#007bff;
  color:white
}
.editPost{
  background-color:#f6f6f6 ;
}
</style>

