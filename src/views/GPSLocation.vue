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
  export default {
    data() {
      return {
        location: null, // 存储位置信息
        error: null,    // 存储错误信息
      };
    },
    methods: {
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