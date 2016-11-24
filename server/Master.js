'use strict'

let os = require('os'),
  numCores = os.cpus().length,
  GS = require('./GlobalSettings'),
  Lib = require('./Lib'),
  cluster = false,
  workers = []

function workerMessage (worker, message, handle) {
  if (arguments.length === 2) {
    handle = message
    message = worker
    worker = undefined
  }

  if (message.m === 'ready') {
    worker.ready = true
  } else if (message.m === 'pass') {
    try {
      workers.forEach((e)=> {
        if (e.index == message.to || 'all' === message.to) {
          if(e.ready) e.send(message.data)
          else setTimeout(() => {e.send(message.data)}, 1000)// give a second if not ready
        }
      })
    }catch(err){
      console.log('err', 'Failed to pass message!')
      console.log(err)
    }
  }else if(message.m === 'kill') {
    try {
      workers.forEach((e)=> {
        if (e.index == message.worker || 'all' === message.worker) {
          e.kill('SIGKILL')
        }
      })
    }catch(err){
      console.log('err', 'Failed to kill worker!')
      console.log(err)
    }
  }
}
function workerExit(worker, code, signal) {
  makeWorker(worker.index)
}
function makeWorker(id) {
  if (!cluster) return false

  workers[id] = cluster.fork({WORKER_INDEX: id})
  workers[id].ready = false
  workers[id].index = id

  return workers[id]
}

module.exports.setup = function (c) {
  cluster = c

  for (let i = 0; i < numCores; i++) {
    makeWorker(workers.length)
  }
  cluster.on('message', (w, m, h)=> {
    workerMessage(w, m, h)
  })
  cluster.on('exit', (w, c, s)=> {
    workerExit(w, c, s)
  })
}

