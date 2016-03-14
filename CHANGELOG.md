# 更新日志
> 有空会补补BUG、添添新功能。    
> 同时也欢迎大家的参与！

## 2016/03

### /14
  1. 修复文件管理中过滤不当引发的xss安全问题
  2. 增加窗口调整大小刷新UI之前弹框提醒用户选择是否刷新
  3. 删除无用语言包（jp）
  4. 更新支持PHP7
    1. 删除`core/php/index.jsx`中的`@set_magic_quotes_runtime(0);`
    2. 升级`core/php/template/database/mysql.jsx`中的`mysql`为`mysqli`

### /13
  1. 修复源码中`jquery`库缺失问题


# 待做事项
  * 数据分类重命名
  * 数据高级搜索功能
  * 虚拟终端复制粘贴tab补全