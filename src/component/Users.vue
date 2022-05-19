<template>
  <h3 class="users-title">사용자 목록</h3>
  <div v-if="loaded">
    <ul v-for="user in users" class="users">
      <li v-on:click="moveUser(user.id)">{{user.name}}</li>
    </ul>
  </div>

  <button v-on:click="addUser">add Users</button>
</template>

<script>
  import {UserApi} from "../api/UserApi";

  export default {
    name: "Users",
    data() {
      return {
        userApi: new UserApi(),
        loaded: false,
        users: []
      }
    },
    created() {
      this.getUsers();
    },
    methods: {
      getUsers() {
        this.userApi.getUsers()
            .then(res => {
              this.loaded = true;
              this.users = res.data;
            }).catch(error => {
          console.error('error : ', error)
        });
      },
      moveUser(id) {
        this.$router.push({name: 'User', params: {id: id}});
      },
      addUser() {
        const params = {
          name: 'woodz',
          birthDay: '1996-08-05'
        };

        this.userApi.addUser(params)
          .then(res => {
            console.warn(res);
          })
          .catch(error => {
            console.error('error : ', error.message);
          });
      }
    }
  }
</script>

<style scoped lang="scss">
@import "assets/scss/users"
</style>