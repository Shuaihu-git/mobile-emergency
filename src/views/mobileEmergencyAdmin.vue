<template>
  <div class="log-manager">
    <h1>救援日志管理</h1>
    <div class="notification" v-if="newLogCount > 0">
      新增 {{ newLogCount }} 条日志
    </div>
    <ul class="log-list">
      <li v-for="(log, index) in logs" :key="index">
        {{ log }}
      </li>
    </ul>
  </div>
      <!-- <h1>救援请求日志管理</h1>
    <div class="log-list">
      <div v-for="(log, index) in logs" :key="index" class="log-item">
        {{ log }}
      </div>
    </div> -->
    <!-- 悬浮消息组件 -->
    <!-- <FloatingNotification :newLogs="newLogsCount" @acknowledge="resetNewLogsCount" /> --> 
  <!-- </div> -->
</template>

<script>
// import FloatingNotification from "../views/FloatingNotification.vue";

export default {
  components: {
    // FloatingNotification,
  },
  data() {
    return {
      logs: [
      ],
      newLogsCount: 0, // 新日志数量
    };
  },
  methods: {
    connectWebSocket() {
      // 创建 WebSocket 连接
      this.socket = new WebSocket("ws://localhost:9000/websocket/admin");

      // WebSocket 连接成功
      this.socket.onopen = () => {
        console.log("WebSocket 已连接");
      };

      // 接收消息
      this.socket.onmessage = (event) => {
        const newLog = event.data;
        this.logs.unshift(newLog); // 新日志添加到列表顶部
        this.newLogCount ++; // 增加新日志计数
      };

      // WebSocket 关闭
      this.socket.onclose = () => {
        console.log("WebSocket 已关闭");
      };

      // WebSocket 错误
      this.socket.onerror = (error) => {
        console.error("WebSocket 错误：", error);
      };
    },
    clearNewLogCount() {
      // 清空新日志计数
      this.newLogCount = 0;
    },
    /**
     * 模拟接收实时日志推送（例如通过 WebSocket 接入）。
     */
    simulateNewLog() {
      setInterval(() => {
        new WebSocket().addEventListene;
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
    this.connectWebSocket();

    this.connectWebSocket();

    // 自动清除悬浮通知
    setInterval(() => {
      this.clearNewLogCount();
    }, 5000); // 每 5 秒清空一次
  },

  // this.simulateNewLog();
  beforeMount() {
    // 组件销毁时关闭 WebSocket 连接
    if (this.socket) {
      this.socket.close();
    }
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