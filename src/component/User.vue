<template>
  <h2>UserId : {{id}}</h2>
</template>

<script>
  import {UserApi} from "../api/UserApi";
  export default {
    name: "User",
    data() {
      return {
        id: this.$route.params.id,
        userApi: new UserApi()
      }
    },
    created() {
      this.getUser(this.id);
    },
    methods: {
      getUser(id) {
        console.log('getUser');
        this.userApi.getUser(id)
        .then((res) => {
          console.warn('user : ', res);
        })
        .catch((error) => {});
      }
    }
  }
</script>

<style scoped>

</style>