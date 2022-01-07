
<script>
export default {
    name: 'MixTooltip',
    extends: window.ELEMENT.Tooltip,
    methods: {
        handleFocus () {
            this.focusing = true;
        },
    },
};
</script>

<style scoped lang="scss">

</style>
