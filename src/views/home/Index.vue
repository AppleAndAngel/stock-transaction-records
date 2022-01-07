<template>
  <div class="main">
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <nav-menue></nav-menue>
        </div>
      </el-col>
      <el-col :span="20">
        <div>
          <nav-title></nav-title>
        </div>
        <div>
          <table-s></table-s>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from './apis/api'
import NavMenue from './components/navMenue'
import NavTitle from './components/navTitle'

import TableS from './components/tableS'
// import theMap from './components/theMap/theMap'
// import SpecificAnalysis from './components/specificAnalysis'
// import TransactionInfo from './components/transactionInfo'
// import appealRelation from './components/appealRelation/appealRelation'
// import countiesRank from './components/countiesRank/countiesRank'
// import transactionWay from './components/transactionWay'
// import industryAnalysis from './components/industryAnalysis/industryAnalysis'
// import thirdDepartment from './components/countiesRank/thirdDepartment'
// import secondDepartment from './components/industryAnalysis/secondDepartment'
// import chooseDateDialog from './components/chooseDate/chooseDateDialog'


export default {
  name: '',
  components: {
    NavMenue,
    NavTitle,
    TableS
  },
  props: {},
  data() {
    return {
      visible: false
    }
  },
  watch: {},
  computed: {},
  created() {

  },
  mounted() {
  },
  filters: {},
  methods: {},
};
</script>

<style src="./Index.scss" lang="scss">
</style>
