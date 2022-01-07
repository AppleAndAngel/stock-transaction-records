// import MixDialog from '../common/utils/MixDialog.vue';
import MixTooltip from '../common/utils/MixTooltip.vue';
const Message = window.ELEMENT.Message,
    Vue = window.Vue;

/* 全局配置 element's Message 组件 */
const messageOption = {
    duration: 1000,
    showClose: true,
}; // message默认配置
const $message = function (option) {
    if (!(option instanceof Object)) {
        option = { message: option };
    }
    Message(Object.assign({}, messageOption, option));
};

['success', 'warning', 'info', 'error'].forEach(type => {
    $message[type] = option => {
        if (!(option instanceof Object)) {
            option = { message: option };
        }
        return Message(Object.assign({}, messageOption, option, { type }));
    };
});
(function detection () {
    if (Vue.prototype.$message) {
        Object.assign(Vue.prototype, {
            $message,
        });
    } else {
        setTimeout(detection, 200);
    }
})();

/* mix-dialog */
// Vue.component('mix-dialog', MixDialog);
/* mix-tooltip */
Vue.component('mix-tooltip', MixTooltip);
