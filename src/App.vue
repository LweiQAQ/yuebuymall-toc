<template>
  <div>
      <Header/>
          <router-view></router-view>
          <h1>{{name}}</h1>
      <Footer v-show="$route.meta.show"/>
  </div>
</template>

<script>
import Header from './components/Header/index.vue';
import Footer from './components/Footer/index.vue';
import {mapState} from 'vuex';
import 'animate.css'
export default {
  name: 'App',
  components:{Header,Footer},
  computed:{
      ...mapState('home',['name'])
  },
  mounted(){
    this.$store.dispatch('home/categoryList')
  }
}

</script>

<style>

</style>
