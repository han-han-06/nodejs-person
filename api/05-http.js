const http = require('http');
const fs = require('fs');
const server = http.createServer(function(req,res) {
    // req,res 这玩意也是个流，两根导管连接了浏览器和服务器的上下行，如果body内容太大，如果一次性保存在程序里不好，所以会一点一点的来
    const {url,method,headers} = req;
    if(url ==='/' && method ==='GET') {
        fs.readFile('index.html',(err,data) => {
            if(err) {
                res.writeHead(500,{
                    'Content-Type':'text/plain;charset=utf-8'
                })
                res.end('500 服务器程序')
                return
            }
            res.statusCode = 200;
            res.setHeader('Content-Type','text/html')
            res.end(data)
        })
    }
    else if(url ==='/users' && method==='GET') {
        res.writeHead(200,{
            'Content-Type':'application/json' // json格式
        })
        // json对象得转一下
        res.end(JSON.stringify({
            "aa":"11"
        }))
    }
    // headers.accept 接收的图片类型
    // 
    else if(method === 'GET' && headers.accept.indexOf('image/*') !== -1) {
        // 服务器的资源是有限的，如果用readFile去读取图片会占用内存，图片是10k，会占用10KB的内存从读取到返回的对象，是放在缓存内存中的，占用了内存
        // 可能会给服务造成压力，万一好多人调用的话，就完蛋了，会造成并发的，所以需要通过流的方式去截取
        // 
        // 处理所有的图片请求； 把png和服务端响应连接起来
        fs.createReadStream('./'+url).pipe(res)
    }
    else {
        res.statusCode = 404
        res.setHeader('Content-type','text/plain;charset=utf-8')
        res.end('404了')
    }
})
server.listen(3000)

// I/O设备是啥
// 同步阻塞：做完一件事才能做下一件事
// 同步非阻塞：时不时回来看看水烧开了么，然后去干别的事
// 异步阻塞：谁开会触发通知，本来等着发通知再来就好，但是王大爷还是坐在旁边等着水开
// 异步非阻塞io：异步完成以后会触发通知。水响回来就好
// a.png文件

function getProtoChain(obj) {
    let protoChain = []
    while(obj = Object.getPrototypeOf(obj)) {
        protoChain.push(obj)
    }
    return protoChain
}






// const http = require('http')
// const fs = require('fs')
// const server = http.createServer((request, response) => {
//     // response.end('hello ...')
//     const { url, method ,headers} = request
//     if (url === '/' && method === 'GET'){
//         // 静态页面服务
//         fs.readFile('index.html',(err,data) => {
//             response.statusCode = 200
//             response.setHeader('Content-Type','text/html')
//             response.end(data)
//         })
//     }else if(url === '/users' && method === 'GET'){
//         // Ajax服务
//         response.writeHead(200,{
//             'Content-Type': 'application/json'
//         })
//         response.end(JSON.stringify({
//             name : 'laowang'
//         }))
//     }else if(method === 'GET' && headers.accept.indexOf('image/*') !== -1){
//         // 图片文件服务
//         fs.createReadStream('./'+url).pipe(response)
//     }

// })
// server.listen(3000)