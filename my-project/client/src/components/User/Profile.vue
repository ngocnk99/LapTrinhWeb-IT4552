<template>
<div class="profile-wrap">
  <div class="container">
    <div class="profile">
      <div class="banner">
        <img src="https://firebasestorage.googleapis.com/v0/b/laptrinhweb-4dbf0.appspot.com/o/jobker%2Favatar%2Fprofile_default_cover.jpg?alt=media&token=8ac7a9a7-67e1-415a-a6b6-74b7e1935a56" alt="">
      </div>
    </div>
    <div class="panel-body box box-white" style="position: relative;">
      <div class="row">
        <div class="col-md-3 col-xs-6">
          <div style="padding: 5px; position: relative;">
            <div class="avatar">
              <img :src="`${user.avatar}`" alt="">
            </div>
            <div class="change-avatar" v-if="editStatus">
              <div @click="onPickAvatar" v-if="editStatus">
                  Thay đổi avatar
              </div>
              <input
                type="file"
                class="d-none" ref="avatarInput" accept="image/*" @change="avatarPicked"
              >
            </div>
          </div>
        </div>
        <div class="col-md-8 col-xs-5 info">
          <div class="row">
            <div class="col-xs-12 col-md-6">
              <div class="profile-name">
                <div  v-if="!editStatus">
                  <h3 v-if="user.name">{{user.name}}</h3>
                  <h3 v-else>Tên của bạn</h3>
                </div>
                <input
                  type="text"
                  placeholder="Tên của bạn"
                  class="input-setup bc-none h3"
                  v-if="editStatus"
                  v-model="user.name"
                />
              </div>
              <div class="position-name">
                <div  v-if="!editStatus">
                  <p v-if="user.jobPosition">{{user.jobPosition}}</p>
                  <p v-else>Công việc đang tìm kiếm</p>
                </div>
                <input
                  type="text"
                  placeholder="công việc bạn muốn tìm"
                  class="input-setup bc-none p"
                  v-if="editStatus"
                  v-model="user.jobPosition"
                />
              </div>
            </div>
            <div class="col-xs-12 col-md-6">
                <div  v-if="!editStatus">
                  <h5 v-if="user.academic"><i class="fas fa-school"></i>{{user.academic}}</h5>
                  <h5 v-else><i class="fas fa-school"></i>Trình độ học vấn /Nơi học hiện tại</h5>
                </div>
                <input
                  type="text"
                  placeholder="Trình độ học vấn /nơi học hiên tại"
                  class="input-setup bc-none h5"
                  v-if="editStatus"
                  v-model="user.academic"
                />

            </div>
          </div>
        </div>
      </div>
      <div class="icon-edit-personal" v-if="currentUser">
        <div v-if="!editStatus" @click="editStatus =! editStatus; editSuccesfull = false"><i class="fas fa-pencil-alt"></i>Chỉnh sửa</div>
        <div class="btn-edit" v-if="editSuccesfull" style="width:70px">
          {{message}}             
        </div>
        <div v-if="editStatus&&!waiting" @click="editInfo "><i class="fas fa-pencil-alt"></i>Hoàn thành</div>
        <div v-if="waiting">Đang thay đổi <i class="fas fa-spinner" style="color:#ffc107"></i></div>
        <div v-if="editStatus&&!waiting" @click="notEditInfo "><i class="fas fa-ban" style="color:red"></i>Hủy</div>
      </div>
    </div>
    <div class="creatCV" v-if="currentUser" >
        <div class="creatCV-title "><strong>Tạo CV</strong> chuyển nghiệp, nhận ngay việc làm ưng ý</div>
        <div class="creatCV-btn " v-if="waitingCV == 0&&!haveCV">
          <button class="btn button-primary"  @click="onPickCV">Tạo CV ngay</button>
        </div>
        <div class="creatCV-btn " v-if="waitingCV == 0&&haveCV">
          <button class="btn button-primary"  @click="onPickCV">Thay đổi CV</button>
        </div>
        <div class="creatCV-btn " v-if="waitingCV == 1">
          <button class="btn button-primary"   @click="onPickCV">Đang load CV <i class="fas fa-spinner" style="color:#ffc107"></i></button>
        </div>
        <div class="creatCV-btn "  v-if="waitingCV == 2">
          <button class="btn button-primary"  @click="editCV">Xác nhận thay đổi CV</button>
        </div>
        <div class="creatCV-btn "  v-if="waitingCV == 2">
          <button class="btn button-cancle"  @click="notEditCV">Hủy thay đổi CV</button>
        </div>
        <input
            type="file"
            class="d-none" ref="cvInput" accept=".pdf" @change="cvPicked"
        >
    </div>

    <div class="embed-responsive embed-responsive-1by1" v-if="haveCV">
      <iframe class="embed-responsive-item" :src="`${cv}`"></iframe>
    </div>
  </div>
</div>
</template>

<script>
import firebase from 'firebase';
import userService from '@/services/auth.service';
import User from '@/models/user'
export default {
  name: 'userProfile',
  data() {
    return {
      editSuccesfull : false,
      editStatus: false,
      currentUser: false,
      posts:[],
      user: new User(),
      userForEdit: null,
      message: '',
      avatar:'',
      cv:'',
      waiting:false,
      haveCV:false,
      waitingCV: 0,
    };
  },
  mounted() {
    if (this.$store.state.auth.user) {
      if(this.$route.params.userName == this.$store.state.auth.user.username){
       this.currentUser = true;
      }
    }  
  },
  methods:{
    async editInfo(){
      if(this.cv){
       this.user.cv =  this.cv;
      }
      this.waiting = true;
      if(this.user.avatar != this.userForEdit.avatar){
       this.user.avatar =  await this.onUploadFile(this.avatar,'avatar');
      }else{
        this.user.avatar = JSON.parse(JSON.stringify(this.userForEdit.avatar));
      }
      userService.editInfo(this.user)
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
      this.userForEdit = JSON.parse(JSON.stringify(this.user)) 
      this.waiting =false;
      this.editSuccesfull = !this.editSuccesfull;
      this.editStatus = false;
    },
    async editCV(){
      this.editInfo();
      this.waitingCV = 0;
    },
    notEditInfo(){
      this.user = JSON.parse(JSON.stringify(this.userForEdit))
      this.cv = this.userForEdit.cv || '';
      this.editStatus = false;
    },
    notEditCV(){
      this.notEditInfo();
      this.waitingCV = 0;
    },
    onPickAvatar(){
      this.$refs.avatarInput.click();
    },
    onPickCV(){
      this.$refs.cvInput.click();
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
            this.user.avatar = fileReader.result
          })
          fileReader.readAsDataURL(this.avatar)
      }
    },
    async cvPicked(){
      this.haveCV = false;
      this.waitingCV = 1;
      this.cv = event.target.files[0];
      let filename = this.cv.name;
      if(filename.lastIndexOf('.')<= 0){
        this.haveCV = true;
        return alert('Hãy thêm cv của bận vào')
      }
      else{
          this.cv =  await this.onUploadFile(this.cv,'cv');
          this.waitingCV = 2;
          this.haveCV = true;
      }
    },
    onUploadFile(file,category){
      const storageRef = firebase.storage().ref(`jobker/${category}/${file.name}`).put(file);
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
  async created() {
    let userName = this.$route.params.userName
    userService.getInfo(userName).then(
      (responseData) => {
        this.user = responseData.data;
        if(responseData.data.cv){
          this.cv = responseData.data.cv;
          this.haveCV =  true;
        }
        this.userForEdit = JSON.parse(JSON.stringify(this.user)) 
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
    );
  }
};
</script>

<style lang="scss" scoped>
.profile-wrap{
  background-color: #f0f0f0 ;
  min-height: 88vh;
}
.creatCV{
  margin: 8px 0;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  &-title{
    font-size: 22px;
  }
  &-btn{
      @media only screen and (max-width: 767px) {
        width: 100%;
      }
    .button-primary{
      background-color: #00b14f ;
      color: white;
    }
  }
}
input{
  width: 100%;
}
.banner{
  height: 200px;
  overflow: hidden;
}

.panel-body{
  padding: 15px ;
}

.change-avatar{
  left: 40px;
  width: 120px;
  position: absolute;
  border:1px solid gray;
  @media only screen and (max-width: 1439px) {
    left: 20px;
    top:-15px;
  }
  @media only screen and (max-width: 1023px) {
    left: 0px;
    top:-40px;
  }
  @media only screen and (max-width: 767px) {
    left: 85px;
    top:40px;
  }
  @media only screen and (max-width: 374px) {
    left: 40px;
    top:0px;
  }
}
.avatar{
  left: 0px;
  width: 80%;
  position: absolute;
  border-radius: 50%;
  top: -94px;
  overflow: hidden;
  box-shadow: 0 3px 12px -8px rgba(0,0,0,.75);
  img{
    width: 100%;
  }
}

.info{
  @media only screen and (max-width: 767px) {
    margin-top:160px
  }
}

.icon-edit-personal{
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>