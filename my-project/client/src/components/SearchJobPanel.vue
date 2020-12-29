<template>
  <div class="searchPanel">
    <div class="container">
      <div class="box-form-search">
          <div class="row">
            <div class="col-sm-8">
              <div class="input-wrap">
                <i class="fas fa-search "></i>
                <div class="input-box">
                  <input type="text" placeholder="Tên công việc,ngành nghê bạn muốn ứng tuyển" v-model="keyword">
                </div>
                  <div class="listname" v-if="searchStatus">
                    <div
                      class="listname__item"
                      v-for="(name, index) in keywordList"
                      :key="index"
                      @click="selectKeyWord"
                    >{{name}}</div>
                  </div>
              </div>
            </div>
            <div class="col-sm-2">
              <div class="input-wrap">
                <i class="fas fa-map-marker-alt"></i>
                <div class="input-box">
                  <input type="text" placeholder="Tất cả địa điểm" v-model="address">
                </div>
              </div>
            </div>  
            <div class="col-sm-2">
              <div class="button button-primary" @click="goSearch"><i class="fas fa-search"></i> Tìm</div>
            </div>
           <h4>Tìm việc làm nhanh,uy tín, mới nhất trên <strong>JOBS</strong> </h4>
          </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import PostService from '@/services/PostService';
import _ from 'lodash';
export default {
  name: 'PostsSearch',
  data() {
    return {
      keyword: '',
      address:'',
      keywordList:[],
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
          this.keyword = target.innerHTML
      },
      goSearch(){
        const route = {
          name: 'jobSearch'
        };
        route.query = {}
        if(this.keyword != this.$route.query.keyword){
          route.query.keyword = this.keyword
        }
         if(this.address != this.$route.query.address){
          route.query.address = this.address
        }
        this.$router.push(route);
      }
  },

  watch: {
    keyword: _.debounce(async function () {

        let list = []
        if (this.keyword !== '') {
          let reponseData = (await PostService.index({keyword: this.keyword})).data;
          reponseData[0].forEach(element => {
            list.push(element.title)
           
          });
          reponseData[1].forEach(element => {
            list.push(element.career)
          });
        }
        this.keywordList = this.removeDups(list).slice(0,10);
     }, 500),
    keywordList() {
      if(this.keywordList.length != 0){
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
    background-color:#212f3f ;
    .box-form-search{
      color:white;
      background-color: rgba(51,51,51,.6);
      padding: 0px 20px;
      .col-sm-8,.col-sm-2{
        padding: 12px 4px;
      }
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
      h4{
        padding-left:5px ;
      }
    }
  }



  
  .button-primary{
      background-color: #00b14f;
      color: white;
  }
</style>