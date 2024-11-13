import { createRouter, createWebHistory } from 'vue-router';
// import HomePage from '../views/HomePage.vue';
import mobileEmergency from '../views/mobileEmergency.vue';
import QrCodeGenerator from '../views/QrCodeGenerator.vue';
import ZhiNan from '@/views/ZhiNan.vue';
import GPSLocation from '@/views/GPSLocation.vue';

const routes = [
  {
    path: '/',
    redirect: '/未知'
  },
  {
    // path: '/:adress/:mobile',
    path: '/:adress',
    name: 'mobileEmergency',
    component: mobileEmergency,
    props: true,
  },
  {
    path: '/zhinan',
    name: 'ZhiNan',
    component: ZhiNan,
  },
  {
    path: '/qrcode/:content(.*)', // 路由路径包含参数 :content
    name: 'QrCodeGenerator',
    component: QrCodeGenerator,
    props: true, // 将路由参数作为属性传递给组件
  },
  {
    path: '/location', // 路由路径包含参数 :content
    name: 'GPSLocation',
    component: GPSLocation,
    props: true, // 将路由参数作为属性传递给组件
  },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        // 返回时恢复之前的滚动位置
        return savedPosition;
      } else if (to.hash) {
        // 如果路由中有 hash 锚点，滚动到锚点位置
        return { selector: to.hash };
      } else {
        // 否则滚动到页面顶部
        return { x: 0, y: 0 };
      }
    },
  });
  // 前置钩子，用于拦截路由跳转
  router.beforeEach((to, from, next) => {
    // 从路由参数中获取 content
    const content = to.params.content;
  
    if (content) {
      try {
        // 尝试解码 content 参数
        const decodedContent = decodeURIComponent(content);
        console.log('Decoded content:', decodedContent);  // 输出: "https://www.baidu.com"
  
        // 检查 content 是否为一个有效的 URL（可选）
        const urlPattern = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
        if (urlPattern.test(decodedContent)) {
          next();  // 如果是有效 URL，继续路由跳转
        } else {
          console.error('Invalid URL format:', decodedContent);
          next({ name: 'ErrorPage' });  // 如果不是有效 URL，跳转到错误页面
        }
      } catch (error) {
        console.error('Error decoding URL:', error);
        next({ name: 'ErrorPage' });  // 如果解码失败，跳转到错误页面
      }
    } else {
      next();  // 如果没有 content 参数，继续跳转
    }
  });
export default router;