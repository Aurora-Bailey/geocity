/* Data controlled by Vue.js used as a global app state. Can be accessed from anywhere, changes to Data.js will update in Vue.js real time.  */
import GlobalSettings from './GlobalSettings'
let Data = {
  version: {
    compatible: GlobalSettings.version.compatible,
    micro: GlobalSettings.version.micro
  },
  user: {
    id: 0,
    name: ''
  },
  WebSocketState: 'dead'
}

export default Data
