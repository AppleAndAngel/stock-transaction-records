import http from '@lib/http';
const optionsJson = { headers: { 'Content-Type': 'application/json' }};
const optionsForm = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }};
let apis = new http({
    /**获取首页所有数据 */
    getHomeAllInfo: {
        url: '/api/getSecondPriorityData',
        method: 'get',
        options: optionsForm
    },
    /**获取某个区县趋势图（折线图）*/
    getCountryTrend: {
        url: '/api/getCountryTrend',
        method: 'get',
        options: optionsForm
    },
    /**获取某个区县三级部门及相关信息*/
    getCountryThirdDepartment: {
        url: '/api/getCountryThirdDepartment',
        method: 'get',
        options: optionsForm
    },
    /**获取二级行业及相关信息*/
    getIndustrySecondDepartment: {
        url: '/api/getIndustrySecondDepartment',
        method: 'get',
        options: optionsForm
    },
    /**获取二级下趋势分析相关信息*/
    getTrendAnalysis: {
        url: '/api/getTrendAnalysis',
        method: 'get',
    },
    /**获取二级行业及相关信息*/
    getMapData: {
        url: '/api/getMapData',
        method: 'get',
    },

    // getShoppingGuideInfo: {
    //     url: 'xxx',
    //     method: 'post',
    //     options: {
    //         headers: { 'Content-Type': 'application/json' },
    //     },
    // },
});
export default apis;
