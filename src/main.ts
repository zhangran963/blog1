import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import MyButton from './components/MyButton/index'
import MyInput from './components/MyInput/index'
import MyLoading from './components/MyLoading/index'
import MyToast from './components/MyToast/index'
const app = createApp(App)
app.use(store)
app.use(router)
app.use(MyButton)
app.use(MyInput)
app.use(MyLoading)
app.use(MyToast)

/* 全局属性 */
app.config.globalProperties.foo = 'bar'

/* 处理错误 */
app.config.errorHandler = (err, vm, info) => {
  // 处理错误
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  console.log('全局error:', err, vm, info)
}
/* 处理警告 */
app.config.warnHandler = function (msg, vm, trace) {
  // `trace` 是组件的继承关系追踪
  console.log('全局warn:', msg, vm, trace)
}

app.mount('#app')

window.addEventListener('unhandledrejection', (e: PromiseRejectionEvent) => {
  console.log('window.unhandledrejection: ', e.reason)

  e.preventDefault()
})
