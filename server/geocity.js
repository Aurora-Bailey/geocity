'use strict';

let cluster = require('cluster')

if (cluster.isMaster) {
  let Master = require('./Master')
  Master.setup(cluster)
} else {
  let MongoDB = require('./MongoDB')
  MongoDB.connectToServer(function (err) {
    if (err) {
      console.log('MongoDB Error: ')
      console.log(err)
    } else {
      let Server = require('./Server')
      Server.setup(process)
    }
  })
}



