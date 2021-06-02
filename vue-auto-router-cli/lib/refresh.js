const fs = require('fs')
const handlebars = require('handlebars')
const chalk = require('chalk')
module.exports = async () => {
    // 获取页面列表
    const list =
        fs.readdirSync('./src/views')
            .filter(v => v !== 'Home.vue')
            .map(v => ({
                name: v.replace('.vue', '').toLowerCase(), // 去掉文件的.vue，只要文件名，toLowerCase 转小写
                file: v
            }))
    compile({
        list
    }, './src/router.js', './template/router.js.hbs')

    // 生成菜单
    compile({
        list
    }, './src/App.vue', './template/App.vue.hbs')



    /**
     * 
     * @param {*} meta  数据（读取的列表数据list）
     * @param {*} filePath 目标（要编译到哪里去）
     * @param {*} templatePath 模板
     */
    function compile(meta, filePath, templatePath) {
        if (fs.existsSync(templatePath)) {
            const content = fs.readFileSync(templatePath).toString() // 读取模板
            const reslut = handlebars.compile(content)(meta) // 编译模板，科利华函数
            fs.writeFileSync(filePath, reslut) // 写入到目标文件里面去
        }
        console.log(chalk.red(`🚀${filePath} 创建成功`))
    }
}