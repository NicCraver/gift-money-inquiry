import { createApp } from 'vue'
import App from './App.vue'
import AV from 'leancloud-storage'
import Vant from 'vant'
import 'vant/lib/index.css'

const app = createApp(App)

// leancloud-storage 初始化
AV.init({
  appId: 'Ogxo701Gmazmorp5nQovO0LE-gzGzoHsz',
  appKey: 'yRSPGVk0Pgo8SOXBSGv0nW5W',
  serverURL: 'https://ogxo701g.lc-cn-n1-shared.com',
})

app.use(Vant)
app.mount('#app')
