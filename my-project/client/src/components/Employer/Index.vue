<template>
  <div class="company">
   <employer-search-panel></employer-search-panel>
  </div>
</template>

<script>
import EmployerSearchPanel from './SearchPanel.vue';
export default {
  name: 'EmployerIndex',
  data() {
    return {
      content: '',
    };
  },
  components: {
    EmployerSearchPanel,
  },
};
</script>


<style lang="scss" scoped>
.input-setup {
  font-family: 'Caveat', cursive;
  border: none;
  border-radius: 2px;
  &::placeholder {
    color: transparent;
  } 
}

.show-placeholder {
  &::placeholder {
    color: #333333 !important;
  }
}

.bc-none {
  background-color: transparent;
}

</style>