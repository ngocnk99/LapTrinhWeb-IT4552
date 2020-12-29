<template>
  <div class="searchPanel">
    <div class="container">
      <div class="box-form-search">
          <h3>Tra cứu thông tin <strong>công ty</strong> trên JOBS</h3>
          <div class="row">
            <div class="col-sm-9">
              <div class="input-wrap">
                <i class="fas fa-search "></i>
                <div class="input-box">
                  <input type="text" placeholder="Nhâp tên công ty" v-model="search">
                </div>
                  <div class="listname" v-if="searchStatus">
                    <div
                      class="listname__item"
                      v-for="(name, index) in employerNameList"
                      :key="index"
                      @click="selectKeyWord"
                    >{{name}}</div>
                  </div>
              </div>
            </div>
            <div class="col-sm-3">
              <div class="button button-primary" @click="goSearch"><i class="fas fa-search"></i> Tìm</div>
            </div>
       
        </div>
      </div>
    </div>
      
  </div>
</template>
 
<script>
import EmployerService from '@/services/employer.service';
import _ from 'lodash';
export default {
  name: 'PostsSearch',
  data() {
    return {
      search: '',
      employerNameList: [],
      searchStatus: false
    };
  },
  methods:{
     removeDups(names) {
        let unique = {};
        names.forEach(function(i) {
          if(!unique[i]) {
            unique[i] = true;
          }
        });
        return Object.keys(unique);
      },
      selectKeyWord(){
          let target = event.target || event.srcElement;
          this.search = target.innerHTML
      },
      goSearch(){
        const route = {
          name: 'employerSearch'
        };
        if(this.search != this.$route.query.keyword){
          route.query = {
            keyword: this.search,
          }
        }
        this.$router.push(route);
      }
  },

  watch: {
    search: _.debounce(async function () {
        let listName = [];
        if (this.search !== '') {
          let reponseData = (await EmployerService.search(this.search)).data;
          reponseData.forEach(element => {
            listName.push(element.companyName)
          });
        }
        this.employerNameList = this.removeDups(listName).slice(0,10);
     }, 500),
    employerNameList() {
      if(this.employerNameList.length != 0){
        this.searchStatus = true;
      }else{
        this.searchStatus = false;
      }
    }
  },
};
</script>

 <style lang="scss" scoped>
  .searchPanel{
    background: url("https://firebasestorage.googleapis.com/v0/b/laptrinhweb-4dbf0.appspot.com/o/employer%2Fsearch_company_bg.png?alt=media&token=bf452a9e-1a27-4ea6-b5f4-adcda6b29df1");
    background-size: cover;
    .box-form-search{
      color:white;
      background-color: rgba(51,51,51,.6);
      margin: 20px auto;
      padding: 15px 20px;
      @media (min-width: 768px){     width: 70%; } 
      .input-wrap{
        background-color:white ;
        display: flex;
        position: relative;
        .listname{
          position: absolute;
          top: 45px;
          background-color:white ;
          width: 70%;
          z-index: 98;
          box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
          padding: 10px 10px;
          color: black;
          &__item{
            margin: 5px 0;
            cursor: pointer;
            z-index: 99;
          }
        }
        i{
          margin: auto 5px auto 5px;
        }
        .input-box{
          flex: 1;
          height: 100%;
          input{
            height: 100%;
            width: 100%;
            &:focus{
              outline: none;
              border: none;
            }
          }
        }
        height: 40px;
      }
        .button{
          height: 40px;
          line-height: 40px;
          border-radius: 3px;
          outline: none;
          text-align: center;
          cursor: pointer;
          i{
            color: white;
          }
        }
    }
  }



  
  .button-primary{
      background-color: #00b14f;
      color: white;
  }
</style>