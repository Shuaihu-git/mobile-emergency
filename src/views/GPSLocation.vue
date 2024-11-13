<template>
    <div>
      <h1>定位功能示例</h1>
      <button @click="getLocation">获取位置</button>
      <p v-if="location">
        纬度：{{ location.latitude }} <br />
        经度：{{ location.longitude }}
      </p>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import CryptoJS from 'crypto-js';
  import wx from 'weixin-js-sdk';

  export default {
    data() {
      return {
        location: null, // 存储位置信息
        error: null,    // 存储错误信息
        appId: 'wxb30aa6242a733844', // 替换为你的 appId
      jsapi_ticket: 'O3SMpm8bG7kJnF36aXbe892WaLKN1DE25bnLckpD0-I-MKV8D4qYJ5jJPWRpJkO0F0gk2aUudchL2AXXVSJEfQ', // 替换为你的 jsapi_ticket（后台生成的）
      url: window.location.href.split('#')[0], // 当前页面的 URL
      nonceStr: this.generateNonceStr(), // 随机字符串
      timestamp: Math.floor(Date.now() / 1000), // 时间戳
      signature: '' // 用于存储生成的 signature
      };
    },
    mounted() {
      this.generateSignature();
    },
    methods: {
      // 生成随机字符串
    generateNonceStr(length = 16) {
      let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let str = '';
      for (let i = 0; i < length; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return str;
    },
    // 生成签名
    generateSignature() {
      const { jsapi_ticket, timestamp, nonceStr, url } = this;
      const stringToSign = `jsapi_ticket=${jsapi_ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`;
      
      // 使用 SHA1 算法生成签名
      const signature = CryptoJS.SHA1(stringToSign).toString(CryptoJS.enc.Hex);
      this.signature = signature;
      
      console.log('生成的签名:', signature);

      // 这里你可以把生成的签名传给 wx.config 方法
      this.configureWxSdk();
    },
    // 配置微信 SDK
    configureWxSdk() {
      const { appId, timestamp, nonceStr, signature } = this;
      wx.config({
        debug: false, // 是否开启调试模式
        appId: appId, // 公众号的唯一标识
        timestamp: timestamp, // 时间戳
        nonceStr: nonceStr, // 随机字符串
        signature: signature, // 签名
        jsApiList: ['getLocation', 'openLocation', 'scanQRCode'] // 需要调用的微信 JS API
      });

      wx.ready(function () {
        console.log('微信 SDK 配置成功');
      });

      wx.error(function (res) {
        console.error('微信 SDK 配置失败:', res);
      });
    },
      getLocation() {
        // 检查浏览器是否支持 Geolocation API
        if (navigator.geolocation) {
          console.log("支持定位");
          // 请求用户位置
          navigator.geolocation.getCurrentPosition(
            this.handlePositionSuccess,
            this.handlePositionError,
            {
              enableHighAccuracy: true,  // 提高定位精度
              timeout: 10000,            // 请求超时时间
              maximumAge: 0              // 不使用缓存的位置信息
            }
          );
          console.log("位置地址"+this.location)
        } else {
          this.error = "Geolocation 不被该浏览器支持";
        }
      },
      // 处理定位成功
      handlePositionSuccess(position) {
        this.location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        this.error = null; // 清除之前的错误信息
      },
      // 处理定位失败
      handlePositionError(error) {
        switch(error.code) {
          case error.PERMISSION_DENIED:
            this.error = "用户拒绝了定位请求";
            break;
          case error.POSITION_UNAVAILABLE:
            this.error = "位置信息不可用";
            break;
          case error.TIMEOUT:
            this.error = "请求超时，请重试";
            break;
          default:
            this.error = "未知错误";
            break;
        }
        this.location = null; // 清除之前的位置数据
      }
    }
  };
  </script>
  
  <style>
  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>