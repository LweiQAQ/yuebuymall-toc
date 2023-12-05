<template>
  <div>
    <TypeNav />
    <Container />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="(floor,index) in floors" :key="floor.id" :floor="floor"/>
    <Brand />
  </div>
</template>

<script>
import Container from "./Container/index.vue";
import Recommend from "./Recommend/index.vue";
import Rank from "./Rank/index.vue";
import Like from "./Like/index.vue";
import Floor from "./Floor/index.vue";
import Brand from "./Brand/index.vue";
import {mapState} from "vuex";
export default {
  components: {
    Container,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    this.$store.dispatch("home/getFloorsList");
    
  },
  computed: {
    ...mapState("home", ["floors"]),
    ...mapState("login", ["userInfo"])
  },
};
</script>

<style>
</style>