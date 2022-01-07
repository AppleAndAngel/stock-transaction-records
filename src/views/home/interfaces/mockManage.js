const Mock = require('mockjs');
import getSecondPriorityData from './getSecondPriorityData.js'
import CountryTrend from './countryTrend.js'
import CountryThirdDepartment from './countryThirdDepartment.js'
import IndustrySecondDepartment from './industrySecondDepartment.js'
import TrendAnalysis from './trendAnalysis'
import mapData from './mapData.js'

Mock.mock('/api/getSecondPriorityData', 'get', getSecondPriorityData);
Mock.mock('/api/getCountryTrend', 'get', CountryTrend);
Mock.mock('/api/getCountryThirdDepartment', 'get', CountryThirdDepartment);
Mock.mock('/api/getIndustrySecondDepartment', 'get', IndustrySecondDepartment);
Mock.mock('/api/getTrendAnalysis', 'get', TrendAnalysis)
Mock.mock('/api/getMapData', 'get', mapData);

