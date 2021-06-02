module.exports = function promisify(fn) {
  return function(...args) {
    console.log('args',args)
    return new Promise(function(resolve,reject) {
      args.push(function(err,...arg) {
        console.log('arg',arg)
        if(err) {
          reject(err)
        }else {
          resolve(...arg)
        }
      })
      fn.apply(null,args);// null 则为全局对象
    })
  }
}