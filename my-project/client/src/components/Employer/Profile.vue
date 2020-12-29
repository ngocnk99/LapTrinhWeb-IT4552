<template>
  <div class="company">
    <div class="company-cover">
      <div class="container">
        <div class="banner">
          <img :src="`${employer.banner}`" alt="" class ="banner-img">
          <button @click="onPickBanner" v-if="editStatus">
            <span>Thay đổi banner</span>
          </button>
          <input
            type="file"
            class="d-none" ref="bannerInput" accept="image/*" @change="bannerPicked">
        </div>
        <div class="row detail"> 
          <div class="col-sm-9">
            <div class="row">
              <div class="col-sm-3">
                <div class="company-logo">
                  <div class="logo-cover">
                    <img :src="`${employer.avatar}`" alt="" class ="logo-img">
                    <button @click="onPickAvatar" v-if="editStatus">
                      <span>Thay đổi avatar</span>
                    </button>
                    <input
                      type="file"
                      class="d-none" ref="avatarInput" accept="image/*" @change="avatarPicked">
                  </div>
                </div>
              </div>
            <div class="col-sm-9">
              <div class="detail-name">
                 <h2  v-if="!editStatus">{{employer.companyName}} </h2>
                  <input
                    type="text"
                    placeholder="Tên Công Ty"
                    class="input-setup bc-none h2"
                    v-if="editStatus"
                    v-model="employer.companyName"
                  />
              </div>
              <div class="detail-info d-flex">
                  <div class="info-link " v-if="!editStatus"><i class="fas fa-globe"></i><a :href="`${employer.webLink}`" target="_blank">{{employer.webLink}}</a></div>
                  <div class="info-link"  v-if="editStatus">
                    <i class="fas fa-globe"></i>
                    <input
                      type="text"
                      placeholder="Tên Công Ty"
                      class="input-setup bc-none  "
                      v-model="employer.webLink"
                    />
                  </div>
                  <div class="info-member" v-if="!editStatus"><i class="fas fa-users"></i> {{employer.members}} nhân viên</div> 
                  <div class="info-member" v-if="editStatus">
                    <i class="fas fa-users"></i> 
                    <input
                      type="text"
                      placeholder="Tên Công Ty"
                      class="input-setup bc-none"
                      v-model="employer.members"
                    />
                  </div>
              </div>  
            </div>
            </div>
          </div>
          <div class="col-sm-3">
            <div class="box-btn">
              <div class="btn-follow" v-if="!currentEmployer">
                  <button class="btn button-default ">Theo dõi</button>
              </div>
              <div class="btn-evaluate" v-if="!currentEmployer">
                <button class="btn button-primary ">Đánh giá</button>              
              </div>
              <div class="btn-edit" v-if="currentEmployer && !editStatus" @click="editStatus =! editStatus; editSuccesfull = false">
                <button class="btn button-primary ">Chỉnh sửa</button>              
              </div>
              <div class="btn-edit" v-if="currentEmployer && editSuccesfull" >
                {{message}}             
              </div>
              <div class="btn-edit" v-if="editStatus" @click="editInfo">
                <button class="btn button-primary ">Hoàn thành</button>              
              </div>
              <div class="btn-edit" v-if="editStatus" @click="notEditInfo">
                <button class="btn button-cancle ">Hủy</button>              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="company-info">
      <div class="container">
        <div class="row company-info-box">
           <div class="col-md-8 col-sm-7 col-left">
             <div class="info-introduction">
                <div class="lef-box-title">
                 <h2>Giới thiệu công ty</h2>
                </div>
                <div class="box box-white ">
                  <div
                    class="introduction-wrap"
                    v-for="(info, index) in employer.introduce"
                    :key="index"
                  >
                    <input
                      type="text"
                      placeholder="Giới Thiệu Công Ty"
                      class="input-setup bc-none p"
                      v-model="employer.introduce[index]"
                      v-if="editStatus"
                    />
                    <p v-if="!editStatus">{{employer.introduce[index]}}</p>
                  </div>
                  <div class="d-flex" v-if="editStatus">
                    <div class="add-button " @click="addIntroduce"></div>                 
                  </div>
                </div>
                <div class="lef-box-title">
                  <h2>Tuyển dụng</h2>
                </div>
                 <div class="box box-white ">
                  <div
                    class="post-wrap"
                    v-for="(info, index) in posts"
                    :key="index"
                  >
                    <h5><a href=""> {{info.title}}</a></h5>
                    <div class="row">
                      <div class="col-md-3 col-sm-6 job-deadline job-meta-data text-dark-gray"><i class="fas fa-clock "></i>{{info.dateline}}</div>
                      <div class="col-md-3 col-sm-6 job-salary  job-meta-data text-dark-gray"><i class="fas fa-dollar-sign"></i>{{info.salary}}</div>
                      <div class="col-md-3 col-sm-6 job-location  job-meta-data text-dark-gray"><i class="fas fa-map-marker-alt"></i>{{employer.address}}</div>
                      <div class="col-md-3 col-sm-6 job-type  job-meta-data text-dark-gray"><i class="fas fa-briefcase"></i>{{info.formOfWork}}</div>
                    </div>
                    <span
                    class="post-job-wrap"
                    >
                      {{info.career}}
                    </span>
                  </div>
                  <div class="d-flex" v-if="editStatus">
                    <div class="add-button " @click="$router.push('/post/create');"></div>                 
                  </div>
                </div>
             </div>
           </div>
           <div class="col-md-4 col-sm-5 col-right">
              <div class="box box-white">
                  <div class="box-title text-center text-dark-blue bold">Đánh giá</div>
                  <p>Hiện chưa có đánh giá nào. Hãy là người đầu tiên đưa ra đánh giá</p>
                  <div class="d-flex">
                    <div class="star "><i class="fas fa-star fa-2x"></i><i class="fas fa-star fa-2x"></i><i class="fas fa-star fa-2x"></i><i class="fas fa-star fa-2x"></i><i class="fas fa-star fa-2x"></i></div>
                  </div>
                  <div class="d-flex">
                    <button class="btn button-primary m-auto" v-if="!currentEmployer">Đánh giá</button>    
                  </div>
              </div>
              <div class="box box-white">
                <div class="box-title text-center text-dark-blue bold">Vị trí</div>
                <i class="fas fa-map-marker-alt"></i>
                <span v-if="!editStatus"> {{employer.address}}</span>
                <input
                    type="text"
                    placeholder="Tên Công Ty"
                    class="input-setup bc-none span"
                    v-if="editStatus"
                    v-model="employer.address"
                />
              </div>
              <div class="box box-white">
                <div class="box-title text-center text-dark-blue bold">Chia sẻ thông tin với bạn bè</div>
                <div class="d-flex">
                  <div class="share d-flex">
                    <i class="fb-icon fab fa-facebook fa-3x"></i>
                    <i class="tw-icon fab fa-twitter-square fa-3x"></i>
                    <i class="gg-icon fab fa-google-plus-square fa-3x"></i>
                  </div>
                </div>
              </div>
           </div>  
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import EmployerService from '@/services/employer.service';
import PostService from '@/services/PostService';
import Employer from '@/models/employer'
import employerService from '@/services/employer.service';
export default {
  name: 'Profile',
  data() {
    return {
      editSuccesfull : false,
      editStatus: false,
      currentEmployer: false,
      posts:[],
      employer: new Employer(),
      employerForEdit: null,
      message: '',
      banner:null,
      avatar:null,
    };
  },
  methods:{
    async editInfo(){
      if(this.employer.banner != this.employerForEdit.banner){
       this.employer.banner =  await this.onUploadFile(this.banner,'banner');
      }else{
        this.employer.banner = JSON.parse(JSON.stringify(this.employerForEdit.banner));
      }
      if(this.employer.avatar != this.employerForEdit.avatar){
       this.employer.avatar =  await this.onUploadFile(this.avatar,'avatar');
      }else{
        this.employer.avatar = JSON.parse(JSON.stringify(this.employerForEdit.avatar));
      }
      employerService.editInfo(this.employer)
      .then(
      (responseData) => {
        this.message = responseData.data.message
    
      },
      (error) => {
        this.message =
         (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      });
      this.employerForEdit = JSON.parse(JSON.stringify(this.employer)) 
      this.editSuccesfull = !this.editSuccesfull;
      this.editStatus = !this.editStatus;
    },
    notEditInfo(){
      this.employer = JSON.parse(JSON.stringify(this.employerForEdit)) 
      this.editStatus = !this.editStatus;
    },
    addIntroduce(){
      this.employer.introduce.push('');
    },
    onPickBanner(){
      this.$refs.bannerInput.click();
    },
    onPickAvatar(){
      this.$refs.avatarInput.click();
    },
    bannerPicked(){
      this.banner = event.target.files[0];
      let filename = this.banner.name;
      if(filename.lastIndexOf('.')<= 0){
        return alert('Hãy thêm ảnh của bận vào')
      }
      else{
          const fileReader = new FileReader();
          fileReader.addEventListener('load',()=>{
            this.employer.banner = fileReader.result
          })
          fileReader.readAsDataURL(this.banner)
      }
    },
    avatarPicked(){
      this.avatar = event.target.files[0];
      let filename = this.avatar.name;
      if(filename.lastIndexOf('.')<= 0){
        return alert('Hãy thêm ảnh của bận vào')
      }
      else{
          const fileReader = new FileReader();
          fileReader.addEventListener('load',()=>{
            this.employer.avatar = fileReader.result
          })
          fileReader.readAsDataURL(this.avatar)
      }
    },
    onUploadFile(file,category){
      const storageRef = firebase.storage().ref(`employer/${category}/${file.name}`).put(file);
      return new Promise(resolve => {
        storageRef.on('state_changed', () =>{       
          }, (error) => {
            this.error = error.message;
          }, () => {
            storageRef.snapshot.ref.getDownloadURL().then((downloadURL) => {
              resolve(downloadURL) ;
            });
        });
      })  
    },
  },  
  computed: {
    currentUser() {
      return this.$store.state.employ.user;
    },
    disabled() {
      return false;
    }
  },
  mounted() {
    if (this.$store.state.employ.user) {
      if(this.$route.params.employerName == this.$store.state.employ.user.username){
       this.currentEmployer = true;
      }
    }
   
    
  },
  async created() {
    let emplyerName = this.$route.params.employerName
    EmployerService.getInfo(emplyerName).then(
      (responseData) => {
        this.employer = responseData.data;
        this.employerForEdit = JSON.parse(JSON.stringify(this.employer)) 
        return responseData.data.id
      },
      (error) => {
        this.searchStatus = false;
        this.message =
         (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    ).then((employerId) => {
      PostService.getPostByEmployer(employerId).then(
        (responseData) => {
          this.posts = responseData.data
        }
      );
    });
  }
};
</script>



<style lang="scss" scoped>

  .company{
    &-cover{
      .banner{
        position: relative;
        button{
          border:none;
          position: absolute;
          top:0;
          right: 0;
          width: 100%;
          height: 100%;
          background-color:transparent;
          span{
            border: 1px solid gray;
            background-color: rgba(255,255,255,0.4);
          }
        }
        &-img{
          width: 100%;
        }
      }
      .company-logo{
        position: relative;
        margin-left: 5px;
        @media only screen and (max-width: 767px) {
          display: none;
        }
        .logo-cover{
          background-color: #fff;
          height: 175px;
          width: 175px;
          position: absolute;
          top: -50px;
          border: 1px solid rgb(223, 217, 217);
          @media only screen and (max-width: 1023px) {
            height: 130px;
            width: 130px;
            top: -35px;
          }
          .logo-img{
            width: 100%;
          }
          button{
            border:none;
            position: absolute;
            top:0;
            right: 0;
            width: 100%;
            height: 100%;
            background-color:transparent;
            span{
              border: 1px solid gray;
              background-color: rgba(255,255,255,0.4);
            }
          }
        }
      }
    }
    .detail{
      .col-sm-9,.col-sm-3{
        padding: 12px 15px 0 15px;;
      }
      button{
        width: 100%;
      }
      &-info{
        margin-left:5px;
        .info-link{
          flex:1;
        }
        .info-member{
          flex: 1;
        }
      }
      .btn-evaluate{
        .btn{
          margin-bottom: 0px!important;
        }
      }
    }
    &-info{
      background-color: #f6f6f6;
      .introduction-wrap{
        input{
          width: 100%;
          margin-bottom: 1rem
        }
      }
      .company-info-box{
        margin-top:15px;
      }
      .post-wrap{
        border-bottom: 1px solid gray;
        padding-bottom: 10px;
        .post-job-wrap{
          background-color: rgb(224, 219, 219);
          border-radius: 5px;
          margin-right: 10px;
        }
      }
      .col-right{
        margin-top:48px;
        .star{
          margin: 0px auto 10px auto;
          i{
            color: #ccc6c6;
          }
        }
        .share{
          margin: 10px auto 10px auto;
          i{
            margin: 0 10px;
          }
        }
      }
    }
  }

  button{
    width: 180px;
    margin-bottom: 10px;
    border-radius: 3px;
    outline: none;
  }

  .button-default{
    border: 1px solid black;
    &:hover{
      background-color: rgb(209, 205, 205);
    }
  }
  
  .button-primary{
      background-color: #00b14f;
      color: white;
  }
  .button-cancle{
    background-color: #b81509;
    color: white;
  }
  a{
    color: black;
    text-decoration: none;
    &:hover{
      text-decoration: none;
      color: #00b14f;
    }
  }
</style>