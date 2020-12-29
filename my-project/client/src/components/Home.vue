<template>
 <div class="home">
    
     <search-job-panel></search-job-panel>  
   

    <div class="container">
      <div class="creatCV">
        <div class="creatCV-title "><strong>Tạo CV</strong> chuyển nghiệp, nhận ngay việc làm ưng ý</div>
        <div class="creatCV-btn ">
          <button class="btn button-primary">TẠO CV NGAY</button>
        </div>
      </div>
    </div>
    <div class="bestJobs">
      <div class="container">
        <div class="box box-white">
          <div class="box-header ">
            <h4 > <i class="fas fa-star"></i> TIN TUYỂN DỤNG, VIỆC LÀM TỐT NHẤT</h4>
            <div class="viewall"> <a href="">» Xem tất cả</a></div>
          </div>
          <div class="box-main">
            <div class="row">
              <div
                  class="col-lg-6  "
                  v-for="(post, index) in posts"
                  :key="index"
              >
                  <div class="job-wrap">
                    <div class="row ">

                      <div class="col-xs-4">
                        <a href="#">
                          <img :src="`${post.avatar}`" alt="">
                        </a> 
                      </div>
                      <div class="col-xs-8">
                        <div class="jobInfo-wrap">
                          <div class="title job-title"><a :href="`/job/${post._id}`"><strong>{{post.title}} </strong></a></div>
                          <div class="title company-name"><a :href="`/employer/${post.employerName}`">{{post.companyName}}</a></div>
                          <div class="job-info">
                            <div class="d-flex">
                              <div class="salary" title>
                                <i class="fas fa-dollar-sign"></i>
                                {{post.salary}}
                              </div>
                              <div class="formOfWork" title>
                               <i class="fas fa-briefcase"></i>
                                {{post.formOfWork}}
                              </div>
                            </div>
                            <div class="address title">
                              <i class="fas fa-map-marker-alt"></i> {{post.address}}
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
      </div>
    </div>
 </div>
</template>

<script>
import SearchJobPanel from './SearchJobPanel';
import PostService from '@/services/PostService';
export default {
  name: 'Home',
  data() {
    return {
      content: '',
      posts:''
    };
  },
  mounted() {
  },
  components: {
    SearchJobPanel,
  },
  async created() {
    this.posts = await PostService.getPosts();
  }
};
</script>

<style lang="scss" scoped>
  .bestJobs{
    background-color:#f6fbf9 ;
    font-size:14px ;
    .box{
      padding: 0;
    }
    .box-header{
      background-color: #00b14f;
      display: flex;
      justify-content: space-between;
      color:white;
      font-size: 17px;
      padding: 15px;
      i{
        color: #f8d309;
      }
      .viewall{
        a{
          font-size: 18px;
          line-height: 32px;
          color: white;
        }
      }
    }
    .box-main{
      padding: 0 12px;
      .job-wrap{
        padding: 5px 18px;
        border: 1px solid rgb(214, 209, 209);
      }
      .jobInfo-wrap{
        margin:10px 0px 10px 8px;
      }
      .title{
        @media only screen and (max-width: 1439px) {
          width: 264px;
        }
        @media only screen and (max-width: 769px) {
          width: 440px;
        }
        @media only screen and (max-width: 767px) {
          width: 200px;
        }
        margin-bottom: 5px ;
        width: 360px; /* the element needs a fixed width (in px, em, %, etc) */
        overflow: hidden; /* make sure it hides the content that overflows */
        white-space: nowrap; /* don't break the line */
        text-overflow: ellipsis; /* give the beautiful '...' effect */
      }
      .job-title{
        a{
          color: black;
          &:hover{
            text-decoration: none;
          }
        }
      }
      .job-info{
        margin-top:12px ;
      }
      .formOfWork,.salary{
        flex: 1;
      }
      .company-name{

      }
    }
  }
  .creatCV{
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
  
</style>