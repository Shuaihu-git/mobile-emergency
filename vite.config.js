import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';  // 引入 Vue 插件

export default defineConfig({
    base: '/',  // 配置部署路径，默认是根目录
    plugins: [],  // 配置插件（如 Vue 插件等）
    server: {
      port: 8080,  // 设置开发服务器端口
      open: true,   // 启动时自动打开浏览器
    },
    build: {
      outDir: 'dist',  // 配置构建后的输出目录
    },
  plugins: [vue()],  // 使用 Vue 插件
});
