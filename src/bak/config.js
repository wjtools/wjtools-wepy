import env from './env'
import {getParam} from './location'
import {session} from './storage'

// 公众号标识：1 - 嗒嗒巴士；2 - 嗒嗒出行

export let wxid = getParam('wxid') || session('ddb_wxid')
export let paywxid = env.name === 'release' ? 2 : 1 // 支付账号对应的公众号标识
wxid = Number(wxid) || paywxid

// 根据 wxid 获取对应公众号 appid
export let appids = ['wx72a2b17c7ed41fe8', 'wxfeb03a6635e532d7']
switch (env.name) {
  case 'dev': // 本地/开发环境
    appids = ['wx54125ac4cf97185c', 'wx4b8eb0210ac3804a']
    break
  case 'test': // 测试环境
    appids = ['wx72a2b17c7ed41fe8', 'wx4b8eb0210ac3804a']
    break
}
export let appid = appids[wxid - 1]

// 如果公众号标识异常，则设为支付账号对应的公众号
if (!appid) {
  wxid = paywxid
  appid = appids[wxid - 1]
}

export default {
  version: '3.2.1',
  env: env.name,
  wxid,
  paywxid,
  appids,
  appid,
  amapkey: '4db5c9cbc5c7fb94d683badc86ec04fc',
  // api: 'http://' + env.sld + 'borrow.api.dadabus.com/',
  api: 'http://localhost:8000/',
  wxapi: 'http://' + env.host + '/app/api?parames='
}
