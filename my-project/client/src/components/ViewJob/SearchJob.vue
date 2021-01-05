<template>
  <div class="afterSearch">
    <search-job-panel></search-job-panel>
    <div class="afterSearch-main">
      <div class="container">
        <div class="box box-white">
          <div class="row">
            <div class="col-md-8 col-sm-7 keyword-search">
              <span class="bold">Tìm kiếm</span>
              <span class="text-highlight bold">
                {{$route.query.keyword}}
              </span>
            </div>
            <div class="col-md-4 col-sm-5 suggest-job-count">
              JOBS gợi ý 
              <span class="text-highlight bold">{{jobs.length}}  </span>việc làm phù hợp</div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
             <div class="box box-white">
                <div
                    class="result-search-companies"
                    v-for="(job, index) in paginate"
                    :key="index"
                >
                  <div class="row result-search-job ">
                    <div class="col-sm-3 hidden-xs ">
                      <a :href="`/job/${job._id}`" class="result-search-job-logo">
                        <img :src="`${job.avatar}`" alt="avatar">
                      </a>
                    </div>
                    <div class="col-sm-9 col-xs-12 col-result-search-job-info">
                         <div class="jobInfo-wrap">
                          <div class="title job-title"><a :href="`/job/${job._id}`"><strong>{{job.title}} </strong></a></div>
                          <div class="title company-name"><a :href="`/employer/${job.employerName}`">{{job.companyName}}</a></div>
                          <div class="job-info">
                            <div class="d-flex">
                              <div class="salary" >
                                <i class="fas fa-dollar-sign"></i>
                                {{job.salary}}
                              </div>
                              <div class="formOfWork" >
                               <i class="fas fa-briefcase"></i>
                                {{job.formOfWork}}
                              </div>
                            </div>
                              <div class="d-flex">
                                <div class="salary" >
                                  <i class="fas fa-tag"></i>
                                  {{job.career}}
                                </div>
                                <div class="formOfWork" >
                                <i class="fa fa-transgender"></i>
                                  {{job.sex}}
                                </div>
                              </div>
                                <div class="d-flex">
                              <div class="salary" >
                                <i class="fa fa-users"></i>
                                {{job.numberOfPeople}}
                              </div>
                              <div class="formOfWork" >
                                 <i class="fas fa-map-marker-alt"></i> {{job.address}}
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                  </div>
                  <hr style="width: 95%; margin: 10px auto;">
                </div>
                <div class="pagination">
                  <ul>
                    <li v-for="pageNumber in totalPages" v-bind:key="pageNumber" >
                      <a 
                        href="#" 
                        @click="setPage(pageNumber)" 
                        :class="{current: currentPage === pageNumber, last: (pageNumber == totalPages && Math.abs(pageNumber - currentPage) > 3), first:(pageNumber == 1 && Math.abs(pageNumber - currentPage) > 3)}">{{ pageNumber }}
                      </a>
                    </li>
                  </ul> 
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>  
import SearchJobPanel from '../SearchJobPanel.vue';
import PostService from '@/services/PostService'; 
export default {
  name: 'afterSearchJon',
  data() {
    return {
      editStatus: true,
      jobs: [],
      currentPage: 1,
      itemsPerPage: 10,
      resultCount: 0,
    };
  },
  computed: {
      totalPages: function() {
        return Math.ceil(this.resultCount / this.itemsPerPage)
      },
      paginate: function() {
          if (!this.jobs || this.jobs.length != this.jobs.length) {
              return
          }
          var index = this.currentPage * this.itemsPerPage - this.itemsPerPage
          return this.jobs.slice(index, index + this.itemsPerPage)
      }
  },
  watch: {
    paginate: {
      deep: true,
      handler: function () {
        if (!this.jobs || this.jobs.length != this.jobs.length) {
              return
        }else{
            this.resultCount = this.jobs.length
            if (this.currentPage >= this.totalPages) {
              this.currentPage = this.totalPages
            } 
        }
      }
    },
    $route: async function(){
      let respondata = (await PostService.index(this.$route.query)).data;
      this.jobs = this.getUniqueListBy(respondata[0].concat(respondata[1]),'_id'); 
      this.jobs = this.jobs.filter(post => post.status.status == 1);
    }
   
  },
  methods: {
      setPage: function(pageNumber) {
        this.currentPage = pageNumber
      },
      getUniqueListBy(arr, key) {
          return [...new Map(arr.map(item => [item[key], item])).values()]
      }
  },
  components: {
    SearchJobPanel,
  },
  async created(){
     let respondata = (await PostService.index(this.$route.query)).data;
     this.jobs = this.getUniqueListBy(respondata[0].concat(respondata[1]),'_id');
     this.jobs = this.jobs.filter(post => post.status.status == 1);
     
  }
};
</script>


<style lang="scss" scoped>

.afterSearch-main{
  min-height: 76vh;
  background-color: #f6fbf9;
  .result-search-companies{
    .result-search-job{
      img{
        width: 100%;
      }
      
    }
  }
  .title{
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
  .pagination{
    display: flex;
    ul{
      margin: auto;
      list-style-type: none;
      li{
        display: inline;
        a {
          text-align: center;
          text-decoration: none;
          padding: 5px 8px 5px 8px;
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
}

.d-flex{
  margin-bottom:8px ;
}

.jobInfo-wrap{
    margin:10px 0px 0px 8px;
}

.col-sm-9, .col-xs-12{

}




</style>