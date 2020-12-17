<template>
  <div id="app">
    <nav class="navbar navbar-expand ">
      <div class="container">
        <div class="navbar-nav ">
          <li class="nav-item">
            <router-link to="/home" class="nav-link home">
              <font-awesome-icon icon="home" />JOBS
            </router-link>
          </li>
          <!-- <li v-if="showAdminBoard " class="nav-item">
            <router-link to="/admin" class="nav-link">Admin Board</router-link>
          </li>-->
          <li v-if="currentEmployer" class="nav-item">
            <router-link to="/employer" class="nav-link"
              >Đăng tuyển</router-link
            >
          </li>
          <li class="nav-item">
            <router-link v-if="currentUser" to="/user" class="nav-link"
              >Tìm kiếm việc làm</router-link
            >
          </li>
        </div>

        <div v-if="currentUser" class="navbar-nav">
          <li class="nav-item">
            <router-link to="/user/profile" class="nav-link">
              <font-awesome-icon icon="user" />
              {{ currentUser.username }}
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href @click.prevent="logOut">
             LogOut
            </a>
          </li>
        </div>
        <div v-else-if="currentEmployer" class="navbar-nav ">
          <li class="nav-item">
            <div class="dropdown show">
              <a class="btn  dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
               {{ currentEmployer.username }}
              </a>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <router-link :to="{ name: 'employerProfile', params: {employerName: currentEmployer.username } }" class="nav-link">
                   Profile
                </router-link>              
                <a class="nav-link" href @click.prevent="logOut">
                  Đăng xuất
                </a>
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
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    currentEmployer() {
      return this.$store.state.employ.user;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$store.dispatch('employ/logout');
      this.$router.push('/user/login');
    },
    becomeEmployer(){
      this.$store.dispatch('auth/logout');
      this.$router.push('/employer/login');
    }
  },
};
</script>

<style lang="scss" >
  .navbar{
    background-color:#f6fbf9 !important;
    .navbar-nav{
      .nav-item{
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
