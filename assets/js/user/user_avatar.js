$(function () {
  //图片裁剪
  // 获取DOM对象
  let $images = $("#image");

  let options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
  };

  //   创建裁切图片
  $images.cropper(options);

  //   点击上传按钮，触发隐藏文件域的点击事件
  $("#btnChooseImage").click(function () {
    $("#file").click();

    //  当文件域改变的时候 更换图片
    $("#file").change(function () {
      console.log(this.files);
      let file = this.files[0];

      if (!file) {
        return;
      }

      //  创建一个url
      let url = URL.createObjectURL(file);
      console.log(url);
      $images
        .cropper("destroy") // 销毁旧的裁剪区域
        .attr("src", url) // 重新设置图片路径
        .cropper(options); // 重新初始化裁剪区
    });
  });

  //   点击确定按钮，上传图片
  $("#btnCreateAvatar").click(function () {
    // 剪裁得到一张图片（canvas图片）
    let base64Str = $images.cropper("getCroppedCanvas", {
      // 创建一个 Canvas 画布
      width: 100,
      height: 100,
    });

    // 把图片转成base64格式
    let dataURL = base64Str.toDataURL("image/png"); // 把canvas图片转成base64格式的字符串
    console.log(dataURL);
    axios
      .post("/my/update/avatar", "avatar=" + encodeURIComponent(dataURL))
      .then(function (res) {
        console.log(res);
        if (res.data.status !== 0) {
          return layer.msg("头像更新失败");
        }
        layer.msg("头像更新成功");
        window.parent.getUserInfo();
      });
  });
});
