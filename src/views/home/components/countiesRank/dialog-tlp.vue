<template>
    <div>
        <div class="maskPart"></div>
        <div class="the-dialog" id="thirdDepartmentDialog" style="">
            <i class="the-dialog-close" @click="closeDialog"></i>
            <div class="the-dialog"></div>
        </div>
    </div>


</template>

<script>
    export default {
        name: "thirdDepartment",
        props:{

        },
        data(){
            return{}
        },
        mounted() {
        },
        methods:{
            //关闭弹框
            closeDialog(){
                this.$emit('closeDialog')
            }
        }
    }
</script>

<style scoped>
    #thirdDepartmentDialog{
        width: 1383px;
        height: 769px;
    }
</style>
