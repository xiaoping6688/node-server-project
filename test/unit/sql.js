const sql = require('../../server/utils/sql')

console.log(sql.insert('table_name', {
  field1: '字段1',
  field2: '字段2',
  field3: '3'
}))

console.log(sql.insert('table_name', {
  field1: '字段1',
  field2: '字段2',
  field3: '3'
}, [
  'field1'
], {
  field2: '追加2',
  field3: 3
}))

console.log(sql.insertMore('table_name', [{
  field1: '字段1',
  field2: '字段2',
  field3: '3'
},{
  field1: '字段1',
  field2: '字段2',
  field3: '3'
}]))

console.log(sql.update('table_name', {
  field1: '字段1',
  field2: '字段2',
  field3: '3'
}, {
  id: '123'
}))

console.log(sql.update('table_name', null, {
  id: '123'
}, {
  field3: '3'
}))

console.log(sql.select('table_name', ['field1', 'field2'], {
  id: '123'
}))

console.log(sql.select('table_name', [], {
  id: '123'
}))

console.log(sql.delete('table_name', {
  //id: '123'
}, 'id2="1"'))

console.log(sql.replace('table_name', {
  field1: '字段1',
  field2: '字段2',
  field3: '3'
}))

console.log(sql.replaceMore('table_name', [{
  field1: '字段1',
  field2: '字段2',
  field3: '3'
},{
  field1: '字段1',
  field2: '字段2',
  field3: '3'
}]))
