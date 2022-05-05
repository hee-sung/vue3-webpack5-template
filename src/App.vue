<template>
  <div>
    <vc-header></vc-header>
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