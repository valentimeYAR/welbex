<template>
  <div class="wrapper">
      <div class="container">

      </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
    name: "ArticlePage",
    props: ['id'],
    beforeCreate() {
        axios.get("")
    },
}
</script>

<style scoped>
.wrapper{
    background-color: #0D1117;
}
.container{
    width: 1400px;
    margin: 0 auto;
    padding: 20px;
}
</style>