const path = require('path');
const webpack = require('webpack');

function resolve (dir) {
    return path.join(__dirname, dir);
}

function getDateTime () {
    var d, s;
    d = new Date();
    s = d.getFullYear(); // 取年份
    s += '' + ('0' + (d.getMonth() + 1)).substr(-2);// 取月份
    s += '' + ('0' + d.getDate()).substr(-2); // 取日期
    s += '' + ('0' + d.getHours()).substr(-2); // 取小时
    s += '' + ('0' + d.getMinutes()).substr(-2); // 取分
    // s += ':' + ('0' + d.getSeconds()).substr(-2); // 取秒
    return s;
}

process.env.VUE_APP_BUILD_TIME = getDateTime();
process.env.VUE_APP_BASE_DOMAIN = process.env.NODE_ENV === 'production' ? '/' : '';
process.env.VUE_APP_MIN_STR = process.env.NODE_ENV === 'production' ? '.min' : ''; // dev与prod环境切换引用压缩资源
process.env.VUE_APP_VERSION = require('./package.json').version + '_' + getDateTime();

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : './',
    lintOnSave: false,
    pages: {
        index: {
        // entry for the page
            entry: 'src/main.js',
            // the source template
            template: 'public/index.html',
            // output as dist/index.html
            filename: 'index.html',
            // when using title option,
            // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
            title: '',
            // chunks to include on this page, by default includes
            // extracted common chunks and vendor chunks.
            // chunks: ['chunk-vendors', 'chunk-common', 'index'],
        },
        // when using the entry-only string format,
        // template is inferred to be `public/subpage.html`
        // and falls back to `public/index.html` if not found.
        // Output filename is inferred to be `subpage.html`.
        // subpage: 'src/subpage/main.js',
    },
    devServer: {
    },
    css: {
        sourceMap: process.env.NODE_ENV === 'development',
        extract: {
            // 为css添加版本号
            filename: `css/[name].${process.env.VUE_APP_VERSION}.css`,
            chunkFilename: `css/[name].${process.env.VUE_APP_VERSION}.css`,
        },
    },
    chainWebpack: (config) => {
        config.resolve.alias
            .set('$root', resolve(''))
            .set('$public', resolve('public'))
            .set('$dist', resolve('dist'))
            .set('@lib', resolve('src/lib'))
            .set('@assets', resolve('src/assets'))
            .set('@components', resolve('src/components'))
            .set('@', resolve('src'));
        // 为图片添加版本号
        config.module
            .rule('images')
            .use('url-loader')
            .tap(options => {
                return {
                    limit: 4096,
                    fallback: {
                        loader: 'file-loader',
                        options: {
                            name: `img/[name].${process.env.VUE_APP_VERSION}.[ext]`,
                        },
                    },
                };
            });

        // 为js添加版本号
        config.output.chunkFilename(`js/[name].${process.env.VUE_APP_VERSION}.js`);
        config.output.filename(`js/[name].${process.env.VUE_APP_VERSION}.js`);
    },
    configureWebpack: config => {
        let pluginBanner = [
            new webpack.BannerPlugin(`Build Time = ${getDateTime()}`),
        ];
        config.plugins = [...config.plugins, ...pluginBanner];
    },
};
