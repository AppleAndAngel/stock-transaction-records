<script>
const Dialog = window.ELEMENT.Dialog;
Dialog.props.closeOnClickModal.default = false; //  点击model是否关闭弹框
// eslint-disable-next-line no-unused-vars
const getDOM = function (dom) {
    if (dom.nodeType === 3) {
        dom = dom.nextElementSibling || dom.nextSibling;
        getDOM(dom);
    }
    return dom;
};

export default {
    name: 'MixDialog',
    extends: Dialog,
    props: {
        closeOnClickModal: {
            type: Boolean,
            default: false,
        },
    },
    watch: {
        visible (val) {
            val && this.processScroll();
        },
    },
    mounted () {
        if (this.visible) {
            // this.rendered = true;
            // this.open();
            // if (this.appendToBody) {
            //   document.body.appendChild(this.$el);
            // }
            this.processScroll();
        }
    },
    methods: {
        processScroll () {
            if (!this.modal) {
                if (this.lockScroll) {
                    let body = document.body,
                        scrollBarWidth = null;
                    this.withoutHiddenClass = !body.className.includes('el-popup-parent--hidden');
                    if (this.withoutHiddenClass) {
                        this.bodyPaddingRight = document.body.style.paddingRight;
                        this.computedBodyPaddingRight = parseInt(getStyle(body, 'paddingRight'), 10);
                    }
                    scrollBarWidth = 17;
                    let bodyHasOverflow = document.documentElement.clientHeight < body.scrollHeight;
                    let bodyOverflowY = getStyle(body, 'overflowY');
                    if (scrollBarWidth > 0 && (bodyHasOverflow || bodyOverflowY === 'scroll') && this.withoutHiddenClass) {
                        body.style.paddingRight = this.computedBodyPaddingRight + scrollBarWidth + 'px';
                    }
                    body.classList.add('el-popup-parent--hidden');
                }
            }
        },
        restoreBodyStyle () {
            if (this.withoutHiddenClass) {
                document.body.style.paddingRight = this.bodyPaddingRight;
                // removeClass(document.body, 'el-popup-parent--hidden');
                document.body.classList.remove('el-popup-parent--hidden');
            }
            this.withoutHiddenClass = true;
        },
    },
};
const camelCase = function (name) {
    return name.replace(/([:\-_]+(.))/g, function (_, separator, letter, offset) {
        return offset ? letter.toUpperCase() : letter;
    }).replace(/^moz([A-Z])/, 'Moz$1');
};

function getStyle (element, styleName) {
    if (!element || !styleName) return null;
    styleName = camelCase(styleName);
    if (styleName === 'float') {
        styleName = 'cssFloat';
    }
    try {
        var computed = document.defaultView.getComputedStyle(element, '');
        return element.style[styleName] || computed ? computed[styleName] : null;
    } catch (e) {
        return element.style[styleName];
    }
}
</script>

<style scoped lang="scss">

</style>
