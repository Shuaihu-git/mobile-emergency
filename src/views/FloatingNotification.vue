<template>
    <div v-if="newLogs > 0" class="floating-notification" @click="acknowledge">
      收到 {{ newLogs }} 条新的救援请求日志，点击查看！
    </div>
  </template>
  
  <script>
  export default {
    props: {
      newLogs: {
        type: Number,
        required: true,
      },
    },
    methods: {
      /**
       * 通知父组件已确认查看新日志。
       */
      acknowledge() {
        this.$emit("acknowledge");
      },
    },
  };
  </script>
  
  <style scoped>
  .floating-notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #ff9800;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    animation: bounce 1.5s infinite;
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
  </style>
  