// 登录验证 前端+后端+数据库

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./db')

// 处理请求参数
// 挂载参数处理中间件（post）
app.use(bodyParser.urlencoded({ extended: false }));
// 处理json格式的参数
app.use(bodyParser.json());

// 启动静态资源服务
app.use(express.static('public'))

app.post('/check',(req,res)=>{
    let param = req.body;

    let sql = 'select count(*) as total from user where username=? and password=?'
    let data = [param.username,param.password]

    db.base(sql,data,(result)=>{
        if(result[0].total == 1){
            res.send('login success')
        }else{
            res.send('login failure')
        }
    })
})

app.listen(3000,()=>{
    console.log('running')
})