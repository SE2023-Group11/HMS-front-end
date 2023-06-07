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
    config.plugin('html').tap(args => {
      args[0].title = '你要更改的标题名称';
      return args;
  })
}


