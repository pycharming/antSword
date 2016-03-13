// 
// 默认代码模板
// 
// @params
// :encode  SHELL编码
// :conn    数据库连接字符串
// :sql     执行SQL语句
// 

module.exports = {
  show_databases: {
    _: 'N',
    'z0': '#{encode}',
    'z1': '#{conn}'
  },
  show_tables: {
    _: 'O',
    'z0': '#{encode}',
    'z1': '#{conn}'
  },
  show_columns: {
    _: 'P',
    'z0': '#{encode}',
    'z1': '#{conn}'
  },
  query: {
    _: 'Q',
    'z0': '#{encode}',
    'z1': '#{conn}',
    'z2': '#{sql}'
  }
}