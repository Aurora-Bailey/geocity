import VueData from './VueData'
import GS from './GlobalSettings'
let Schema = require('../../server/Schema')

let ws = {}
let sendQueue = []
let failStart = 0 // web socket fails to start
VueData.WebSocketState = 'dead'
start()

function start () {
  if (VueData.WebSocketState !== 'dead') return false
  VueData.WebSocketState = 'connecting'

  if (GS.server.devActive) {
    ws = new window.WebSocket('ws://' + GS.server.address + ':' + GS.server.devPort)
  } else {
    ws = new window.WebSocket('ws://' + GS.server.address)
  }

  ws.binaryType = 'arraybuffer'

  ws.onopen = () => {
    if (ws.connected) return false // already connected

    ws.connected = true
    VueData.WebSocketState = 'ready'
    failStart = 0

    sendObj({m: 'hi'})
    sendObj({m: 'version', version: VueData.version.compatible})

    // Send messages backed up while the socket was closed
    sendQueue.forEach((e, i) => {
      sendObj(e)
    })
  }
  ws.onclose = () => {
    ws.connected = false
    VueData.WebSocketState = 'dead'
    failStart++
    let timeout = 3000 * failStart
    setTimeout(start, timeout)
    console.warn('WebSocket closed.')
  }
  ws.onmessage = (e) => {
    if (typeof e.data === 'string') {
      handleMessage(JSON.parse(e.data))
    } else {
      let buf = new Buffer(e.data, 'binary')
      handleMessage(Schema.unpack(buf))
    }
  }
}

function handleMessage (d) {
  if (d.m === 'version') {
    if (d.compatible) {
      console.log('Compatible.')
    } else {
      console.warn('Your game is out of date! Please refresh your browser.')
    }
  } else if (d.m === 'timeout') {
    sendObj({m: 'timeout', alive: true})
  } else if (d.m === 'city_suggestions') {
    VueData.pages.search.suggestions = d.arr
  }
}

function sendObj (object, queue = false) {
  if (VueData.WebSocketState !== 'ready') {
    if (queue) {
      sendQueue.push(object)
    } else {
      console.warn('Trying to send message while the WebSocket is not connected.')
    }
    return false
  }
  ws.send(JSON.stringify(object))
}

function sendBinary (binary) {
  if (VueData.WebSocketState !== 'ready') {
    console.warn('Trying to send binary while the WebSocket is not connected.')
    return false
  }
  ws.send(binary, { binary: true, mask: true })
}

// short circuit, skip the WebSocket.
function shortObj (object) {
  handleMessage(object)
}

export default {sendObj, sendBinary, shortObj}
