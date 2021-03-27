import AV from 'leancloud-storage'
import usePinYin from './pinyin'
import { Dialog, Toast, Notify } from 'vant'
export default function (state, Callback, tableName) {
  // 初始化数据库表
  const GiftMoneyList = AV.Object.extend(tableName)
  // 新增  弹窗、初始化
  const newFun = () => {
    state.show = true
    state.isAdd = true
    state.form = {}
  }
  // 新增请求
  const addFun = () => {
    const list = new GiftMoneyList()
    // 判断是否有重复值
    let flag = false
    state.list.forEach((el) => {
      if (el.name === state.form.name) {
        Notify('姓名重复')
        flag = true
      }
    })
    if (flag) {
      return
    }
    // 赋值
    for (const key in state.form) {
      if (Object.hasOwnProperty.call(state.form, key)) {
        const el = state.form[key]
        // console.log(`el`, el)
        list.set(key, el)
      }
    }
    list.save().then((res) => {
      Notify({ type: 'success', message: '保存成功!' })
      // console.log(`保存成功---`, res)
      state.show = false
      state.form = {}
      // console.log(`state.form-----`, state.form)
      Callback()
    })
  }
  // 提交
  const onSubmit = (values) => {
    // console.log('submit', values)
    if (values) {
      const { pinyin, initials } = usePinYin(values.name)
      state.form.pinyin = pinyin
      state.form.initials = initials
      if (state.isAdd) {
        addFun()
      } else {
        updateFun()
      }
    }
  }
  // 编辑
  const editFun = (row) => {
    state.form = {}
    // console.log(`editFun`, row)
    state.show = true
    state.isAdd = false
    for (const key in row) {
      if (Object.hasOwnProperty.call(row, key)) {
        const el = row[key]
        state.form[key] = el
      }
    }
    // console.log(`editFun --- state.form`, state.form)
  }
  // 更新方法
  const updateFun = () => {
    // console.log(`state.form--`, state.form)
    const editTemp = AV.Object.createWithoutData(tableName, state.form.id)
    editTemp.set('name', state.form.name)
    editTemp.set('money', state.form.money)
    editTemp.set('label', state.form.label)
    editTemp.save().then((res) => {
      Notify({ type: 'success', message: '保存成功!' })
      state.show = false
      state.form = {}
      Callback()
    })
  }
  // 删除
  const deleteFun = (id) => {
    // console.log(`deleteFun`)
    Dialog.confirm({
      title: '删除',
      message: '确认删除吗',
    }).then(() => {
      const tempDel = AV.Object.createWithoutData(tableName, id)
      tempDel.destroy().then((res) => {
        Notify({ type: 'success', message: '删除成功!' })
        Callback()
      })
    })
  }
  return { newFun, addFun, onSubmit, editFun, updateFun, deleteFun }
}
