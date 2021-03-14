getUserInfo();
function getUserInfo() {
  //获取个人信息
  axios
    .get("/my/userinfo", {
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
      if (info.user_pic) {
        $(".layui-nav-img").attr("src", info.user_pic).show();
        $(".text-avatar-box").hide();
      } else {
        $(".layui-nav-img").hide();
        $(".text-avatar-box").show().children().text(name[0].toUpperCase());
      }
    });
}
// 退出功能
$(function () {
  //  删除本地存储的token
  //  跳转页面到 `/login.html`
  $("#btnLogout").click(function () {
    //  删除本地存储的token
    layer.confirm(
      "确认要退出吗？",
      { icon: 3, title: "温馨提示" },
      function (index) {
        //do something
        layer.close(index); //关闭窗口
        // 清除token
        localStorage.removeItem("token");
        // 跳转页面
        location.href = "login.html";
      }
    );
  });
});
