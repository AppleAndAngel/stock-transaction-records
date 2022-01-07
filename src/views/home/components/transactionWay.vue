<!--办理方式-->
<template>
    <div id="transactionWayView">
        <div id="tratransactionWayContent" @click="handleSelect">
            <ul>
                <li v-for="(item,i) in transactionMode" @click="selectItem(item,i,$event)" :class="{'active': activeItem == i}">
                    <span>{{item['name']}}</span>
                    <span>{{item['value']}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>

    export default {
        name: "TransactionInfo",
        props: {
            transactionMode: {
                type: Array,
                default: function () {
                    return []
                },
            },
        },
        // computed: {
        //   dataLists(){
        //     return this.transactionMode
        //   }
        // },
        data() {
            return {
                activeItem: -1,
            };
        },
        methods: {
            selectItem(params,i,event){
                this.activeItem = i;
                this.$parent.childSearch({
                    transactionMode: params.name,
                })
                event.stopPropagation();
            },
            handleSelect(event){
                this.activeItem = -1;
                this.$parent.childSearch({
                    transactionMode: '',
                });
                event.stopPropagation();
            }
        },

        mounted() {

        },
    };
</script>
<style scoped lang="scss">
    #transactionWayView {
        width: 100%;
        height: 100%;

        #tratransactionWayContent {
            width: 100%;
            height: 80%;
            display: flex;
            justify-content: center;

            ul {
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;

                li {
                    width: 90%;
                    display: flex;
                    justify-content: space-between;
                    margin-top: 10px;

                    padding: 8px;
                    border-top: 1px solid #01a3f4;
                    border-bottom: 1px solid #01a3f4;
                    background: rgba(0, 90, 174, 0.1);
                    color: #a0d8ff;

                    span:last-child {
                        font-size: 18px;
                        color: #fff;
                    }
                    &.active{
                        background: #2b9b7c;
                    }
                }
            }
        }
    }
</style>
