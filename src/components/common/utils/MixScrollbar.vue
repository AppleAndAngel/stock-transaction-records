<script>
const Scrollbar = window.ELEMENT.Scrollbar;

export default {
    name: 'MixScrollbar',
    extends: Scrollbar,
    model: {
        prop: 'loading',
    },
    props: {
        finished: {
            type: Boolean,
            default: false,
        },
        loading: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        handleScroll () {
            const wrap = this.wrap;

            this.moveY = ((wrap.scrollTop * 100) / wrap.clientHeight);
            this.moveX = ((wrap.scrollLeft * 100) / wrap.clientWidth);
            if (this.loading || this.finished) {
                return;
            }
            let elHeight = wrap.clientHeight,
                scrollHeight = wrap.scrollHeight,
                diff = scrollHeight - elHeight;
            if (diff - wrap.scrollTop < Math.min(Math.max(diff - 20, 20), diff * 0.2)) {
                this.$emit('input', true);
                this.$emit('load');
            }
        },
    },
};
</script>

<style scoped lang="scss">

</style>
