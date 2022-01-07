<template>
  <div class="nav_view">
    <div class="nav_logo">导航栏</div>
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
            default-active="买入记录"
            class="el-menu-vertical-demo"
            @select="handSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
          <el-submenu index="可转债">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>可转债</span>
            </template>
            <el-menu-item-group>
              <template slot="title">操作区</template>
              <el-menu-item index="买入记录">买入记录</el-menu-item>
              <el-menu-item index="卖出记录">卖出记录</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="观察区">
              <el-menu-item index="网格观察">网格观察</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
<!--          <el-menu-item index="1">-->
<!--            <template slot="title">-->
<!--              <i class="el-icon-location"></i>-->
<!--              <span>可转债</span>-->
<!--            </template>-->
<!--          </el-menu-item>-->
          <el-menu-item index="股票">
            <i class="el-icon-menu"></i>
            <span slot="title">股票</span>
          </el-menu-item>
          <el-menu-item index="基金">
            <i class="el-icon-document"></i>
            <span slot="title">基金</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "NavMenue",
  props: {},

  data() {
    return {
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handSelect(key, keyPath) {
      this.$bus.emit("onNavSelected",keyPath)
      //console.log(key, keyPath);
    },
  },
  mounted() {
  },
};
</script>
<style scoped lang="scss">
.nav_view {
  width:100%;
  height:100vh;
  background:#545c64;
  color:#fff;
  .nav_logo{
    padding: 23px;
    font-size: 16px;
  }
}

.el-menu{
  text-align: left;
  padding-left: 20px;
  .el-menu-item, .el-submenu{
    width:93%;
    font-size: 16px;
    font-weight: 600;
    line-height: 60px;
    margin:0 auto;

    &.is-active{
      background:rgb(106 121 135) !important;
      border-radius: 10px!important;
    }
  }
}
</style>
<style>
.el-submenu__title{
  font-size: 16px;
}
.el-menu-item-group__title{
  font-size: 14px;
}
.el-menu-item-group ul li{
  font-size: 14px!important;
}
</style>
