<template>
  <div class="search" >
    <div class="card">
      <div class="title">Enter your city</div>
      <input v-model="search_model" class="search-input" type="text">
    </div>
    <div class="card">
      <div class="title">Did you mean</div>
      <div v-for="suggest in $root.pages.search.suggestions">{{suggest}}</div>
    </div>
  </div>
</template>

<script>
  /* Modules */
  import WS from '../modules/WebSocket'

  /* Components */

  export default {
    name: 'search',
    data () {
      return {
        search_model: ''
      }
    },
    watch: {
      search_model: function (e) {
        WS.sendObj({m: 'suggest_city', text: e})
      }
    },
    methods: {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
  /* SASS imports */
  @import "../sass/Variables"
  @import "../sass/Mixins"

  .search
    opacity: 1

  .card
    background-color: $base
    padding: 25px
    margin: 25px auto
    width: 750px
    @media screen and (max-width: 750px)
      width: auto
      margin: 25px 10px


  .asdf
    color: blue

</style>
