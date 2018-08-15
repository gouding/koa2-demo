var user,
  pwd,
  avator,
  pwd2;
var saveData = function() {
  if (!user.val()) return alert('用户名不能为空');
  if (!pwd.val()) return alert('密码不能为空');
  if (!pwd2.val()) return alert('密码确认不能为空');
  if (pwd.val() !== pwd2.val()) alert('两次密码输入不一致');
  if (!avator.val()) return alert('请上传头像');
  const data = {
    user: user.val(),
    pwd: pwd.val(),
    avator: avator.val()
  };
  $.ajax({
    url: '/signup',
    data: data,
    dataType: 'json',
    type: 'POST',
    success: function(ret) {
      console.log(ret);
      if (ret) {
        if (ret.data == 1) {
          alert('已注册过')
        } else if (ret.data === 3) {
          alert('注册成功');
          window.location.href = '/posts';
        }
      }
    }
  })
};
//上传图片
var uploadImg = function() {
  if (this.files.length > 0) {
    var file = this.files[0];
    var reader = new FileReader();
    if (!reader) {
      this.value = '';
      return;
    }
    if (file.size >= 1024 * 1024 / 2) {
      alert('请上传小于512kb大小的图片');
      return;
    }
    reader.readAsDataURL(file, 'UTF-8');
    reader.onload = function(e) {
      console.log(e.target);
      this.value = '';
      $('.preview').attr('src', e.target.result);
      $('#avatorVal').val(e.target.result);
    }
  }
};
var parseDom = function() {
  user = $('.user');
  pwd = $('.pwd');
  pwd2 = $('.pwdagain');
  avator = $('#avatorVal');
};
var bindListener = function() {
  $('.js-btn').on('click', saveData);
  $('.avator').on('change', uploadImg);
};
var init = function() {
  parseDom();
  bindListener();
};
init();
