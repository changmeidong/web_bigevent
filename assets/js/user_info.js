$(function () {
    init_userInfo();
})

var form = layui.form;
var layer = layui.layer;

// 渲染个人基本资料
function init_userInfo() {
    $.ajax({
        method: 'GET',
        url: "/my/userinfo",
        success: function (res) {
            if (res.code !== 0) {
                return layer.msg(res.message);
            }
            // 渲染from表单内数据
            //给表单赋值
            form.val("userinfo_from", res.data);
        }
    })
}

// 重置表单的内容
$('#btn_reast').on('click', function (e) {
    // 阻止表单默认的提交行为
    e.preventDefault();
    //给表单赋值
    init_userInfo();
})

// 提交修改基本信息
$('.layui-form').on('submit', function (e) {
    // 阻止表单默认的提交行为
    e.preventDefault();
    $.ajax({
        method:'PUT',
        url:'/my/userinfo',
        data:$(this).serialize(),
        success:function(res){
            console.log(res);
            if(res.status !==0){
                layer.msg('用户信息更新失败');
            }
            layer.msg('用户信息更新成功');
            window.parent.getuserinfo();
        }
    })

})