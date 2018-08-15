const router = require('koa-router')()
const apiModel = require('../lib/mysql')
router.get('/posts', async(ctx, next) => {
  let list=[];
  await apiModel.findPosts()
    .then(ret => {
      if (ret) {
        console.log(ret);
        list = ret;
      }
    })
  await ctx.render('posts', {
    session: ctx.session,
    list: list
  });
});

module.exports = router;
