<template>
    <div class="realtime-alerts">
      <!-- 标题部分 -->
      <div class="header">
        <h3>实时告警（{{ alerts.length }} 条待处理）</h3>
        <a href="#" class="more-link">更多</a>
      </div>
      <!-- 告警列表 -->
      <ul class="alerts-list">
        <li v-for="alert in alerts" :key="alert.id" class="alert-item">
          <div class="alert-info">
            <p>{{ alert.location }}处发生{{ alert.event }}</p>
            <span class="time">{{ alert.time }}</span>
          </div>
          <div class="alert-status">
            <span class="status-dot"></span>
            <span class="status">{{ alert.status }}</span>
            <a href="#" class="action-link">去处理</a>
          </div>
        </li>
      </ul>
    </div>
  </template>

  <script>
export default {
  data() {
    return {
      alerts: [],
    };
  },
  mounted() {
    // 模拟获取数据
    this.fetchAlerts();
  },
  methods: {
    fetchAlerts() {
      // 模拟 API 数据加载
      this.alerts = [
        {
          id: 1,
          location: '宁沪高速桩号k100+000',
          event: '扫码事件',
          time: '2020-12-23 22:31:00',
          status: '待处理',
        },
        {
          id: 2,
          location: '宁沪高速桩号k100+000',
          event: '扫码事件',
          time: '2020-12-23 22:31:00',
          status: '待处理',
        },
      ];
    },
  },
};
</script>
<style scoped>
.realtime-alerts {
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.alerts-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.alert-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.alert-info {
  max-width: 70%;
}

.time {
  color: #888;
  font-size: 12px;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: red;
  border-radius: 50%;
  display: inline-block;
  margin-right: 4px;
}

.action-link {
  color: #007bff;
  text-decoration: none;
  font-size: 14px;
}
</style>
