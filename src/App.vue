<template>
  <div>
    <vc-header></vc-header>
    <router-view></router-view>
  </div>
</template>

<script>
import VcHeader from "./component/VcHeader";
export default {
  name: "App",
  components: { VcHeader }
}
</script>

<style lang="sass">
@import "assets/scss/main"
</style>