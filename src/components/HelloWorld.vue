<template>
  <div class="upBtn">
    <transition name="van-fade">
      <van-button v-show="state.visible" round size="small" icon="arrow-up" type="primary" @click="test" />
    </transition>
  </div>
  <van-sticky>
    <header class="header">
      <van-search v-model="state.valueSearch" show-action shape="round" placeholder="请输入搜索关键词">
        <template #action></template>
      </van-search>
      <van-dropdown-menu @change="dropdownChange" active-color="#1989fa">
        <van-dropdown-item v-model="state.valueSort" :options="optionSort" />
      </van-dropdown-menu>
      <van-cell :title="totalPeople">
        <template #right-icon>
          <span>{{ totalAmount }}</span>
          <van-icon @click="state.showEye = !state.showEye" v-if="state.showEye" name="closed-eye" size="25" />
          <van-icon @click="state.showEye = !state.showEye" v-else name="eye" size="25" />
        </template>
      </van-cell>
    </header>
  </van-sticky>
  <van-pull-refresh v-model="state.loading" @refresh="onRefresh">
    <main class="main">
      <van-swipe-cell v-for="v in searchData" :key="v.id">
        <van-cell :value="state.showEye ? '****' : v.money">
          <template #title>
            <div class="title">
              <div class="name">
                <span>{{ v.name }}</span>
              </div>
              <van-tag v-for="(item, index) in v.label" :key="index" class="m-r-5" size="medium" round type="primary">{{ item }}</van-tag>
            </div>
          </template>
        </van-cell>
        <template #right>
          <van-button square type="primary" text="编辑" @click="editFun(v)" />
          <van-button square type="danger" text="删除" @click="deleteFun(v.id)" />
        </template>
      </van-swipe-cell>
    </main>
  </van-pull-refresh>
  <footer class="footer">
    <van-tabbar>
      <van-tabbar-item>
        <template #icon>
          <van-button round size="small" icon="plus" type="primary" @click="newFun">记一笔</van-button>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </footer>
  <van-popup v-if="state.show" v-model:show="state.show" round :style="{ width: '80%', height: 'auto' }">
    <div class="content">
      <van-form @submit="onSubmit">
        <van-field v-model="state.form.name" label="姓名" name="name" placeholder="姓名" :rules="[{ required: true, message: '请填写姓名' }]" />
        <van-field v-model.number="state.form.money" label="金额" name="money" placeholder="金额" :rules="[{ required: true, message: '请填写金额' }]" />
        <van-field name="checkboxGroup" label="标签（非必填）">
          <template #input>
            <van-checkbox-group v-model="state.form.label" direction="horizontal">
              <van-checkbox class="p-b-10" name="亲戚" shape="square">亲戚</van-checkbox>
              <van-checkbox class="p-b-10" name="朋友" shape="square">朋友</van-checkbox>
              <van-checkbox class="p-b-10" name="同事" shape="square">同事</van-checkbox>
            </van-checkbox-group>
          </template>
        </van-field>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit"> 提交 </van-button>
        </div>
      </van-form>
    </div>
  </van-popup>
</template>

<script setup>
import { reactive, computed, onMounted, onUnmounted, defineProps } from 'vue'
import useInquire from './Inquire'
import useOperating from './Operating'
const props = defineProps({
  TableName: String,
  sort: Number,
})
console.log(`props`, props.TableName)
const state = reactive({
  valueSearch: '',
  isAdd: false,
  visible: false,
  loading: false,
  show: false,
  showEye: false,
  list: [],
  form: {},
  valueSort: props.sort,
})

const optionSort = [
  { text: '默认排序', value: 0 },
  { text: '金额排序', value: 1 },
]

onMounted(() => {
  window.addEventListener('scroll', scrollToTop)
  scrollToTop()
  updateList()
})
onUnmounted(() => {
  window.removeEventListener('scroll', scrollToTop)
})
const dropdownChange = (val) => {
  console.log(`val`, val)
}

const test = (e) => {
  window.scrollTo(0, 0)
}
const scrollToTop = (el) => {
  let topBtn = document.getElementById('to-top-btn')
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  let browserHeight = window.outerHeight
  if (scrollTop > browserHeight / 3) {
    state.visible = true
  } else {
    state.visible = false
  }
}
// 更新列表数据
const { updateList, onRefresh } = useInquire(state, props.TableName)

const { newFun, addFun, onSubmit, editFun, updateFun, deleteFun } = useOperating(state, updateList, props.TableName)

const searchData = computed(() => {
  if (state.valueSearch === '' && state.valueSort === 0) {
    return state.list.sort((x, y) => {
      return x['name'].localeCompare(y['name'])
    })
  } else if (state.valueSearch === '' && state.valueSort === 1) {
    return state.list.sort((x, y) => {
      return y.money - x.money
    })
  } else {
    return state.list.filter((el) => {
      return el.name === state.valueSearch || el.pinyin === state.valueSearch || el.initials === state.valueSearch || isText(el.name)
    })
  }
})
const totalPeople = computed(() => {
  return '总人数：' + state.list.length
})
const totalAmount = computed(() => {
  let tempAmount = 0
  state.list.forEach((el) => {
    tempAmount += el.money
  })
  return +state.showEye ? '总金额：****' : '总金额：' + Number(tempAmount).toLocaleString('en-US')
})
// 模糊搜索判断
const isText = (val) => {
  let flag = false
  for (let i = 0; i < [...val].length; i++) {
    const el = [...val][i]
    if (el === state.valueSearch) {
      flag = true
      break
    }
  }
  return flag
}
</script>

<style lang="less" scoped>
.header {
  margin-bottom: 10px;
}
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.search {
  margin-left: 10px;
}
.content {
  padding: 20px 20px 10px 20px;
}
.upBtn1 {
  position: fixed;
  bottom: 80px;
  right: 50px;
  z-index: 1900;
}
.upBtn {
  position: fixed;
  bottom: 80px;
  right: 50px;
  z-index: 1900;
}
.footer {
  height: 50px;
}
.p-b-10 {
  padding-bottom: 10px;
}
.m-r-5 {
  margin-right: 5px;
  width: 25px;
  // text-align: center;
}
.title {
  display: flex;
  align-items: center;
  text-align: center;
}
.title .name {
  width: 60px;
  text-align: justify;
}
</style>
