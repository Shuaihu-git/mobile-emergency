<template>
    <!-- <GMap ref="mapRef"></GMap> -->
    <div class="qrcode-container">
      
      <div class="header-container"  @touchstart="handleTouchStart"  @touchmove="handleTouchMove"  @scroll="handleScroll" @click="handleScroll"> 
        <img src="../assets/01-down.png" alt="Image" class="down-img">
        <span class="header-text">下滑查看事故处置指南</span> 
    </div>
      <div class="image-row">
        <img v-for="(image, index) in images" :key="index" :src="image" alt="Image" class="image-item" />
      </div>
      <p class="ps">无锡段一路三方温馨提示：</p>
      <p class="header">车能移动 先靠至应急车道 <br>车无法移动 人撤至最近护栏外</p>
      <p class="address">当前桩号<span class="address-detail"><br>{{ address }}</span></p>
      <!-- <button @click="showMap">显示地图</button> -->
      <div class="btn-container">
        <button class="btn" @click="makeCall1"><i class="fas fa-phone icon"></i>快速救援电话1<br>({{ mangeMoblie1 }})</button>
        <!-- <AppModal :isVisible="isModalVisible" :content="modalContent" @close="closeModal" /> -->
      </div>
      <div class="mangeMoblie-container">
        <button class="mangeMoblie" @click="makeCall2"><i class="fas fa-phone icon"></i>快速救援电话2<br>({{ mangeMoblie2 }})</button>
        <!-- <p class="mangeMoblie" @click="makeCall">拨打管理中心电话({{ mangeMoblie }})</p> -->
      </div>
      
    </div>
  
  
  
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    props: {
        number: {
        type: String,
        required: true,
      },
      mobile: {
        type: String,
        required: false,
      },
    },
    mounted() {
        console.log(this.number);
      // 添加滚动监听器
      window.addEventListener("scroll", this.handleScroll);
    },
    beforeUnmount() {
      // 组件销毁时移除监听器
      window.removeEventListener("scroll", this.handleScroll);
    },
    data() {
      return {
        address: this.number,
        // 二维码内容
        mangeMoblie: this.mobile,
        mangeMoblie1: '0510-88259900',
        mangeMoblie2: '0510-81810110',
        isModalVisible: false,
        showNextPage: false,
        modalContent: '',
        touchStartY: 0,  // 记录触摸开始时的 Y 坐标
        isScrollingDown: false,  // 是否正在下滑
        images: [
          require("../assets/RescueEmblem.png"),
          require("../assets/xingzheng.png"),
          require("../assets/RodeRescue.png"),
        ]
      };
    },
    setup() {
      const mapRef = ref(null);
      return {
        mapRef,
      };
    },
    methods: {
      showMap() {
        this.mapRef.value.open()
      },
      makeCall1() {
        // 设置拨打电话的链接
        window.location.href = "tel:" + this.mangeMoblie1;
      },
      makeCall2() {
        // 设置拨打电话的链接
        window.location.href = "tel:" + this.mangeMoblie2;
      },
      clickRescue() {
        //显示子页面 居中显示救援请求已发送请移动至安全位置等待救援 左按钮 拨打电话 右按钮 等待救援
        alert("救援请求已发送请移动至安全位置等待救援");
      },
      openModal(content) {
        this.modalContent = content;
        this.isModalVisible = true; // 打开对话框
      },
      handleTouchStart(event) {
        // 记录触摸开始的位置
        this.touchStartY = event.touches[0].clientY;
        this.isScrollingDown = false; // 初始化为不在下滑
      },
      handleTouchMove(event) {
        const touchEndY = event.touches[0].clientY;
      // 检查是否是从顶部下滑
        if (touchEndY - this.touchStartY > 0) {
          this.isScrollingDown = true;
          this.openNewPage(); // 使用 vue-router 跳转到下一个页面
        }
      },
      closeModal() {
        this.isModalVisible = false; // 关闭对话框
      },
      handleScroll(event) {
        const scrollTop = event.target.scrollTop;
        const clientHeight = event.target.clientHeight;
        const scrollHeight = event.target.scrollHeight;
         // 判断是否滑动到底部
         if (scrollTop + clientHeight >= scrollHeight - 10) {
          // 页面跳转到下一个页面
          this.openNewPage();
        
        }
      },
      openNewPage() {
        this.$router.push('/new/zhinan/'+this.number)// 打开内部新页面
      }
    }
  };
  </script>
  
  <style scoped>
  @import '~@fortawesome/fontawesome-free/css/all.min.css';
  .icon {
    margin-right: 8px;
  }
  .down-img{
    margin-top: 1%;
    width: 30px;
  }
  .header-container{
    /* margin-top: 10px; */
    /* z-index: -1;
    bottom: 0;
    background-color: #4a90e2;
    clip-path: polygon(50% 100%, 0% 0%, 100% 0%);  */
    /* background-image: url(""); */
    /* position: relative;
    justify-content: center;
    align-items: center;
    height: 8%; */
    display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  
  }
  .header-text{
    font-family: '宋体';
    margin-top: 5%;
    
    font-weight: bold;
    text-shadow: 2px 2px 10px rgb(125, 75, 75);
    font-size: 20px;
    color: white;
    margin-bottom: 20%;
  }
  .ps{
    font-family: '宋体';
    margin-top: 3%;
    font-weight: bold;
    color: white;
    font-size: 20px;
    background-image: url("../assets/01-ps.png");
    text-shadow: 2px 2px 10px rgba(0, 0, 0, 1);
  }
  .qrcode-container {
    position: fixed;
    /* 让 div 固定在视口上 */
    top: 0;
    /* 距视口顶部 0 */
    left: 0;
    /* display: flex; */
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-image: url("../assets/01-bg.png");
    background-size: cover;
    /* 背景图覆盖整个容器 */
    background-position: center;
    /* 背景图居中显示 */
    background-repeat: no-repeat;
  }
  .header{
    width: 85%;
    height: 10%;
    margin-left: 2%;
    font-family: '宋体';
    margin-top: 5%;
    font-weight: bold;
    /* 设置加粗 */
    color: black;
    /* 设置颜色 */
    font-size: 22px;
    display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
    background-image: url("../assets/01-content.png");
    background-size: auto;
    /* 背景图覆盖整个容器 */
    background-position: center;
    /* text-shadow: 3px 3px 10px rgb(252, 252, 252); */
    text-shadow: 
    -1px -1px 0 #ffffff, /* 左上 */
    1px -1px 0 #ffffff,  /* 右上 */
    -1px 1px 0 #ffffff,  /* 左下 */
    1px 1px 0 #ffffff;   /* 右下 */
    font-weight: bold;
    /* 设置大小 */
    /* -webkit-background-clip: text;  */
  /* background-clip: text; */
     padding: 10px 20px;
     border-radius: 15px; 
  /* display: inline-block; */
  }
  .address-detail {
    font-weight: bold;
    /* 设置加粗 */
    color: #ff5733;
    /* 设置颜色 */
    font-size: 40px;
    /* 设置大小 */
  }
  
  .address {
    font-family: '宋体';
    margin-top: 5%;
    text-shadow: 2px 2px 10px rgba(0, 0, 0, 1);
    font-size: 35px;
    font-weight: bold;
    color: white;
  }
  
  /* .btn{
  
    font-family: '宋体';
    text-align: center;
    margin-top: 50px;
    width: 60%;
    height: 10%;
    font-size: 20px;
    background-color: rgb(220, 19, 19);
    color: aliceblue;
    border-radius: 10px;
    border: none; 
    outline: none; 
  } */
  .btn {
    font-family: '宋体';
    margin-top: 3%;
    font-size: 30px;
    font-weight: bold;
    /* height: 50px; */
    /* width: 70%; */
    color: whitesmoke;
    border-radius: 10px;
    /* background-color: green; */
    background-image: url("../assets/01-btn.png");
    border: none;
    /* 去除边框 */
    outline: none;
    /* 去除按钮获得焦点时的外部轮廓 */
    text-align: center;
    background-color: transparent; /* 背景设为透明 */
  }
  button:hover {
  background-color: rgba(0, 170, 255, 0.1); /* 鼠标悬停时增加浅色背景 */
  color: #00aaff;
}
  
  .mangeMoblie {
    font-family: '宋体';
    margin-top: 50px;
    font-size: 30px;
    color: whitesmoke;
    border-radius: 10px;
    font-weight: bold;
    background-color: transparent;
    background-image: url("../assets/01-btn.png");
    border: none;
    /* 去除边框 */
    outline: none;
    /* 去除按钮获得焦点时的外部轮廓 */
    text-align: center;
  }
  
  image-row {
    margin-top: 50px;
    display: flex;
    justify-content: center;
    /* 可以根据需要调整间距 */
    align-items: center;
    margin-left: auto;
    width: 60%;
    background-color: #ff5733;
    /* 图片垂直居中 */
  }
  .image-row {
    margin-top: 5%;

  }
  
  .image-item {
    margin-top: 5%;
    width: 60px;
    /* 图片的宽度 */
    height: 60px;
    /* 保持图片比例 */
    margin: 0 10px;
    /* 图片之间的间距 */
  }
  /* .phone-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    background-color: black;
    border-radius: 50%;
    margin-right: 8px;
    position: relative;
  }
  
  .phone-icon::before {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    top: 3px;
    left: 3px;
  }
  
  .phone-icon::after {
    content: '';
    display: block;
    width: 2px;
    height: 6px;
    background-color: black;
    position: absolute;
    bottom: -2px;
    left: 7px;
    transform: rotate(45deg);
  } */
  </style>