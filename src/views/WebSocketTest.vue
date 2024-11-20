<template>
    <div>
      <h1>WebSocket 示例</h1>
      <p>收到的消息：{{ message }}</p>
      <input v-model="inputMessage" placeholder="发送消息" />
      <button @click="sendMessage">发送消息</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        socket: null, // WebSocket 实例
        message: '', // 收到的消息
        inputMessage: '', // 待发送的消息
      };
    },
    methods: {
      connectWebSocket() {
        // 建立 WebSocket 连接
        this.socket = new WebSocket('ws://localhost:9000/websocket/client');
  
        // 连接打开时触发
        this.socket.onopen = () => {
          console.log('WebSocket 已连接');
        };
  
        // 接收消息时触发
        this.socket.onmessage = (event) => {
          console.log('收到消息：', event.data);
          this.message = event.data;
        };
  
        // 连接关闭时触发
        this.socket.onclose = () => {
          console.log('WebSocket 已关闭');
        };
  
        // 连接出错时触发
        this.socket.onerror = (error) => {
          console.error('WebSocket 错误：', error);
        };
      },
      sendMessage() {
        // 发送消息
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
          this.socket.send(this.inputMessage);
          this.inputMessage = ''; // 清空输入框
        } else {
          console.error('WebSocket 未连接');
        }
      },
    },
    mounted() {
      // 在组件挂载时连接 WebSocket
      this.connectWebSocket();
    },
    beforeUnmount() {
      // 在组件销毁时关闭 WebSocket
      if (this.socket) {
        this.socket.close();
      }
    },
  };
  </script>
  
  <style scoped>
  h1 {
    color: #007bff;
  }
  button {
    margin-top: 10px;
    padding: 8px 16px;
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
  