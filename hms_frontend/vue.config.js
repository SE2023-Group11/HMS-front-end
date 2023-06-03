const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,//

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: []
    }
  }

})
chainWebpack: config => {
  config.module
    .rule("html")
    .test(/\.html$/)
    .use("html-loader")
    .loader("html-loader");
}

