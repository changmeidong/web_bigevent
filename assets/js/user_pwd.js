$(function () {
    var form = layui.form;
    var layer = layui.layer;

    // 表单校验
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        re_pwd: function (value) {
            var newPwd = $('.layui-form [name=new_pwd]').val();
            if (value !== newPwd) {
                return '密码不一致';
            }
        }
    });

    // 重置密码请求
    $('.layui-form').on('submit', function (e) {
        // 阻止表单默认的提交行为
        e.preventDefault();

        $.ajax({
            method: 'PATCH',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.code !== 0) {
                    return layer.msg('密码重置失败');
                }
                layer.msg('更新密码成功！')
                // 重置表单
                $('.layui-form')[0].reset()

            }
        })

    })




})