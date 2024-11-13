const axios = require('axios');
const crypto = require('crypto');

const appId = 'wxb30aa6242a733844';  // 你的微信 appId
const appSecret = '4dd53c4e698319939d16be0ad906f364';  // 你的微信 appSecret
const apiUrl = 'https://your-backend.com/get-signature';  // Vue 前端请求的接口

// 获取 access_token
async function getAccessToken() {
  const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`;
  const response = await axios.get(url);
  return response.data.access_token;
}

// 获取 jsapi_ticket
async function getJsapiTicket(access_token) {
  const url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`;
  const response = await axios.get(url);
  return response.data.ticket;
}

// 生成签名
function generateSignature(jsapi_ticket, nonce_str, timestamp, url) {
  const string = `jsapi_ticket=${jsapi_ticket}&noncestr=${nonce_str}&timestamp=${timestamp}&url=${url}`;
  return crypto.createHash('sha1').update(string).digest('hex');
}

// 后端接口处理
async function getWeChatConfig(req, res) {
  try {
    const access_token = await getAccessToken();
    const jsapi_ticket = await getJsapiTicket(access_token);

    // 获取当前的 URL
    const url = req.body.url || req.headers.referer; // 获取当前页面的 URL

    const timestamp = Math.floor(Date.now() / 1000);  // 当前时间戳
    const nonce_str = Math.random().toString(36).substring(2, 15);  // 随机字符串

    const signature = generateSignature(jsapi_ticket, nonce_str, timestamp, url);

    // 返回配置给前端
    res.json({
      appId,
      timestamp,
      nonceStr: nonce_str,
      signature,
    });
  } catch (error) {
    console.error('获取微信配置失败:', error);
    res.status(500).send('获取微信配置失败');
  }
}

// Express.js 示例
const express = require('express');
const app = express();
app.use(express.json());

app.post('/get-wechat-config', getWeChatConfig);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
