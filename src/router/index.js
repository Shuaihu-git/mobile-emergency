import { createRouter, createWebHistory } from 'vue-router';
// import HomePage from '../views/HomePage.vue';
import mobileEmergency from '../views/mobileEmergency.vue';
import QrCodeGenerator from '../views/QrCodeGenerator.vue';
import ZhiNan from '@/views/ZhiNan.vue';
import GPSLocation from '@/views/GPSLocation.vue';
import NewMoblieEmergency from '@/views/newMoblieEmergency.vue';
import newZhiNan from '@/views/newZhiNan.vue';
import mobileEmergencyAdmin from '@/views/mobileEmergencyAdmin.vue';
import WebSocketTest from '@/views/WebSocketTest.vue';
import MBBar from '@/views/MBBar.vue';
const routes = [
  {
    path: '/',
    redirect: '/roadside/未知'
  },
  {
    // path: '/:adress/:mobile',
    path: '/:adress',
    name: 'mobileEmergency',
    component: mobileEmergency,
    props: true,
  },
  {
    path: '/zhinan/:address',
    name: 'ZhiNan',
    component: ZhiNan,
    props: true,
  },
  {
    path: '/roadside/:number',
    name: 'NewMoblieEmergency',
    component: NewMoblieEmergency,
    props: true,
  },
  {
    path: '/roadside/zhinan/:number',
    name: 'newZhiNan',
    component: newZhiNan,
    props: true,
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
  {
    path: '/admin', // 路由路径包含参数 :content
    name: 'mobileEmergencyAdmin',
    component: mobileEmergencyAdmin,
    props: true, // 将路由参数作为属性传递给组件
  },
  {
    path: '/ws', // 路由路径包含参数 :content
    name: 'WebSocketTest',
    component: WebSocketTest,
    props: true, // 将路由参数作为属性传递给组件
  },
  {
    path: '/mb',
    name: 'MBBar',
    component: MBBar,
    props: true,
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
