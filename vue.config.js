const { defineConfig } = require('@vue/cli-service')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        // 要代理的服务器地址
        target: 'http://localhost:3001/',
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/api': '',
        },
      },
      '/upload': {
        target: 'http://localhost:3001/',
        changeOrigin: true,
        pathRewrite: {
          '^/upload': '/upload',
        },
      },
    },
  },
  chainWebpack(config) {
    // 设置 svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()
  },
})
