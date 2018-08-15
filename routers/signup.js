const router = require('koa-router')()
const userModel = require('../lib/mysql.js')
const md5 = require('md5')
// const checkNotLogin = require('../middlewares/check').checkNotLogin
// const checkLogin = require('../middlewares/check').checkNotLogin
const moment = require('moment')
const fs = require('fs')

//注册页面
router.get('/signup', async(ctx, next) => {
  // await checkNotLogin(ctx)
  await ctx.render('signup', {
    session: ctx.session
  })
});

//注册提交页
router.post('/signup', async(ctx, next) => {
  let user = {
    name: ctx.request.body.user,
    pwd: ctx.request.body.pwd,
    avator: ctx.request.body.avator
  }
  await userModel.findUserByName(user.name)
    .then(async(ret) => {
      console.log(ret);
      if (ret.length) {
        try {
          throw Error('用户名已存在')
        } catch (err) {
          console.log(err)
        }
        ctx.body = {
          data: 1
        }
      } else {
        console.log('1')
        let getName = Number(Math.random().toString().substr(3)).toString(36);
        let base64Data = user.avator.replace(/^data:image\/\w+;base64,/, '');
        let dataBuffer = new Buffer(base64Data, 'base64');
        await fs.writeFile('./public/images/' + getName + '.png', dataBuffer, err => {
          if (err) throw err;
          console.log('头像上传成功');
        });
        await userModel.insertUser([user.name, md5(user.pwd), getName, moment().format('YYYY-MM-DD HH:mm:ss')])
          .then(ret => {
            console.log('注册成功', ret)
            ctx.body = {
              data: 3
            }
          })
      }
    })
});

module.exports = router
