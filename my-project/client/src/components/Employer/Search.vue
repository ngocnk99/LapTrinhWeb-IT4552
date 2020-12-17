<template>
  <div class="company">
  search
  </div>
</template>

<script>
import UserService from '@/services/user.service';

export default {
  name: 'Moderator',
  data() {
    return {
      content: '',
      editStatus: true,
    };
  },
  mounted() {
    UserService.getModeratorBoard().then(
      response => {
        this.content = response.data;
      },
      error => {
        this.content =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  }
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