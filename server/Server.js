'use strict'

let http = require('http'),
  express = require('express'),
  WebSocketServer = require('ws').Server,
  server = http.createServer(),
  db = require('./MongoDB').getDb(),
  Lib = require('./Lib'),
  GS = require('./GlobalSettings'),
  Schema = require('./Schema'),
  FacebookData = require('./FacebookData'),
  wss = new WebSocketServer({server: server}),
  app = express(),
  uptime = Date.now(),
  WORKER_INDEX = false,
  NODE_ENV = false


/* Websockets */
function sendTimeoutPing() {
  wss.clients.forEach(function each(client) {
    if (client.timeout === true){
      console.log('Closing non responsive client.')
      client.close()
    }else{
      client.timeout = true
      client.sendObj({m: 'timeout'})
    }
  })
  setTimeout(()=>{
    sendTimeoutPing()
  }, 1000*60*10)// 10 minutes
}
function broadcast(obj) {
  wss.clients.forEach(function each(client) {
    client.sendObj(obj)
  })
}

function handleMessage(ws, d) {
  try{
    if (d.m === 'hi') {
      //ws.sendObj({m: 'hi'})
    }else if (d.m === 'timeout') {
      ws.timeout = false
    }else if (d.m === 'version') {
      if(d.version === GS.version){
        ws.compatible = true
        ws.sendObj({m: 'version', compatible: true})
      } else {
        ws.sendObj({m: 'version', compatible: false})
      }
    }
  }catch(err){
    console.log('Failed to handle client message.')
    console.log(d)
    console.log(err)
  }
}


/* Setup */
module.exports.setup = function (p) {
  process = p
  WORKER_INDEX = process.env.WORKER_INDEX
  NODE_ENV = process.env.NODE_ENV

  process.on('message', function (message) {// process server messages
    if(message.m == 'asdf'){
      // Placeholder
    }
  })

  wss.on('connection', function connection(ws) {
    ws.on('error', function(e) {
      console.log('Got a ws error')
      console.log(e)
      return false
    })

    // don't use ws.domain or ws.extensions
    ws.connected_time = Date.now() // connect time
    ws.timeout = false
    ws.connected = true
    ws.compatible = false
    ws.sentBytes = 0
    ws.recieveBytes = 0
    ws.sendObj = function (obj) {
      if(!ws.connected) return false

      try {
        let sending = JSON.stringify(obj)
        ws.send(sending)
        ws.sentBytes += sending.length
      } catch (err) {
        console.log('Failed to send a JSON message.')
      }
    }
    ws.sendBinary = function(data){
      if(!ws.connected) return false

      try{
        ws.send(data, {binary: true})
        ws.sentBytes += data.byteLength
      }catch(err){
        console.log('Failed to send a binary message.')
      }
    }
    ws.on('message', function incoming(data) {
      try {
        if (typeof data === 'string') {
          handleMessage(ws, JSON.parse(data))
          ws.recieveBytes += data.length
        } else {
          let buf = new Buffer(data, 'binary')
          handleMessage(ws, Schema.unpack(buf))
          ws.recieveBytes += data.byteLength
        }
      }
      catch (err) {
        console.log('Failed to parse client message.')
        console.log(data)
        console.log(err)
      }
    })

    ws.on('close', function () {
      try {
        ws.connected = false
      }catch(err){
        console.log('Error closing WebSocket.')
        console.log(err)
      }
    })

    ws.sendObj({m: 'hi'})
  })

  app.use(function (req, res) {// This is sent when the WebSocket is requested as a web page
    try {
      res.send('HTTP connection to Node ' + WORKER_INDEX)
    } catch (err) {
      console.log('Failed to send a http request.')
      console.log(err)
    }
  })

  server.on('request', app)
  server.listen(GS.server_port, function () {
    console.log('Listening on port ' + server.address().port)
  })

  process.send({m: 'ready'})

  sendTimeoutPing()
}
