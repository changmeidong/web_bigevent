$(function () {
    // 去注册
    $('#link_reg ').on('click', function () {
        $('.login_box').hide();
        $('.reg_box').show();
    })

    // 去登录
    $('#link_login').on('click', function () {
        $('.login_box').show();
        $('.reg_box').hide();
    })

    //表单验证
    var form = layui.form;
    var layer = layui.layer;
    form.verify({

        username: [/^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$/, '用户名不能有特殊字符'],
        pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            var pwd = $('.reg_box [name=repassword]').val();
            if (value != pwd) {
                return "密码不一致";
            }
        }
    })

    // 用户注册的ajax请求
    $('#reg_from').on('submit', function (e) {
        e.preventDefault();
        $.post('/api/reg', {
            username: $('#reg_from [name=username]').val(),
            password: $('#reg_from [name=password]').val(),
            repassword: $('#reg_from [name=repassword]').val()
        }, function (res) {
            if (res.code !== 0) {
                return layer.msg(res.message);
            }
            // 模拟点击行为
            $("#link_login").click();
        })
    })

    // 用户登录
    $("#login_from").on("submit", function (e) {
        e.preventDefault();
        $.post('/api/login',
            {
                username: $('#login_from [name=username]').val(),
                password: $('#login_from [name=password]').val()
            },
            function (res) {
                console.log(res.token);
                if (res.code !== 0) {
                    return layer.msg(res.message);
                }
                localStorage.setItem("token",res.token)
                // 跳转后台主页
                location.href='/index.html';

            }
        )
    })



})