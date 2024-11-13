<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="ConsumerModal">
      <button @click="closeModal" class="close-btn"></button>
      <h2 class="title">救援请求已发送</h2>
      <p class="content">请移动至安全位置</p>
      <button class="call-btn" @click="makeCall(this.content)">拨打电话</button>
      <button class="wait-btn" @click="closeModal">等待救援</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppModal',
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit('close'); // 向父组件发送关闭事件
    },
    makeCall(mangeMoblie) {
      // 设置拨打电话的链接
      window.location.href = "tel:" + mangeMoblie;
    },
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.ConsumerModal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
}

.content {
  margin-top: 10px;
  margin-left: 10px;
  font-size: 16px;
  color: black;
  font-family: '宋体';
}

.title {
  margin-top: auto;
  margin-left: 10px;
  font-size: 20px;
  color: red;
  font-family: '宋体';
}

.call-btn {
  margin-top: 10px;
  margin-right: 40%;
  left: 10px;
  border-radius: 5%;
  border: none;
  outline: none;
  color: white;
  background-color: green;
}

.close-btn {
  position: absolute;
  margin-left: 10px;
  margin-right: 20px;
  top: 10px;
  right: 10px;
  background-color: blueviolet;
  border: none;
  border-radius: 8px;
  background: transparent;
  font-size: 20px;
  cursor: pointer;
  font-family: '宋体';
}

.wait-btn {
  left: 10px;
  border-radius: 5%;
  border: none;
  outline: none;
  color: white;
  background-color: blueviolet;
}
</style>