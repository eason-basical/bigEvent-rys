//   重置密码规则判断
$(function () {
  let form = layui.form;
  form.verify({
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],

    // somePass 判断原密码和新密码是否相同
    somePass: function (value) {
      // 获取原密码
      let oldPwd = $("input[name=oldPwd]").val();
      //   console.log(oldPwd);
      if (value === oldPwd) {
        return "新密码和原密码不能相同";
      }
    },

    // rePass判断新密码和确认密码是否相同
    rePass: (value) => {
      let newPwd = $("input[name=newPwd]").val();
      if (value !== newPwd) {
        return "两次密码不一致，请重新输入";
      }
    },
  });

  //   重置密码实现
  $("#form").on("submit", function (e) {
    e.preventDefault();

    let data = $(this).serialize();
    console.log(data);

    axios.post("/my/updatepwd", data).then((res) => {
      console.log(res);
      if (res.data.status !== 0) {
        $("#form")[0].reset();
        return layer.msg(res.data.message);
      }
      layer.msg(res.data.message);

      //   重置
      $("#form")[0].reset();
    });
  });
});
