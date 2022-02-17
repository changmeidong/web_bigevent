$(function () {
    var layer = layui.layer;
    var form = layui.form;
    // initArtCateList
    initArtCateList()
    // 添加分类事件
    var index_add = null;
    $('#add_cate').on('click', function () {
        index_add = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    })

    // 通过代理方式—_新增类别
    $('#add_cate').on('submit', function (e) {
        // 阻止表单默认的提交行为
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/cate/add',
            data: $('#form-add').serialize(),
            success: function (res) {
                if (res.code != 0) {
                    return layer.msg('新增失败');
                }
                layer.msg('新增成功');
                return layer.close(index_add);

            }
        })
    })


    // 通过代理方式——修改
    var index_edit = null;
    $('tbody').on('click', '.btn-edit', function (e) {
        index_edit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        });
        var id = $(this).attr('data-id');
        // 发起请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: '/my/cate/info' +"?id="+ id,
            success: function (res) {
                console.log(res.data);
                form.val('form-edit', res.data)
            }
        })
    })

    //更新文章分类的数据
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
              method: 'PUT',
              url: '/my/cate/info',
              data: $(this).serialize(),
              success: function(res) {
                if (res.code !== 0) {
                  return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据成功！')
                layer.close(index_edit)
                initArtCateList()
              }
        })
    })
    //通过代理的形式，为删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id')
        // 提示用户是否要删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
          $.ajax({
            method: 'DELETE',
            url: '/my/cate/del' +"?id="+ id,
            success: function(res) {
              if (res.code !== 0) {
                return layer.msg('删除分类失败！')
              }
              layer.msg('删除分类成功！')
              layer.close(index)
              initArtCateList()
            }
          })
        })
    })
})

// 获取文章分类的列表
function initArtCateList() {
    $.ajax({
        mtethod: 'GET',
        url: '/my/cate/list',
        success: function (res) {
            if (res.code !== 0) {
                return layer.msg('获取文章类别失败')
            }
            var htmlstr = template('tpl_cate', res);
            $('tbody').html(htmlstr);
        }
    })
  }