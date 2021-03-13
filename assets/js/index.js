//获取个人信息
axios
  .get("http://ajax.frontend.itheima.net/my/userinfo", {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  })
  .then(function (res) {
    console.log(res);
    let info = res.data.data;
    // 显示名称
    let name = info.nickname || info.username;
    $("#welcome").text("欢迎 " + name);
    // 显示图片
    if (res.user_pic) {
      $(".layui-nav-img").attr("src", res.user_pic).show();
      $(".text-avatar-box").hide();
    } else {
      $(".layui-nav-img").hide();
      $(".text-avatar-box").show().children().text(name[0].toUpperCase());
    }
  });
