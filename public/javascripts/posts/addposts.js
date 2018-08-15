console.log('--denzel--')

var addFn = function() {
  var title = $('.js-title').val();
  var content = $('.js-content').val();
  if (!title || !content) {
    return alert('不能为空')
  }
  $.ajax({
    url: '/addposts',
    data: {
      title: title,
      content: content
    },
    dataType: 'json',
    type: 'POST',
    success: function(ret) {
      console.log(ret);
      if (ret && ret.retCode === 0) {
        alert(ret.retMsg);
        window.location.href='/posts';
      } else {
        alert(ret.retMsg)
      }
    }
  })
};
var bindListener = function() {
  $('.js-add-btn').on('click', addFn);
};
var init = function() {
  bindListener();
}
init();
