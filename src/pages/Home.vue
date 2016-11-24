<template>
  <div class="home">
    <hello></hello>
    {{$root.version.micro}}
  </div>
</template>

<script>
  /* Components */
  // Parts
  import Hello from '../parts/Hello'

  export default {
    name: 'home',
    components: {
      Hello
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
  /* SASS imports */
  @import "../sass/Variables"
  @import "../sass/Mixins"

  .home
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    padding-top: 60px

</style>
