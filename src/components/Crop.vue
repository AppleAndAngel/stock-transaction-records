<template>
  <div class>
    <header>xxx</header>
    <transition
      name="fade"
    >
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
    name: '',
    components: {

    },
    props: {

    },
    data () {
        return {

        }
    },
    computed: {

    },
    created () {

    },
    mounted () {

    },
    methods: {

    },
}
</script>

<style scoped lang="scss">
  header{
    height: 50px;
    line-height: 50px;
    background: #3a8ee6;
    font-size: 22px;
  }
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
