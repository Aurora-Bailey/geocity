<template>
  <div class="top-nav">

    <div class="top-nav-fixed">
      <!-- use router-link component for navigation. -->
      <!-- specify the link by passing the `to` prop. -->
      <!-- <router-link> will be rendered as an `<a>` tag by default -->
      <router-link class="nav-link home" to="/" tag="div"></router-link>

      <div class="mobile-toggle" v-on:click="toggle=!toggle"><i class="fa fa-bars"></i></div>
      <div class="mobile-contain" :class="{open: toggle}">
        <router-link class="nav-link search" to="/search">search</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  /* Components */

  export default {
    name: 'top-nav',
    data () {
      return {
        toggle: false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
  /* SASS imports */
  @import "../sass/Variables"
  @import "../sass/Mixins"

  /* SASS Variables */
  $nav-height: 65px

  .top-nav
    height: $nav-height

  .top-nav-fixed
    position: fixed
    z-index: 1000
    top: 0
    left: 0
    right: 0
    box-shadow: 0 2px 8px 0 rgba(50, 50, 50, 0.08)
    background-color: $base

  .nav-link
    height: $nav-height
    line-height: $nav-height
    padding: 0 15px
    display: inline-block
    font-size: 13px
    font-weight: bold
    text-transform: uppercase
    vertical-align: text-top

  .router-link-active
    color: $accent

  .mobile-toggle
    display: none
    position: absolute
    top: 10px
    right: 20px
    width: 45px
    height: 45px
    text-align: center
    line-height: 45px
    font-size: 25px
    cursor: pointer

  .mobile-contain
    float: right
    display: inline-block
    max-height: $nav-height
    overflow: hidden
    padding: 0 20px

  .home
    margin-left: 20px
    width: 265px
    height: $nav-height
    padding: 0
    display: inline-block
    background-image: url('../assets/logo.png')
    background-repeat: no-repeat
    background-position: center
    cursor: pointer

  @media screen and (max-width: 750px)
    .nav-link
      height: 55px
      line-height: 55px
      display: block

    .home
      height: $nav-height

    .mobile-toggle
      display: inline-block

    .mobile-contain
      float: none
      display: block
      max-height: 0
      -webkit-box-shadow: inset 0 1px 1px 0 darken($base, 10%)
      -moz-box-shadow: inset 0 1px 1px 0 darken($base, 10%)
      box-shadow: inset 0 1px 1px 0 darken($base, 10%)
      -webkit-transition: max-height .5s ease
      transition: max-height .5s ease

      &.open
        max-height: 350px

  .this-is-to-make-webstorm-recognize-end-of-sass-line
    opacity: 1
</style>
