// 使用jq的表单验证插件
$('.loginForm').validate({
    rules: {
        username: 'required',
        password: 'required'
    },
    messages: {
        username: '用户名不能为空',
        password: '密码不能为空'
    },
    submitHandler(form) {
        // 弹出遮罩层，准备登录请求
        var loadindex = layer.load(1, {
            shade: [0.5, '#333'] //0.5透明度的白色背景
        });
        $.ajax({
            url: '../server/login.php',
            data: $(form).serialize(),
            dataType: 'json',
            method: 'post',
            success: res => {
                // 解构赋值,获取到ajax的请求响应结果
                var { meta: { status, msg } } = res;
                //  接受到登录请求的结果，关闭遮罩层 
                layer.close(loadindex);
                // 弹出登录请求的响应结果的信息提示
                var msgindex = layer.msg(msg);
                if (status === 0) {
                    // 登录成功
                    // 设置cookie，保存用户的登录状态
                    setCookie('username', $('[name="username"]').val())
                    if ($("[name='remember']").prop('checked')) {
                        // 设置7天免登录
                        setCookie('username', $('[name="username"]').val(), { expires: 7 * 24 * 3600 })
                    }
                    // 登录成功，两秒后关闭，弹出的提示，并跳转首页
                    setTimeout(() => {
                        layer.close(msgindex)
                        location.href = 'index.html';
                    }, 2000)

                } else {
                    setTimeout(() => {
                        layer.close(msgindex)
                        return false;
                    }, 800);
                }
            }
        })
        return false;
    }
})