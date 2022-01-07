export default {
    "errcode": 0,
    "errmsg": "",
    "data":{
        transactionNumber:{
            day: 199,
            month: 32567890,
            year: 24567532,
            all: 45753456
        },
        // 地图信息(迁徙图和热力图数据)
        mapInfo: {
            // 派件信息（迁徙图）
            dispatchInfo: [
                [{name: '南岗区'}, {name: '尚志市',value: 20}],
                [{name: '南岗区'}, {name: '延寿县',value: 80}],
                [{name: '南岗区'}, {name: '依兰县',value: 30}],
                [{name: '南岗区'}, {name: '巴彦县',value: 66}],
            ],
            //各区县受理情况（原热力图）
            acceptanceInfo: [
                {name: '尚志市',acceptanceNum: 20},
                {name: '延寿县',acceptanceNum: 80},
                {name: '依兰县',acceptanceNum: 30},
                {name: '巴彦县',acceptanceNum: 66},
            ]
        },
        //来电类别
        callType: [
            { name: "意见类", value: 3213214324 },
            { name: "建议类", value: 3213432432 },
            { name: "咨询类", value: 543534324 },
            { name: "诉求类", value: 432424324 }
        ],
        // 办理情况
        transactionInfo: [
            { value: 123456780, name:'交办'},
            { value: 123456789,name: '超期' },
            { value:0, name: '督办' },
            { value: 321234213, name: '办结' },
         ],

        // 办理方式
        transactionMode: [
            {name: '工单交办', value: 2357},
            {name: '直接答复', value: 876},
            {name: '电话交办', value: 342},
            {name: '来电直转', value: 78},
        ],
        // 按行业分析
        industryAnalysis: [
            {
                industryName: '教科文卫',
                count: 31231321321,
                ratio: 0.143,
                relativeRatio: 0.1
            },
            {
                industryName: '城市管理',
                count: 31231321321,
                ratio: 0.154,
                relativeRatio: 0.3
            },
            {
                industryName: '物业管理',
                count: 31231321321,
                ratio: 0.641,
                relativeRatio: -0.0
            },
            {
                industryName: '公共安全',
                count: 31231321321,
                ratio: 0.165,
                relativeRatio: 0.5
            },
            {
                industryName: '公共安全',
                count: 31231321321,
                ratio: 0.165,
                relativeRatio: 0.0
            },
            {
                industryName: '公共安全',
                count: 31231321321,
                ratio: 0.165,
                relativeRatio: 0.0
            },
            {
                industryName: '公共安全',
                count: 31231321321,
                ratio: 0.165,
                relativeRatio: 0.0
            },
            {
                industryName: '公共安全',
                count: 31231321321,
                ratio: 0.165,
                relativeRatio: 0.0
            },
            {
                industryName: '公共安全',
                count: 31231321321,
                ratio: 0.165,
                relativeRatio: 0.0
            },
            {
                industryName: '公共安全',
                count: 31231321321,
                ratio: 0.165,
                relativeRatio: 0.0
            },

        ],
        // 专题分析
        specificAnalysis: [
            { name: "医疗", value: 3456433213 },
            { name: "全部供热", value: 65432321321 },
            { name: "供热质量", value: 61234321321 },
            { name: "公共安全", value: 3456732131 },
            { name: "物业问题", value: 32145 },
            { name: "供水问题", value: 21345 },
            { name: "公安交通", value: 12343 },
            { name: "市容问题", value: 10970 },
            { name: "拆改建", value: 32170 },
        ],
        // 诉求关系
        appealRelation: {
            nodes:[
                {
                    name: '南岗区政府',
                    type: 'organization' // 类型
                },
                {
                    name: '道里区政府',
                    type: 'organization' // 类型
                },
                {
                    name: '疫苗接种0',
                    type: 'appeal' // 类型
                },
                {
                    name: '疫苗接种1',
                    type: 'appeal' // 类型
                },
                {
                    name: '疫苗接种2',
                    type: 'appeal' // 类型
                },
                {
                    name: '疫苗接种3',
                    type: 'appeal' // 类型
                },
            ],
            nodesRelations:[
                {
                    source: '南岗区政府',
                    target: '疫苗接种0',
                    value: 18, // 诉求数量
                },
                {
                    source: '南岗区政府',
                    target: '疫苗接种1',
                    value: 33, // 诉求数量
                },
                {
                    source: '道里区政府',
                    target: '疫苗接种1',
                    value: 98, // 诉求数量
                },
                {
                    source: '道里区政府',
                    target: '疫苗接种2',
                    value: 98, // 诉求数量
                },
                {
                    source: '道里区政府',
                    target: '疫苗接种3',
                    value: 98, // 诉求数量
                },
                {
                    source: '南岗区政府',
                    target: '疫苗接种3',
                    value: 9888, // 诉求数量
                },
            ]
        },
        // 区县排名
        countiesRank: [
            {
                name: "巴彦县",
                type:'county',
                value: 345643,
                yoyValue: 55435,// 同比数据
                qoqValue: 44335// 环比数据
            }, // 区县
            { name: "教育部", type:'department', value: 43243,yoyValue: 4234,// 同比数据
                qoqValue: 7657// 环比数据
            }, // 部门
            { name: "哈尔滨啤酒厂", type:'enterprise', value: 32137,yoyValue: 7675,// 同比数据
                qoqValue: 43242// 环比数据
            }, // 企业
            { name: "道外区",type:'county', value: 43424,yoyValue: 8768,// 同比数据
                qoqValue: 6546// 环比数据
            },
            { name: "方正县",type:'county', value: 231324,yoyValue: 6564,// 同比数据
                qoqValue: 4324// 环比数据
            },
            { name: "呼兰区", type:'county',value: 5435,yoyValue: 7657,// 同比数据
                qoqValue: 54656// 环比数据
            },
            { name: "依兰县",type:'county',value: 453435,yoyValue: 89797,// 同比数据
                qoqValue: 5435// 环比数据
            },
        ],
        // 热词
        hotWords: [
            { name: "温度低", value: 10927 },
            { name: "公共设施", value: 5902 },
            { name: "出租车问题", value: 3213 },
            { name: "疫情原因", value: 3232 },
            { name: "占道经营", value: 5543 },
            { name: "交通问题", value: 5434 },
            { name: "垃圾分类", value: 6546 },
            { name: "异地医保转入", value: 7768 },
            { name: "退休年龄", value: 3432 },
            { name: "市容环卫", value: 65464 },
            { name: "拖欠工人工资", value: 342 },
            { name: "非法集资", value: 98759 },
            { name: "农村用地", value: 65464 },
            { name: "消费者权益", value: 4324 },
            { name: "电力", value: 86754 },

        ],

    },
}
