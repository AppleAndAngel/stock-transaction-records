<!--办理情况-->
<template>
  <div class="nav_title">
    <h3>{{navTit}}</h3>
  </div>
</template>
<script>

export default {
  name: "NavTitle",
  props: {

  },

  data() {
    return {
      navTit: '可转债 / 买入记录'// 导航名称
    };
  },
  methods: {

  },
  destroyed() {
    this.$bus.off("onNavSelected");
  },
  mounted() {
    this.$bus.on("onNavSelected",(keyPath)=>{
        this.navTit = keyPath.length === 2 ? `${keyPath[0]} / ${keyPath[1]}` : `${keyPath[0]}`
    })

  },
};
</script>
<style scoped lang="scss">
  .nav_title{
    text-align: left;
    padding: 20px 30px;
    border-bottom: 1px solid #ecedee;
    margin: 0 0px 28px 0px;
    box-shadow: 0px 2px 3px #938787;
  }
</style>
