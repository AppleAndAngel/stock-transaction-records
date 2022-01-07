<template>
  <div>
    <h1>登录模块</h1>
    <el-button @click="login">登录</el-button>
    <el-button
      type="primary"
      size="small"
      @click="verticalChoose"
    >
      竖式选择
    </el-button>
    <vertical-operation
      ref="vertical-operation"
      @vertical-confirm="success"
    />
    <div v-html="img" />
  </div>
</template>
<script>
import verticalOperation from 'vertical-editor'
import { getURLParameters, getQueryString } from '@/utils/func.js';
import apis from './proxy';
export default {
    components: {verticalOperation},
    data: function () {
        return {
            img: '',
        }
    },
    created () {

    },
    mounted () {

    },
    methods: {
        login (){
            this.setLoginInfo({
                userName: '测试账号',
                token: 'token123123',
            });
        },
        /**
       * 登录成功，设置loginInfo（JSON字符串,包含userName和token）
       * @param loginInfo
       */
        setLoginInfo(loginInfo) {
            let routers = this.$store.getters['global/routerList'];
            this.$store.commit('global/mu_setloginInfo', JSON.stringify(loginInfo));
            if (routers && routers.length) {
                //backPath
                this.$router.replace(routers[0]);
            }else {
                //todo
            }
        },
        verticalChoose () {
            this.$refs['vertical-operation'].show()
        },
        success (res, img) {
            this.img = img.outerHTML;
            this.$refs['vertical-operation'].hide()
        },
    },
};
</script>
