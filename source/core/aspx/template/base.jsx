// 
// 基础信息模板
// 获取：当前路径、磁盘列表
// 

module.exports = {
  info:
    `var c=System.IO.Directory.GetLogicalDrives();Response.Write(Server.MapPath(".")+"  ");for(var i=0;i<=c.length-1;i++)Response.Write(c[i][0]+":");`
}