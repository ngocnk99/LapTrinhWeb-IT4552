<template>
  <div class="afterSearch">
    <employer-search-panel></employer-search-panel>
    <div class="afterSearch-main">
      <div class="container">
        <div class="box box-white">
          <div class="row">
            <div class="col-md-8 col-sm-7 keyword-search">
              <span class="bold">Tìm công ty</span>
              <span class="text-highlight bold">
                {{$route.query.keyword}}
              </span>
            </div>
            <div class="col-md-4 col-sm-5 suggest-company-count">
              JOBS gợi ý 
              <span class="text-highlight bold">{{employers.length}}  </span>công ty phù hợp</div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
             <div class="box box-white">
                <div
                    class="result-search-companies"
                    v-for="(company, index) in paginate"
                    :key="index"
                >
                  <div class="row result-search-company ">
                    <div class="col-sm-3 hidden-xs col-result-search-company-logo">
                      <div class="result-search-company-logo">
                        <a :href="`/employer/${company.username}`">
                          <img :src="`${company.avatar}`" alt="avatar">
                        </a>
                      </div>
                    </div>
                    <div class="col-sm-9 col-xs-12 col-result-search-company-info">
                      <strong><a :href="`/employer/${company.username}`" class="text-highlight company-name">   {{company.companyName}}</a></strong>
                      <div class="company-address">
                          <i class="fas fa-map-marker-alt"></i>
                          <span class="text-dark-gray"> {{company.address}}</span>
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
import EmployerSearchPanel from './SearchPanel.vue';
import EmployerService from '@/services/employer.service';  
export default {
  name: 'Moderator',
  data() {
    return {
      editStatus: true,
      employers: [1,2],
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
          if (!this.employers || this.employers.length != this.employers.length) {
              return
          }
          var index = this.currentPage * this.itemsPerPage - this.itemsPerPage
          return this.employers.slice(index, index + this.itemsPerPage)
      }
  },
  watch: {
    paginate: {
      deep: true,
      handler: function () {
        if (!this.employers || this.employers.length != this.employers.length) {
              return
        }else{
            this.resultCount = this.employers.length
            if (this.currentPage >= this.totalPages) {
              this.currentPage = this.totalPages
            } 
        }
      }
    },
    $route: async function(){
      this.employers = (await EmployerService.search(this.$route.query.keyword)).data;
    }
   

  },
  methods: {
      setPage: function(pageNumber) {
        this.currentPage = pageNumber
      }
  },
  components: {
    EmployerSearchPanel,
  },
  async created(){
   
    this.employers = (await EmployerService.search(this.$route.query.keyword)).data;
  }
};
</script>


<style lang="scss" scoped>

.afterSearch-main{
  background-color: #f6fbf9;
  .result-search-companies{
    .result-search-company{
      .result-search-company-logo{
        a{
          width: 100%;
          img{
            width: 60%;
          }
        }
      }
    }
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
}








</style>