import { registerSW } from 'virtual:pwa-register'

registerSW({
  immediate: true,
  onRegisteredSW(swScriptUrl) {
    console.log('SW registered: ', swScriptUrl)
  },
  onOfflineReady() {
    console.log('PWA application ready to work offline')
  },
  onNeedRefresh() {
    console.log('PWA needs refresh')
  },
  onRegisterError(error) {
    console.error('SW registration error', error)
  },
})
