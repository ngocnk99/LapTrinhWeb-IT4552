<template>
  <div id="app">
    <nav class="navbar navbar-expand " v-if="!admin">
      <div class="container">
        <div class="navbar-nav ">
          <li class="nav-item">
            <router-link to="/home" class="nav-link home">
              <font-awesome-icon icon="home" />JOBS
            </router-link>
          </li>
          <li v-if="currentEmployer" class="nav-item">
            <router-link to="/post/create" class="nav-link"
              >Đăng tuyển</router-link
            >
          </li>
          <li v-if="currentUser" class="nav-item">
            <router-link to="/employer" class="nav-link">
              Công ty
            </router-link>
          </li>
        </div>

        <div v-if="currentUser" class="navbar-nav">
        <li class="nav-item">
            <router-link to="/user/jobs-manage" class="nav-link">
              Quản lí ứng tuyển
            </router-link>
          </li>
          <li class="nav-item">
            <div class="dropdown show">
              <a class="btn user  dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
               <img :src="`${jobker.avatar}`" alt="" style="width:40px;border-radius:50%;">
              </a>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <router-link :to="{ name: 'userProfile', params: {userName: jobker.username } }" class="nav-link">
                   Profile
                </router-link>              
                <a class="nav-link" href @click.prevent="logOut">
                  Đăng xuất
                </a>
              </div>
            </div>          
          </li>
          <li class="notification nav-item">
             <div class="dropdown show">
               <a class="btn noti-btn  dropdown-toggle" href="#" role="button" id="dropdownNoti" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="fas fa-bell "></i>
              </a>
              <div class="notify-number">{{notify}}</div>
              <div class="dropdown-menu " aria-labelledby="dropdownNoti">
                <div class="no-Noti" v-if="notify == 0 ">
                  Bạn không có thông báo nào
                  <div class="dropdown-divider"></div>
                </div>
                <div class="notify" v-if="notify !=0 ">
                   <div class="notify-wrap">
                      <div class="notify-item-wrap"
                         v-for="noti in notifyAplly"
                        v-bind:key="noti.id"
                      >
                    
                        <div class="notify-item" >
                        <span v-if="noti.status == 1">
                          Ứng tuyển công việc mã Id: <strong @click="viewNotifyApply($store.state.auth.user.username,noti.id)">"{{noti.id}}"</strong> của bạn đã được thông qua
                        </span>
                        <span v-if="noti.status == 2">
                          Ứng tuyển công việc mã Id: <strong @click="viewNotifyApply($store.state.auth.user.username,noti.id)">"{{noti.title}}"</strong> của bạn đã bị từ chối
                        </span>
                      </div>
                        <div class="watched" @click="watchedNotifyApply($store.state.auth.user.username,noti.id)">Xác nhận</div>
                        </div>
                    </div>
                </div>
              </div>
             </div>
          </li>
        </div>

        <div v-else-if="currentEmployer" class="navbar-nav ">
          <li class="nav-item">
            <router-link to="/employer/apply-manage" class="nav-link">
              Quản lí ứng tuyển
            </router-link>
          </li>
          <li class="nav-item">
            <div class="dropdown show">
              <a class="btn user  dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
               <img :src="`${employer.avatar}`" alt="" style="width:40px;border-radius:50%;">
              </a>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <router-link :to="{ name: 'employerProfile', params: {employerName: employer.username } }" class="nav-link">
                   Profile
                </router-link>              
                <a class="nav-link" href @click.prevent="logOut">
                  Đăng xuất
                </a>
              </div>
            </div>          
          </li>
          <li class="notification nav-item">
             <div class="dropdown show">
               <a class="btn noti-btn  dropdown-toggle" href="#" role="button" id="dropdownNoti" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="fas fa-bell "></i>
              </a>
              <div class="notify-number">{{notify}}</div>
              <div class="dropdown-menu " aria-labelledby="dropdownNoti">
                <div class="no-Noti" v-if="notify == 0 ">
                  Bạn không có thông báo nào
                  <div class="dropdown-divider"></div>
                </div>
                <div class="notify" v-if="notify !=0 ">
                    <div class="notify-wrap">
                      <div class="notify-item-wrap"
                         v-for="noti in notifyPost"
                        v-bind:key="noti._id"
                      >
                        <div class="notify-item" >
                        <span v-if="noti.status.status == 1">
                          Bài đăng tuyển <strong @click="viewNotifyPost(noti._id,noti.status.status)">"{{noti.title}}"</strong> của bạn đã được thông qua
                        </span>
                        <span v-if="noti.status.status == 2">
                          Bài đăng tuyển <strong @click="viewNotifyPost(noti._id,noti.status.status)">"{{noti.title}}"</strong> của bạn đã xóa
                        </span>
                        <span v-if="noti.status.status == 0">
                          Bài đăng tuyển <strong @click="viewNotifyPost(noti._id,noti.status.status)">"{{noti.title}}"</strong> của bạn đã được khôi phục
                        </span>
                      </div>
                        <div class="watched" @click="watchedNotifyPost(noti._id,noti.status.status)">Xác nhận</div>
                        </div>
                    </div>
                </div>
              </div>
             </div>
          </li>
        </div>
        <div v-else class="navbar-nav ">
          <li class="nav-item">
            <router-link to="/employer" class="nav-link">
              Công ty
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/user/login" class="nav-link">
              Đăng nhập
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link main-btn" href @click.prevent="becomeEmployer">
              <div >Nhà tuyển dụng</div>
              <span>Đăng tuyển và tìm hồ sơ</span>
            </a>
          </li>
        </div>
      </div>
    </nav>
    <router-view />
    
  </div>
</template>

<script>
import EmployerService from '@/services/employer.service';
import PostService from '@/services/PostService';
import JobkerService from '@/services/auth.service';
export default {
  data(){
    return{
      message:'',
      employer:'',
      jobker:'',
      posts:'',
      notify:0,
      notifyPost:[],
      notifyAplly:[],
      employerId:'',
      jobkerID:''
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    currentEmployer() {
      return this.$store.state.employ.user;
    },
    admin(){
      if(this.$route.name == 'adminLogin' ||  this.$route.name == 'admin')
        {
          return true;
        }else{
          return false;
        }
    }
  },
  methods: {
    async logOut() {
      this.$store.dispatch('auth/logout');
      this.$store.dispatch('employ/logout');
      this.$router.push('/user/login');
    },
    becomeEmployer(){
      this.$store.dispatch('auth/logout');
      this.$router.push('/employer/login');
    },
    async viewNotifyPost(id,status){
      await PostService.watchedNotify(id,status);
      PostService.getPostByEmployer(this.employerId).then(
            (responseData) => {
              this.posts = responseData.data
              this.notifyPost = this.posts.filter(post => post.status.notify == 1);
              this.notify = this.notifyPost.length
            }
      );
      this.$router.push(`/job/${id}`);
     
    },
    async viewNotifyApply(username,id){
      await JobkerService.watchNotifyApply(username,id);
      JobkerService.getInfo(this.currentUser.username).then(
        (responseData) => {    
          this.jobker = responseData.data;
          this.notifyAplly = this.jobker.jobs.filter(element => element.notify == 1)
          this.notify = this.notifyAplly.length;
          this.$router.push(`/job/${id}`);
        },
        (error) => {
          this.message =
          (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        });
    },
    async watchedNotifyPost(id,status){
      await PostService.watchedNotify(id,status);
      PostService.getPostByEmployer(this.employerId).then(
            (responseData) => {
              this.posts = responseData.data
              this.notifyPost = this.posts.filter(post => post.status.notify == 1);
              this.notify = this.notifyPost.length
            }
      );
    },
    async watchedNotifyApply(username,id){
      await JobkerService.watchNotifyApply(username,id);
      JobkerService.getInfo(this.currentUser.username).then(
        (responseData) => {    
          this.jobker = responseData.data;
          this.notifyAplly = this.jobker.jobs.filter(element => element.notify == 1)
          this.notify = this.notifyAplly.length;
        },
        (error) => {
          this.message =
          (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        });
    }
  },
  async created(){
      if(this.currentEmployer){
        EmployerService.getInfo(this.currentEmployer.username).then(
        (responseData) => {    
          this.employer = responseData.data;
          return responseData.data.id
        },
        (error) => {
          this.message =
          (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        })
        .then((Id) => {
          this.employerId = Id
          PostService.getPostByEmployer(this.employerId).then(
              (responseData) => {
                this.posts = responseData.data
                this.notifyPost = this.posts.filter(post => post.status.notify == 1);
                this.notify = this.notifyPost.length
              }
          );
        });
      }
      if(this.currentUser){
        JobkerService.getInfo(this.currentUser.username).then(
        (responseData) => {    
          this.jobker = responseData.data;
          this.notifyAplly = this.jobker.jobs.filter(element => element.notify == 1)
          this.notify = this.notifyAplly.length
        },
        (error) => {
          this.message =
          (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        });
      }
      
      
  }
};
</script>

<style lang="scss" >
  .navbar{
    background-color:#f6fbf9 !important;
    .navbar-nav{
      .nav-item{
        .user{
          &::after{
            vertical-align: .1em!important;
          }
        }

        .nav-link{
          color: black;
          font-size: 1rem;
        }
        .main-btn{
          background-color: #00b14f;
          color: #f6fbf9;
          text-align: center;
          font-size: 1rem;
          border-radius: 2.5rem;
          padding:0.5rem 1rem ;
          div{
            font-weight: 700;
          }
        }
        .home{
          font-size: 1.2rem;
          color: #00b14f;
        }
        .btn{
          font-size: 1.25rem;
          line-height: 2em;
        }
      }
      .notification{
        position: relative;
        i{
          color: black;
          &:hover{
            color: #00b14f;
          }
        }
        .noti-btn{
          &::after{
            display: none!important;
          }
        }
        .dropdown-menu{
          min-width: 15rem;
          max-height: 50vh;
          overflow-y: auto;
          right: 0;
          left:auto;
        }
        .notify-wrap{
          margin: 0 10px;
          font-size: 0.875rem;
          width: 16rem;
         
        }
        
        .notify-item-wrap{
           position: relative;
           padding-bottom:14px;
           border-bottom: 1px solid rgb(212, 210, 210) ;
        }
        .watched{
          position: absolute;
          right: 0;
          bottom: 0;
          color:#00b14f
        }
        .notify-item{
          padding: 6px 0;
          overflow: hidden; 
          max-height: 72px;
          span{
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            display: -webkit-box;
          }
          strong{
            cursor: pointer;
          }
         
        }
        .notify-number{
          position: absolute;
          padding: 2px 6px;
          background-color: #00b14f;
          color: white;
          border-radius: 50% ;
          top:0px;
          right: 8px;
        }
      }
    }
  }
  .nav-item{
    align-self: center;
  }  .input-setup {
    border: none;
    border-radius: 2px;
  }

  .show-placeholder {
    &::placeholder {
      color: #333333 !important;
    }
  }

  .bc-none {
    background-color: transparent;
  }

  .box-white {
    background-color: #fff;
  }
  .box {
    padding: 20px;
    margin-bottom: 20px;
    &-title{
      border-bottom: 1px solid #e6e6e6;
      padding-bottom: 10px;
      font-size: 16px;
      text-align: center;
      margin-top: -5px;
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

  .add-button {
    width: 56px;
    height: 56px;
    margin: 10px auto 0 auto;
    overflow: visible;
    text-align: center;
    line-height: 56px;
    font-size: 28px;
    color: rgba(255,255,255,1);
    background-color: #00b14f;
    border-radius: 50%;
    &::before{
      position: relative;
      z-index: 100;
      content:"+";
    }
  }

  .fb-icon{
    color: #337ab7;
  }

  .tw-icon{
    color: #5bc0de;
  }

  .gg-icon{
    color: #d9534f;
  }

  .bold{
    font-weight: 700;
  }
  .text-highlight {
    color: #00b14f;
  }
  .text-dark-gray {
    color: #666;
  }
  i{
    color: #00b14f;
    margin: 0 5px;
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
