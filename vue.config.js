const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
    lintOnSave: false,
    productionSourceMap: false,
    outputDir:"build", //设置打包后的项目目录名称
    // 放置静态资源的地方 (js/css/img/font/...)
    assetsDir:'static',
    devServer:{
        hotOnly:true,
    },
    publicPath: './'
 
};
