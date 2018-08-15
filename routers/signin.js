const router = require('koa-router')();
const userModel = require('../lib/mysql')
const md5 = require('md5')
router.get('/signin', async(ctx, next) => {
  await ctx.render('signin', {
    session: ctx.session
  })
});

router.post('/signin', async(ctx, next) => {
  console.log(ctx.session);
  let body = ctx.request.body;
  let user = body.user,
    pwd = body.pwd;
  if (!user || !pwd) {
    ctx.body = {
      retCode: 1,
      retMsg: '用户名或密码错误'
    }
  } else {
    await userModel.signUser(user, md5(pwd)).then(async ret => {
      console.log(ret);
      if (ret.length) {
        try {
          ctx.body = {
            retCode: 0,
            retMsg: '登录成功'
          }
          ctx.session = {
            user: user,
            avator: ret[0].avator,
            id: ret[0].id
          }
          console.log(ret[0].avator)
        } catch (err) {
          throw err;
        }
      } else {
        ctx.body = {
          retCode: 2,
          retMsg: '用户名不存在或密码错误'
        }
      }
    });
  }
});
module.exports = router;
