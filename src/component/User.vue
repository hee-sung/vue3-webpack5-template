<template>
  <h2>UserId : {{ id }}</h2>
  <div v-if="loaded">
    {{ user }}
  </div>
</template>

<script>
  import {UserApi} from "../api/UserApi";
  export default {
    name: "User",
    data() {
      return {
        id: this.$route.params.id,
        userApi: new UserApi(),
        loaded: false,
        user: {}
      }
    },
    created() {
      this.getUser(this.id);
    },
    methods: {
      getUser(id) {
        this.loaded = false;

        this.userApi.getUser(id)
        .then((res) => {
          this.loaded = true;
          this.user = res.data;
        })
        .catch((error) => {
          console.error('error status : ', error.status)
          console.error('error message : ', error.message)
        });
      }
    }
  }
</script>

<style scoped>

</style>