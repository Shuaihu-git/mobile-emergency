import { createApp } from 'vue'
// import Vant from 'vant'
import 'vant/lib/index.css'
import App from './App.vue'
import router from './router';
// import VueAMap from 'vue-amap';

const app=createApp(App);
// app.use(VueAMap);

// app.use(Vant)
app.use(router)
//     VueAMap.initAMapApiLoader({
//     key: 'ccbe1ab050992d2c47eaef6606410913',
//     plugin: ['AMap.Geolocation'], 
//     v: '1.4.15', 
//   });

app.mount('#app')
