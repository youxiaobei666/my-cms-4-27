const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        // 要代理的服务器地址
        target: 'http://localhost:3000/',
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
})
