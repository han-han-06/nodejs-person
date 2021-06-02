// 什么是流，相当于建立了一个程序的逻辑导管，要用疏导的方式去完成这样的程序，一点一点的，省着占用内存
// ??? 那啥时候用呢

//二进制友好，图片操作
// 负债图片
const fs = require('fs')
const rs = fs.createReadStream('./img.png') // 读取文件 这是一根导管，没有占用内存
const ws = fs.createWriteStream('./img2.png') // 写入流 这是一根导管，没有占用内存
rs.pipe(ws) // pipe 管道连接在一起，文件是以字节流的形式，一点一点流过去的，只会占用很小的内存资源