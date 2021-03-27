import pinyinFun from 'js-pinyin'
export default function usePinYin(val) {
  const pinyin = pinyinFun.getFullChars(val).toLowerCase()
  const initials = pinyinFun.getCamelChars(val).toLowerCase()
  return {
    pinyin,
    initials,
  }
}
