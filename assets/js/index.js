$(function () {
    getuserinfo();
})

var layer = layui.layer;
//获取用户数据
function getuserinfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        // headers: {
        //     Authorization: localStorage.getItem("token") || ''
        // },
        success: function (res) {
            if (res.code !== 0) {
                return layer.msg(res.message);
            }
            renderAvatar(res.data)
        },
        complete: function (res) {
            if (res.responseJSON.code ===1
                && res.responseJSON.message === "身份认证失败！") {
                localStorage.removeItem('token');
                location.href = '/login.html';
            }
        }

    })
}
// 渲染用户的头像
function renderAvatar(user) {
    // 获取用户的名称
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp' + name);
    // 渲染用户的头像
    if (null != user.user_pic) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
        $('.layui-nav-img').hide();
    }
}

$('#btnLogout').on('click', function () {
    layer.confirm('确定退出吗?',
        function (index) {
            //do something
            console.log(index);
            localStorage.removeItem('token');
            location.href = '/login.html';
            layer.close(index);
        });
})