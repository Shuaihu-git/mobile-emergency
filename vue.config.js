const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/get-wechat-config': {
        target: 'http://localhost:3000',  // 后端服务器地址
        changeOrigin: true,
        pathRewrite: {
          '^/get-wechat-config': '/get-wechat-config',  // 重写路径
        },
      },
    },
  },
})
