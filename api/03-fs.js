const fs = require('fs') 
// 同步
// const data = fs.readFileSync('./download.js')
// console.log(data,data.toString())
// const data = fs.readFileSync('./download.js') // 同步
// const data1 = fs.readFile('./download.js',(err,data) => {
//     if(err) throw err;
//     console.log(11,data) // 是个二进制文件buffer
// })

// 异步方式
// fs.readFile('./download.js',(err,data) => {
//     if(err) throw err
//     console.log(data)
// })


// const {promisify} = require('util'); // 回调函数封装成promisify格式
const promisify = require('./promisify');
// 匿名函数
(async () => {
    const readFile = promisify(fs.readFile); 
    console.log('readFile',readFile)
    const a = await readFile('./download.js');
    console.log('2222',a)
})()



// async () => {
//     const {promisify} = require('util'); // 回调函数封装成promisify格式
//     const readFile = promisify(fs.readFile); 
//     const a = await readFile('./download.js');
//     console.log('2222',a)
// }