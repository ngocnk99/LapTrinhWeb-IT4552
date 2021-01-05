<template>
    <body class="sb-nav-fixed admin-board sb-sidenav-toggled" style="background-color: #f0f0f0 ;">
      <div class="container">
        <div id="layoutSidenav">
            <div id="layoutSidenav_content">
                <main>
                    <div >
                        <h1 class="mt-4"> Quản lí ứng tuyển</h1>
                        <div class="row">
                            <div class="col-xl-3 col-md-6" @click="viewAllPosts">
                                <div class="card bg-primary text-white mb-4">
                                    <div class="card-body">Tất cả</div>
                               
                                </div>
                            </div>
                            <div class="col-xl-3 col-md-6" @click="viewWaitPosts"> 
                                <div class="card bg-warning text-white mb-4">
                                    <div class="card-body">Chờ xét duyệt</div>
                                   
                                </div>
                            </div>
                            <div class="col-xl-3 col-md-6" @click="viewAccessPosts">
                                <div class="card bg-success text-white mb-4">
                                    <div class="card-body">Đã thông qua</div>
                                  
                                </div>
                            </div>
                            <div class="col-xl-3 col-md-6" @click="viewDeletePosts">
                                <div class="card bg-danger text-white mb-4">
                                    <div class="card-body">Đã từ chối</div>
                                 
                                </div>
                            </div>
                        </div>
                        <div class="card mb-4">
                            <div class="card-header">
                                Số lượng công việc ứng tuyển : {{viewPosts.length}}
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th>Người ứng tuyển </th>
                                                <th>Tiêu đề bài tuyển dụng</th>
                                                <th>Trạng thái</th>
                                                <th>Xem thông tin</th>
                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr class="">
                                                <div class="pagination ">
                                                    <ul class=" ">
                                                        <li v-for="pageNumber in totalPages" v-bind:key="pageNumber" >
                                                        <a 
                                                            href="#" 
                                                            @click="setPage(pageNumber)" 
                                                            :class="{current: currentPage === pageNumber, last: (pageNumber == totalPages && Math.abs(pageNumber - currentPage) > 3), first:(pageNumber == 1 && Math.abs(pageNumber - currentPage) > 3)}">{{ pageNumber }}
                                                        </a>
                                                        </li>
                                                    </ul> 
                                                </div>
                                            </tr>
                                        </tfoot>
                                        <tbody v-if="viewPosts.leng!=0">
                                            <tr 
                                                v-for="(post, index) in paginate"
                                                :item="post"
                                                :index="index"
                                                :key="post._id"
                                            >
                                                <td>{{post.username}}</td>
                                                <td>{{post.title}}</td>
                                                <td class="drop">
                                                    <div class="nav-link dropdown-toggle" id="userDropdown" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        <div v-if="post.status == 0">
                                                           Chờ xét duyệt <i class="fas fa-spinner" style="color:#ffc107"></i>
                                                        </div>
                                                        <div v-if="post.status == 1"> Đã thông qua <i class="fas fa-check" style="color:#28a745"></i></div>
                                                        <div v-if="post.status == 2"> Đã bị từ chối <i class="fas fa-trash-alt" style="color:#dc3545"></i></div>
                                                        <div class="dropdown-menu  dropdown-menu-left" aria-labelledby="userDropdown" v-if="post.status == 0"> 
                                                            <div >
                                                                <div class="dropdown-item" @click="accesApply(post.username,post.id)">Xác nhận <i class="fas fa-check" style="color:#28a745"></i></div>
                                                                <div class="dropdown-divider"></div>
                                                                <div class="dropdown-item" @click="refuseApply(post.username,post.id)">Từ chối <i class="fas fa-trash-alt" style="color:#dc3545"></i></div>
                                                            </div>
                                                        </div>                                                        
                                                    </div>
                                                </td>
                                                <td>    
                                                    <a :href="`/user/${post.username}`">
                                                        <i class="fas fa-search" style="color:#28a745"></i>
                                                    </a> 
                                                </td>
                                                
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
      </div>
    </body>
</template>

<script>
import PostService from '@/services/PostService';
import userService from '@/services/auth.service';
import $ from 'jquery'
export default {
  name: 'Login',
  data() {
    return {
        username: '',
        password: '',
        loading: false,
        message: '',
        posts:[],
        storePosts:[],
        viewPosts:[],
        accessPosts:[],
        deletePosts:[],
        waitPosts:[],
        currentPage: 1,
        itemsPerPage: 10,
        resultCount: 0,
    };
  },

  methods: {
    logout(){
    sessionStorage.removeItem('admin');
    this.$router.push('/admin/login');
    },
    setPage: function(pageNumber) {
    this.currentPage = pageNumber
    },
    viewAllPosts(){
        this.viewPosts = this.storePosts;
        this.currentPage = 1;
    },
    viewDeletePosts(){
        this.viewPosts = this.deletePosts;
        this.currentPage = 1;
    },
    viewAccessPosts(){
        this.viewPosts = this.accessPosts;
        this.currentPage = 1;
    },
    viewWaitPosts(){
        this.viewPosts = this.waitPosts;
        this.currentPage = 1;
    },
    async refuseApply(username,id) {
       await PostService.refuseApply(username,id);
      await userService.refuseApply(username,id)
      PostService.getPostByEmployer(this.$store.state.employ.user.id).then(
            (responseData) => {
              this.posts = responseData.data
            }
          );
    },
    async accesApply(username,id) {
      await PostService.accesApply(username,id);
       await userService.accesApply(username,id);
      PostService.getPostByEmployer(this.$store.state.employ.user.id).then(
          (responseData) => {
            this.posts = responseData.data
          }
        );
    },
  },
  mounted () {
        // Add active state to sidbar nav links
        var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
        $("#layoutSidenav_nav .sb-sidenav a.nav-link").each(function() {
            if (this.href === path) {
                $(this).addClass("active");
            }
        });
        // Toggle the side navigation
        $("#sidebarToggle").on("click", function(e) {
            e.preventDefault();
            $("body").toggleClass("sb-sidenav-toggled");
        });
  },
  computed: {
        totalPages: function() {
            return Math.ceil(this.resultCount / this.itemsPerPage)
        },
        paginate: function() {
            if (!this.viewPosts || this.viewPosts.length != this.viewPosts.length) {
                return
            }
            var index = this.currentPage * this.itemsPerPage - this.itemsPerPage
            return this.viewPosts.slice(index, index + this.itemsPerPage)
        }
    },
  async created(){
        if(!this.$store.state.employ.user){
            this.$router.push('/employer /login');
        }
        PostService.getPostByEmployer(this.$store.state.employ.user.id).then(
          (responseData) => {
            this.posts = responseData.data
          }
        );
    },
  watch: {
    paginate: {
      deep: true,
      handler: function () {
        if (!this.viewPosts || this.viewPosts.length != this.viewPosts.length) {
              return
        }else{
            this.resultCount = this.viewPosts.length
            if (this.currentPage >= this.totalPages) {
              this.currentPage = this.totalPages
            } 
        }
      }
    },
    posts:{
        deep: true,
        handler: function () {
            if(this.posts.length != 0){
              this.storePosts = [];
              this.viewPosts = [];
              this.posts.forEach(element => {
                if(element.jobkers) {
                  element.jobkers.forEach(item =>{
                    this.storePosts.push({
                      title: element.title, 
                      id: element._id,
                      status: item.status,
                      username: item.username,
                    })
                  })
                }
              });

              this.viewPosts = this.storePosts;
              this.waitPosts = this.storePosts.filter(item =>item.status == 0);
              this.accessPosts = this.storePosts.filter(item =>item.status == 1);
              this.deletePosts = this.storePosts.filter(item =>item.status == 2);
            }
        }
    }
  },
};
</script>

<style lang="scss" scoped>
.admin-board{
    i{
        color: white;
    }
}
#layoutSidenav {
  display: flex;
}
.button-primary{
    background-color: #00b14f;
    color: white;
}
#layoutSidenav #layoutSidenav_nav {
  flex-basis: 225px;
  flex-shrink: 0;
  transition: transform 0.15s ease-in-out;
  z-index: 1038;
  transform: translateX(-225px);
}
#layoutSidenav #layoutSidenav_content {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
  flex-grow: 1;
  min-height: calc(100vh - 56px);
  margin-left: -225px;
}

.sb-sidenav-toggled #layoutSidenav #layoutSidenav_nav {
  transform: translateX(0);
}
.sb-sidenav-toggled #layoutSidenav #layoutSidenav_content:before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  z-index: 1037;
  opacity: 0.5;
  transition: opacity 0.3s ease-in-out;
}

@media (min-width: 992px) {
  #layoutSidenav #layoutSidenav_nav {
    transform: translateX(0);
  }
  #layoutSidenav #layoutSidenav_content {
    margin-left: 0;
    transition: margin 0.15s ease-in-out;
  }

  .sb-sidenav-toggled #layoutSidenav #layoutSidenav_nav {
    transform: translateX(-225px);
  }
  .sb-sidenav-toggled #layoutSidenav #layoutSidenav_content {
    margin-left: -225px;
  }
  .sb-sidenav-toggled #layoutSidenav #layoutSidenav_content:before {
    display: none;
  }
}
.sb-nav-fixed .sb-topnav {
  z-index: 1039;
}
.sb-nav-fixed #layoutSidenav #layoutSidenav_nav {
  width: 225px;
  height: 100vh;
  z-index: 1038;
}
.sb-nav-fixed #layoutSidenav #layoutSidenav_nav .sb-sidenav {
  padding-top: 56px;
}
.sb-nav-fixed #layoutSidenav #layoutSidenav_nav .sb-sidenav .sb-sidenav-menu {
  overflow-y: auto;
}
.sb-nav-fixed #layoutSidenav #layoutSidenav_content {
  padding-left: 225px;
  top: 56px;
}

#layoutError {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
#layoutError #layoutError_content {
  min-width: 0;
  flex-grow: 1;
}
#layoutError #layoutError_footer {
  min-width: 0;
}

.img-error {
  max-width: 20rem;
}

.nav .nav-link .sb-nav-link-icon,
.sb-sidenav-menu .nav-link .sb-nav-link-icon {
  margin-right: 0.5rem;
}

.sb-topnav {
  padding-left: 0;
  height: 56px;
  z-index: 1039;
}
.sb-topnav .navbar-brand {
  width: 225px;
  padding-left: 1rem;
  padding-right: 1rem;
  margin: 0;
}
.sb-topnav.navbar-dark #sidebarToggle {
  color: rgba(255, 255, 255, 0.5);
}
.sb-topnav.navbar-light #sidebarToggle {
  color: #212529;
}

.sb-sidenav {
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-wrap: nowrap;
}
.sb-sidenav .sb-sidenav-menu {
  flex-grow: 1;
}
.sb-sidenav .sb-sidenav-menu .nav {
  flex-direction: column;
  flex-wrap: nowrap;
}
.sb-sidenav .sb-sidenav-menu .nav .sb-sidenav-menu-heading {
  padding: 1.75rem 1rem 0.75rem;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
}
.sb-sidenav .sb-sidenav-menu .nav .nav-link {
  display: flex;
  align-items: center;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  position: relative;
}
.sb-sidenav .sb-sidenav-menu .nav .nav-link .sb-nav-link-icon {
  font-size: 0.9rem;
}
.sb-sidenav .sb-sidenav-menu .nav .nav-link .sb-sidenav-collapse-arrow {
  display: inline-block;
  margin-left: auto;
  transition: transform 0.15s ease;
}
.sb-sidenav .sb-sidenav-menu .nav .nav-link.collapsed .sb-sidenav-collapse-arrow {
  transform: rotate(-90deg);
}
.sb-sidenav .sb-sidenav-menu .nav .sb-sidenav-menu-nested {
  margin-left: 1.5rem;
  flex-direction: column;
}
.sb-sidenav .sb-sidenav-footer {
  padding: 0.75rem;
  flex-shrink: 0;
}

.sb-sidenav-dark {
  background-color: #212529;
  color: rgba(255, 255, 255, 0.5);
}
.sb-sidenav-dark .sb-sidenav-menu .sb-sidenav-menu-heading {
  color: rgba(255, 255, 255, 0.25);
}
.sb-sidenav-dark .sb-sidenav-menu .nav-link {
  color: rgba(255, 255, 255, 0.5);
}
.sb-sidenav-dark .sb-sidenav-menu .nav-link .sb-nav-link-icon {
  color: rgba(255, 255, 255, 0.25);
}
.sb-sidenav-dark .sb-sidenav-menu .nav-link .sb-sidenav-collapse-arrow {
  color: rgba(255, 255, 255, 0.25);
}
.sb-sidenav-dark .sb-sidenav-menu .nav-link:hover {
  color: #fff;
}
.sb-sidenav-dark .sb-sidenav-menu .nav-link.active {
  color: #fff;
}
.sb-sidenav-dark .sb-sidenav-menu .nav-link.active .sb-nav-link-icon {
  color: #fff;
}
.sb-sidenav-dark .sb-sidenav-footer {
  background-color: #343a40;
}

.sb-sidenav-light {
  background-color: #f8f9fa;
  color: #212529;
}
.sb-sidenav-light .sb-sidenav-menu .sb-sidenav-menu-heading {
  color: #adb5bd;
}
.sb-sidenav-light .sb-sidenav-menu .nav-link {
  color: #212529;
}
.sb-sidenav-light .sb-sidenav-menu .nav-link .sb-nav-link-icon {
  color: #adb5bd;
}
.sb-sidenav-light .sb-sidenav-menu .nav-link .sb-sidenav-collapse-arrow {
  color: #adb5bd;
}
.sb-sidenav-light .sb-sidenav-menu .nav-link:hover {
  color: #007bff;
}
.sb-sidenav-light .sb-sidenav-menu .nav-link.active {
  color: #007bff;
}
.sb-sidenav-light .sb-sidenav-menu .nav-link.active .sb-nav-link-icon {
  color: #007bff;
}
.sb-sidenav-light .sb-sidenav-footer {
  background-color: #e9ecef;
}
.fixed-top, .sb-nav-fixed #layoutSidenav #layoutSidenav_nav, .sb-nav-fixed .sb-topnav {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
//   z-index: 1030;
}
.table{
    .dropdown-toggle::after{
        display: none;
    }
    .dropdown-menu{
        top:-10px!important;
    }
    .drop{}
}
.pagination{
    display: flex;
    ul{
      margin-top: 10px;
      list-style-type: none;
      li{
        display: inline;
        a {
          text-align: center;
          text-decoration: none;
          padding: 5px 5px 5px 8px;
          margin: 0 5px;
          color: #999;
          &:hover{
            background-color: rgb(185, 174, 174);
          }
          .first::after {
            content:'...'
          }
          .last::before {
            content:'...'
          }
        }
        .current {
          color: white;
          background-color: #00b14f;
        }
      }
    }
    
}
</style>