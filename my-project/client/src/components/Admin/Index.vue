<template>
    <body class="sb-nav-fixed admin-board">
        <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <a class="navbar-brand" href="index.html">JOBS</a>
            <button class="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" href="#"><i class="fas fa-bars"></i></button>
            <!-- Navbar Search-->
            <!-- Navbar-->
            <ul class="navbar-nav ml-auto ">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" id="userDropdown" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                        <a class="dropdown-item" href="#">Cài đặt</a>
                        <div class="dropdown-divider"></div>
                        <div class="dropdown-item" @click="logout">Đăng xuất</div>
                    </div>
                </li>
            </ul>
        </nav>
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div class="sb-sidenav-menu">
                        <div class="nav">
                            <div class="sb-sidenav-menu-heading">Core</div>
                            <a class="nav-link" href="index.html">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                Đăng tuyển
                            </a>
                            <div class="sb-sidenav-menu-heading">Interface</div>
                            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                                Người tìm việc
                                <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                            </a>
                            <div class="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                                <nav class="sb-sidenav-menu-nested nav">
                                    <a class="nav-link" href="layout-static.html">Static Navigation</a>
                                    <a class="nav-link" href="layout-sidenav-light.html">Light Sidenav</a>
                                </nav>
                            </div>
                            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                                <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
                                Nhà tuyển dụng
                                <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                            </a>
                            <div class="collapse" id="collapsePages" aria-labelledby="headingTwo" data-parent="#sidenavAccordion">
                                <nav class="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                                    <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#pagesCollapseAuth" aria-expanded="false" aria-controls="pagesCollapseAuth">
                                        Authentication
                                        <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                                    </a>
                                    <div class="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne" data-parent="#sidenavAccordionPages">
                                        <nav class="sb-sidenav-menu-nested nav">
                                            <a class="nav-link" href="login.html">Login</a>
                                            <a class="nav-link" href="register.html">Register</a>
                                            <a class="nav-link" href="password.html">Forgot Password</a>
                                        </nav>
                                    </div>
                                    <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#pagesCollapseError" aria-expanded="false" aria-controls="pagesCollapseError">
                                        Error
                                        <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                                    </a>
                                    <div class="collapse" id="pagesCollapseError" aria-labelledby="headingOne" data-parent="#sidenavAccordionPages">
                                        <nav class="sb-sidenav-menu-nested nav">
                                            <a class="nav-link" href="401.html">401 Page</a>
                                            <a class="nav-link" href="404.html">404 Page</a>
                                            <a class="nav-link" href="500.html">500 Page</a>
                                        </nav>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div class="sb-sidenav-footer">
                        <div class="small">Logged in as:</div>
                        Start Bootstrap
                    </div>
                </nav>
            </div>
            <div id="layoutSidenav_content">
                <main>
                    <div class="container-fluid">
                        <h1 class="mt-4"> Đăng tuyển</h1>
                        <ol class="breadcrumb mb-4">
                            <li class="breadcrumb-item active"> Đăng tuyển</li>
                        </ol>
                        <div class="row">
                            <div class="col-xl-3 col-md-6" @click="viewAllPosts">
                                <div class="card bg-primary text-white mb-4">
                                    <div class="card-body">Tất cả</div>
                               
                                </div>
                            </div>
                            <div class="col-xl-3 col-md-6" @click="viewWaitPosts"> 
                                <div class="card bg-warning text-white mb-4">
                                    <div class="card-body">Chưa kiểm duyệt</div>
                                   
                                </div>
                            </div>
                            <div class="col-xl-3 col-md-6" @click="viewAccessPosts">
                                <div class="card bg-success text-white mb-4">
                                    <div class="card-body">Đã kiểm duyệt</div>
                                  
                                </div>
                            </div>
                            <div class="col-xl-3 col-md-6" @click="viewDeletePosts">
                                <div class="card bg-danger text-white mb-4">
                                    <div class="card-body">Đã xóa</div>
                                 
                                </div>
                            </div>
                        </div>
                        <div class="card mb-4">
                            <div class="card-header">
                                Số lượng bài đăng tuyển : {{viewPosts.length}}
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Tiêu đề</th>
                                                <th>Nhà tuyển dụng</th>
                                                <th>Trạng thái</th>
                                                <th>Thời gian tạo</th>
                                                <th>Số lượng người</th>
                                                <th>Xem</th>
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
                                                <td>{{post._id}}</td>
                                                <td>{{post.title}}</td>
                                                <td>{{post.companyName}}</td>
                                                <td class="drop">
                                                    <div class="nav-link dropdown-toggle" id="userDropdown" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        <div v-if="post.status.status == 0"> Chờ kiểm duyệt <i class="fas fa-spinner" style="color:#ffc107"></i></div>
                                                        <div v-if="post.status.status == 1"> Đã kiểm duyệt <i class="fas fa-check" style="color:#28a745"></i></div>
                                                        <div v-if="post.status.status == 2"> Đã xóa <i class="fas fa-trash-alt" style="color:#dc3545"></i></div>
                                                    </div>
                                                    <div class="dropdown-menu  dropdown-menu-left" aria-labelledby="userDropdown">
                                                        <div v-if="post.status.status == 0">
                                                            <div class="dropdown-item" @click="accessPost(post._id)">Xác nhận <i class="fas fa-check" style="color:#28a745"></i></div>
                                                            <div class="dropdown-divider"></div>
                                                            <div class="dropdown-item" @click="removePost(post._id)">Xóa <i class="fas fa-trash-alt" style="color:#dc3545"></i></div>
                                                        </div>
                                                        <div v-if="post.status.status == 1">
                                                            <div class="dropdown-item" @click="removePost(post._id)">Xóa <i class="fas fa-trash-alt" style="color:#dc3545"></i></div>
                                                        </div>
                                                        <div v-if="post.status.status == 2">
                                                            <div class="dropdown-item" @click="restorePost(post._id)">Khôi phục  <i class="fas fa-redo-alt" style="color:#007bff"></i></div>
                                                            
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{{post.updatedAt}}</td>
                                                <td>{{post.jobkers.length}}</td>
                                                <td>    
                                                    <a :href="`/job/${post._id}`">
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
                <footer class="py-4 bg-light mt-auto">
                    <div class="container-fluid">
                        <div class="d-flex align-items-center justify-content-between small">
                            <div class="text-muted">Copyright &copy; Your Website 2020</div>
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
import PostService from '@/services/PostService';
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
        this.viewPosts = this.posts;
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
    async removePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    },
    async accessPost(id) {
      await PostService.accessPost(id);
      this.posts = await PostService.getPosts();
    },
    async restorePost(id) {
      await PostService.restorePost(id);
      this.posts = await PostService.getPosts();
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
        const admin = JSON.parse(sessionStorage.getItem('admin'));
        if(!admin){
            this.$router.push('/admin/login');
        }
        this.posts = await PostService.getPosts();
        this.viewPosts = this.posts
        this.waitPosts = this.posts.filter(post => post.status.status == 0);
        this.accessPosts = this.posts.filter(post => post.status.status == 1);
        this.deletePosts = this.posts.filter(post => post.status.status == 2);
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
            this.viewPosts = this.posts
            this.waitPosts = this.posts.filter(post => post.status.status == 0);
            this.accessPosts = this.posts.filter(post => post.status.status == 1);
            this.deletePosts = this.posts.filter(post => post.status.status == 2);
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