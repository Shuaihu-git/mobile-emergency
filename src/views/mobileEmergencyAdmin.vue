<template>
    <div class="log-manager">
      <h1>救援请求日志管理</h1>
      <div class="log-list">
        <div v-for="(log, index) in logs" :key="index" class="log-item">
          {{ log }}
        </div>
      </div>
      <!-- 悬浮消息组件 -->
      <FloatingNotification
        :newLogs="newLogsCount"
        @acknowledge="resetNewLogsCount"
      />
    </div>
  </template>
  
  <script>
  import FloatingNotification from "../views/FloatingNotification.vue";
  
  export default {
    components: {
      FloatingNotification,
    },
    data() {
      return {
        logs: [
          "K-1536处扫描了该段的救援二维码，请求了救援。",
          "K-1835处扫描了该段的救援二维码，请求了救援。",
        ],
        newLogsCount: 0, // 新日志数量
      };
    },
    methods: {
      /**
       * 模拟接收实时日志推送（例如通过 WebSocket 接入）。
       */
      simulateNewLog() {
        setInterval(() => {
          const newLog = `K-${Math.floor(1000 + Math.random() * 1000)}处扫描了该段的救援二维码，请求了救援。`;
          this.logs.push(newLog);
          this.newLogsCount++;
        }, 5000); // 每隔5秒模拟一条新的日志
      },
      /**
       * 重置新日志计数（当悬浮组件点击后）。
       */
      resetNewLogsCount() {
        this.newLogsCount = 0;
      },
    },
    mounted() {
      this.simulateNewLog();
    },
  };
  </script>
  
  <style scoped>
  .log-manager {
    /* padding: 20px; */
    font-family: Arial, sans-serif;
    background: #f5f5f5;
    min-height: 100vh;
  }
  
  h1 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
  }
  
  .log-list {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 10px;
    max-width: 600px;
    margin: auto;
    overflow-y: auto;
    max-height: 400px;
  }
  
  .log-item {
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
  
  .log-item:last-child {
    border-bottom: none;
  }
  </style>
  