$(function () {
  //点击注册显示注册页面
  $("#showReg").click(function () {
    $(".login-form").hide();
    $(".reg-form").show();
  });

  // 点击登录显示登录页面
  $("#showLogin").click(function () {
    $(".login-form").show();
    $(".reg-form").hide();
  });

  // 定义form
  let form = layui.form;
  // 使用layui实现注册检验
  // 自定义校验规则
  form.verify({
    // 设置密码框的内容类型和长度
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    // 密码二次确认
    repass: function (value) {
      let pwd = $(".reg-form input[name=password]").val();
      if (value !== pwd) {
        return "两次密码不一致";
      }
    },
  });

  //实现注册功能
  //form表单触发submit事件
  $(".reg-form").on("submit", function (e) {
    e.preventDefault();
    //  获取用户名和密码
    let data = $(this).serialize();
    // console.log(data);

    // 提交请求
    axios.post("/api/reguser", data).then(function (res) {
      console.log(res);
      if (res.data.status !== 0) {
        return layer.msg("注册失败，" + res.data.message);
      } else {
        layer.msg(res.data.message);
        // 注册成功跳转至登录页面（触发登录的点击事件）
        $("#showLogin").click();
      }
    });
  });

  // 实现登录效果
  // 触发form表单submit事件
  $(".login-form").on("submit", function (e) {
    // 清楚默认跳转
    e.preventDefault();

    //  获取用户名和密码
    let data = $(this).serialize();
    console.log(data);

    // 提交请求
    axios.post("/api/login", data).then(function (res) {
      console.log(res);
      if (res.data.status !== 0) {
        return layer.msg(res.data.message);
      } else {
        // 本地储存token，
        localStorage.setItem("token", res.data.token);

        layer.msg(res.data.message, function () {
          location.href = "index.html";
        });
      }
    });
  });
});
