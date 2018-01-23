import {Confirm, Alert, Toast, Loading, Notify} from 'vue-ydui/dist/lib.rem/dialog'
import Modal from 'iview/src/components/checkbox'

export {Modal as modal}
export {Alert as alert}
export {Toast as toast}
export {Confirm as confirm}
export {Notify as notify}

export function loading(msg = '玩命加载中', delay = 2000) {
  // wx.showToast({
  //   title: msg || ,
  //   icon: 'loading',
  //   mask: true,
  //   duration: 10000
  // })
  Loading.open(msg)
  hideLoading(delay)
}

// export const hideLoading = Loading.close
export function hideLoading(delay = 0) {
  setTimeout(Loading.close, delay)
}

export function tips(msg = '没有提示的提示', timeout = 1500) {
  Toast({
    mes: msg,
    timeout
  })
}