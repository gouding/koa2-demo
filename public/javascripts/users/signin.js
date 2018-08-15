console.log('signin')
var saveData = function() {
  var user = $('.js-user').val(),
    pwd = $('.js-pwd').val();
  if (!user || !pwd) {
    return alert('用户名或密码错误');
  }
  $.ajax({
    type: 'POST',
    dataType: 'json',
    data: {
      user: user,
      pwd: pwd
    },
    url: '/signin',
    success: function(ret) {
      console.log(ret);
      if (ret.retCode === 0) {
        window.location.href = '/posts';
      }
    }
  })
};
var bindListener = function() {
  $('.js-btn').on('click', saveData);

};
var init = function() {
  bindListener();
}
init();
