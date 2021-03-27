import AV from 'leancloud-storage'
import { Toast } from 'vant'
export default function (state, tableName) {
  const updateList = async () => {
    console.log(`updateList---`, tableName)
    try {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
      })
      const query = new AV.Query(tableName)
      const res = await query.find()
      const tempList = []
      state.list = []
      res.forEach((el) => {
        el.attributes.id = el.id
        el.attributes.createdAt = el.createdAt
        el.attributes.updatedAt = el.updatedAt
        state.list.push(el.attributes)
        tempList.push({
          name: el.attributes.name,
          money: el.attributes.money,
        })
      })
      setTimeout(() => {
        Toast.clear()
        state.loading = false
      }, 500)
    } catch (error) {
      console.log(`error`, error)
    }
  }
  const onRefresh = () => {
    updateList()
  }
  return { updateList, onRefresh }
}
