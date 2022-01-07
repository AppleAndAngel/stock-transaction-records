export default {
    "errcode": 0,
    "errmsg": "",
    "data":{
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
            {name: '延寿县',acceptanceNum: 30},
            {name: '依兰县',acceptanceNum: 40},
            {name: '巴彦县',acceptanceNum: 50},

            {name: '宾县',acceptanceNum: 66},
            {name: '道里区',acceptanceNum: 70},
            {name: '方正县',acceptanceNum: 80},
            {name: '松北区',acceptanceNum: 90},
        ]
    },
}
