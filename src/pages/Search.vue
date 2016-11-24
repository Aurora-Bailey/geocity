<template>
  <div class="search" >
    search <button v-on:click="sendPing()">PING</button>
  </div>
</template>

<script>
  /* Modules */
  import WS from '../modules/WebSocket'

  /* Components */

  export default {
    name: 'search',
    methods: {
      sendPing: function () {
        WS.sendObj({m: 'ping', v: 'asdf'})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
  /* SASS imports */
  @import "../sass/Variables"
  @import "../sass/Mixins"

  .search
    color: red

</style>
