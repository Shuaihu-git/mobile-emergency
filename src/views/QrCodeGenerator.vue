<!-- src/views/QrCodeGenerator.vue -->
<template>
    <div class="qrcode-container">
      <h2>二维码生成器</h2>
      <QrcodeVue :value="content" :size="200" />
      <p>二维码内容：{{ content }}</p>
    </div>
  </template>
  
  <script>
  import QrcodeVue from 'qrcode.vue';

  
  export default {
    components: {
      QrcodeVue,
    },
    props:{
        content:{
            type:String,
            required:true
        }
    },
    created() {
    // 解码 URL 参数并保存到组件数据中
    con
    this.decodedContent = decodeURIComponent(this.$route.params.content);
  },
    // props: ['content'], // 接收路由参数 content 作为属性
    // data() {
    //   return {
    //     content: this.content, // 将接收到的参数赋值给 data 中的 content
    //   };
    // }


  };
  </script>
  
  <style scoped>
  .qrcode-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  </style>
  