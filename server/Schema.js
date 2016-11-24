/* eslint-disable */
const avro = require('avsc/etc/browser/avsc-types')

module.exports.pack = function (schema, data) {
  return wrapper.toBuffer({schema: schema, data: type[schema].toBuffer(data)})
}
module.exports.unpack = function (buf) {
  let unwrapped = wrapper.fromBuffer(buf)
  return type[unwrapped.schema].fromBuffer(unwrapped.data)
}

const wrapper = avro.parse({
  name: 'Message',
  type: 'record',
  fields: [
    {name: 'schema', type: {name: 'Schema', type: 'enum', symbols: [
      'example'
    ]}},
    {name: 'data', type: 'bytes'}
  ]
})

const type = {};
type.example = avro.parse({
  name: 'Example',
  type: 'record',
  fields: [
    {name: 'm', type: {name: 'M', type: 'enum', symbols: ['example']}},
    {name: 'a', type: 'int'},
    {name: 'b', type: 'string'},
    {name: 'c', type: {type: 'array', items: 'int'}}
  ]
})
// Example:
// let binary = Schema.pack('example', {m: 'example', a: 1, b: 'asdf', c: [1, 2, 3]})
// Schema.unpack(binary) // {m: 'example', a: 1, b: 'asdf', c: [1, 2, 3]}

/* eslint-enable */
