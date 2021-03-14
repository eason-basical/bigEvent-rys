$(function () {
  let form = layui.form;

  //   获取信息
  function formInfo() {
    // 获取用户信息，并自动填充
    axios.get("/my/userinfo").then(function (res) {
      // console.log(res);

      // 给表单赋值
      form.val("user", res.data.data);
    });
  }
  formInfo();

  //   对用户昵称做个长度限制;
  //   layui自定义规则;
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return "昵称长度需要在1-6个字符";
      }
    },
  });

  //   submit事件完成信息提交
  $("#form").on("submit", function (e) {
    e.preventDefault();

    //   获取信息
    let data = $(this).serialize();
    // console.log(data);
    axios.post("/my/userinfo", data).then(function (res) {
      //   console.log(res);

      if (res.data.status !== 0) {
        return layer.msg("修改用户信息失败");
      }
      layer.msg(res.data.message);

      //   重新调用父页面的get
      //   console.log(window.parent);
      window.parent.getUserInfo();
    });
  });

  // 点击重置按钮
  $("#btnReset").on("click", function (e) {
    e.preventDefault();
    formInfo();
  });
});
