import { createApp } from 'vue'
// import Vant from 'vant'
import 'vant/lib/index.css'
import App from './App.vue'
import router from './router';
// import VueAMap from 'vue-amap';
// import wx from 'weixin-js-sdk';

const app=createApp(App);
// app.use(VueAMap);

// app.use(Vant)
app.use(router)
// window.onload = () => {
//     // 确保微信 JS SDK 加载完成后再配置
//     if (typeof wx !== 'undefined') {
//       configureWeChat();
//     } else {
//       console.error('微信 SDK 加载失败');
//     }
  
//     app.mount('#app');
//   };
// 配置微信 JS SDK
// function configureWeChat() {
//     const appId = 'yourAppId'; // 替换为你的 appId
//     const timestamp = 'timestamp'; // 替换为生成的时间戳
//     const nonceStr = 'nonceStr'; // 替换为生成的随机字符串
//     const signature = 'signature'; // 替换为生成的签名

  
//     wx.config({
//       debug: true, // 是否开启调试模式
//       appId: appId, // 公众号的唯一标识
//       timestamp: timestamp, // 时间戳
//       nonceStr: nonceStr, // 随机字符串
//       signature: signature, // 签名
//       jsApiList: ['getLocation', 'openLocation', 'scanQRCode'] // 配置需要调用的微信 JS API
//     });
  
//     wx.ready(function () {
//       console.log('微信 SDK 配置成功');
//       wx.getLocation({
//         type: 'wgs84', // 返回 GPS 坐标
//         success: function (res) {
//           console.log('定位成功:', res);
//           console.log('纬度:', res.latitude);
//           console.log('经度:', res.longitude);
//           // res.latitude, res.longitude
//         },
//         fail: function (error) {
//           console.error('定位失败:', error);
//         }
//       });
//     });
  
//     wx.error(function (res) {
//       console.error('微信 SDK 配置失败:', res);
//     });
//   }

//   configureWeChat();


app.mount('#app')
