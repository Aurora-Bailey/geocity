/* Settings to be used everywhere  */
let GlobalSettings = {
  version: {
    compatible: 'GSE4H65',
    micro: 'v001'
  },
  server: {
    address: window.location.hostname === 'localhost' ? 'localhost' : 'ws.example.com',
    devActive: window.location.hostname === 'localhost',
    devPort: '7777'
  }
}

export default GlobalSettings
