<template>
  <div class="company">
   <employer-search-panel></employer-search-panel>
   <div class="box-recruiting-companies">
     <div class="container">
       <div class="row">
         <div class="col-md-12">
           <div class="box-featured-companies">
             <h4 class="text_ellipsis uppercase">NHÀ TUYỂN DỤNG NỔI BẬT</h4>
             <div class="box box-white" style="padding-top:10px; padding-bottom:10px">
               <div class="row">

                <div
                    class="col-sm-3 col-xs-6 featured-company-img"
                    v-for="(employer, index) in employers"
                    :key="index"
                  ><a :href="`/employer/${employer.username}`">
                  <img :src="`${employer.avatar}`" alt=""></a> </div>
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
import EmployerSearchPanel from './SearchPanel.vue';
import EmployerService from '@/services/employer.service';
export default {
  name: 'EmployerIndex',
  data() {
    return {
      employers: [],
    };
  },
  components: {
    EmployerSearchPanel,
  },
  async created(){
    this.employers = (await EmployerService.getAll()).data;
  }
};
</script>


<style lang="scss" scoped>
.box-featured-companies{
   
    color: #fff;
    padding-top: 20px;
    h4{
       background-color: #222f3f;
      padding: 20px 10px;
    }
    .text_ellipsis {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .featured-company-img a{
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        margin: 0 auto 5px;
        padding: 5px;
        img{
           width: 50%;
        }
    }
}
</style>