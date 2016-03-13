// 
// 基础信息模板
// 获取：当前路径、磁盘列表
// 

module.exports = {
  info:
    `Dim S:SET C=CreateObject("Scripting.FileSystemObject"):If Err Then:S="ERROR:// "&Err.Description:Err.Clear:Else:S=Server.Mappath(".")&chr(9):For Each D in C.Drives:S=S&D.DriveLetter&chr(58):Next:End If:Response.Write(S)`
}