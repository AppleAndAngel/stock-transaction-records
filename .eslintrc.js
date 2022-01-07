module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  "globals": {
    "FormData": true,
    "XMLHttpRequest":true
  },
  'extends': [
    "eslint:recommended",
    "plugin:vue/recommended"
  ],
  rules: {
    "vue/singleline-html-element-content-newline": "off",
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 可混合使用不同的操作符
    "no-mixed-operators": "off",
    "no-undef": 0, // 可以 有未定义的变量
    "eqeqeq": 0, // 不是必须使用全等
    "semi": 0,  // 语句可以不需要分号结尾
    "eol-last": 0,  // 文件以单一的换行符结束
    "no-unused-vars": 0, // 可以有定义却不使用的变量
    "one-var": 'off',
    // 空格2个
    "indent": [2, 4, {"SwitchCase": 1}],
    // 允许块级代码
    "no-lone-blocks": 0,
    // 变量命名风格
    "camelcase": [1, {properties: "never"}],
    // 多行模式必须带逗号，单行模式不能带逗号
    "comma-dangle": [2, "always-multiline"]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
