<template>
  <header class="header">
    <div class="img">
      <img :src="imgs[index].suprizeUrl" alt="" />
    </div>
  </header>
  <!-- 密码输入框 -->
  <van-password-input :value="value" :focused="showKeyboard" @focus="showKeyboard = true" />
  <!-- 数字键盘 -->
  <van-number-keyboard v-model="value" :show="showKeyboard" @blur="showKeyboard = false" />
</template>

<script setup>
import { ref, watch, defineEmit, useContext } from 'vue'
import suprizeUrl1 from '../../assets/白露.png'
import suprizeUrl2 from '../../assets/春分.png'
import suprizeUrl3 from '../../assets/大寒.png'
import suprizeUrl4 from '../../assets/立春.png'
import suprizeUrl5 from '../../assets/芒种.png'
import suprizeUrl6 from '../../assets/小满.png'
import suprizeUrl7 from '../../assets/秋分.png'
import suprizeUrl8 from '../../assets/小雪.png'
import suprizeUrl9 from '../../assets/小暑.png'
const imgs = {
  0: {
    suprizeUrl: suprizeUrl1,
  },
  1: {
    suprizeUrl: suprizeUrl1,
  },
  2: {
    suprizeUrl: suprizeUrl2,
  },
  3: {
    suprizeUrl: suprizeUrl3,
  },
  4: {
    suprizeUrl: suprizeUrl4,
  },
  5: {
    suprizeUrl: suprizeUrl5,
  },
  6: {
    suprizeUrl: suprizeUrl6,
  },
  7: {
    suprizeUrl: suprizeUrl7,
  },
  8: {
    suprizeUrl: suprizeUrl8,
  },
  9: {
    suprizeUrl: suprizeUrl9,
  },
}
// 获取上下文  相当于 vue2 this
const ctx = useContext()
// emit
defineEmit(['TableNameFun'])
// ref 定义单个响应式数据
// 注意: 使用ref定义的数据,需要使用.value 来获取。 例如下面watch  value.value
const index = ref(Math.floor(Math.random() * 9))
const value = ref('')
const showKeyboard = ref(true)
// 监听
watch(
  () => value.value,
  (newValue, oldValue) => {
    if (newValue === '000000') {
      ctx.emit('TableNameFun', 'GiftMoneyList', 1)
    }
    if (newValue === '111111') {
      ctx.emit('TableNameFun', 'GiftMoneyList2', 0)
    }
    if (newValue === '222222') {
      ctx.emit('TableNameFun', 'GiftMoneyList3', 0)
    }
  }
)
</script>

<style lang="less" scoped>
.header {
  padding: 50px 0;
  .img {
    text-align: center;
  }
  .title {
    color: #2c3e50;
    padding: 10px 20px;
    padding-left: 20px;
    font-size: 30px;
    line-height: 40px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    font-variant: tabular-nums;
  }
}
</style>
