const router = require('koa-router')()
const apiModel = require('../lib/mysql')
const moment = require('moment')

router.get('/addposts', async ctx => {
  await ctx.render('addposts', {
    session: ctx.session
  })
})

router.post('/addposts', async ctx => {
  let title = ctx.request.body.title,
    content = ctx.request.body.content;
  if (!title || !content) {
    ctx.body = {
      retCode: '1',
      retMsg: '标题或内容不能为空'
    }
  } else {
    let uname = '',
      avator = '',
      uid = 0;
    if (ctx.session) {
      uname = ctx.session.user;
      avator = ctx.session.avator;
      uid = ctx.session.id;
    }
    let pv = 0;
    let momentStr = moment().format('YYYY-MM-DD HH:mm:ss');
    let status = 0;
    console.log(title,content);
    await apiModel.insertPost([uname, title, content, uid, momentStr, pv, avator, status])
      .then(ret => {
        if (ret) {
          console.log(ret);
          ctx.body = {
            retCode: 0,
            retMsg: '保存成功'
          }
        } else {
          ctx.body = {
            retCode: 1,
            retMsg: '保存失败'
          }
        }
      })
  }
})
module.exports = router;
