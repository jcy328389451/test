// 注册页面的js代码
var btn = document.querySelector(".submit");
btn.addEventListener('click', submit)
function submit() {
    // 验证表单数据
    var username = document.querySelector("[name='username']").value;
    if (username === '') {
        layer.msg('用户名必填');// 弹出提示框
        return false;
    }
    // 代码能走到这里，用户名填过了
    var reg = /^[a-zA-Z][a-zA-Z0-9]{2,7}$/;
    if (!reg.test(username)) {
        layer.msg('用户名：字母开头，字母、数字组成，3~8位')
        return false;
    }
    // 密码校验
    var password = document.querySelector("[name='password']").value;
    if (password === '') {
        layer.msg('密码必填')
        return false;
    }
    // 密码：数字、字母自称，6~12位
    var reg = /^[a-zA-Z0-9]{6,12}$/;
    if (!reg.test(password)) {
        layer.msg('密码：数字、字母组成，6~12位')
        return false
    }
    // 确认密码
    var repassword = document.querySelector("[name='repass']").value;
    if (repassword !== password) {
        layer.msg('两次不一致')
        return false
    }

    // 邮箱
    // var email = document.querySelector("[name='email']").value;
    // if (email === '') {
    //     layer.msg('邮箱必填')
    //     return false
    // }

    // var reg = /(^[a-zA-Z]\w{3,11}@(qq|126|163)\.com$)|(^1\d{4,11}@qq\.com$)/;
    // if (!reg.test(email)) {
    //     layer.msg('请输入正确的邮箱')
    //     return false;
    // }

    // 验证手机号
    var tel = document.querySelector("[name='tel']").value;
    if (tel === '') {
        layer.msg('手机号必填')
        return false
    }
    var reg = /^1[3-9]\d{9}$/;
    if (!reg.test(tel)) {
        layer.msg('请输入正确的手机号')
        return false;
    }
    // 同意协议
    var agree = document.querySelector("[name='agree']");
    if (!agree.checked) {
        layer.msg('请同意协议')
        return false;
    }
    // 注册请求pAjax，弹出加载遮罩层
    var index = layer.load(1, {
        shade: [0.5, '#666'] //0.1透明度的白色背景
    });
    // 禁用点击按钮：作用是快速点多次就只发起一次ajax请求
    btn.disabled = true;
    // 发送ajax
    pAjax({
        url: '../server/register.php',
        dataType: 'json',
        data: {
            username,
            password,
            tel,
            // email
        },
        method: "post"
    }).then(res => {
        // 接收到注册的请求响应，关闭遮罩层
        layer.close(index)
        // 结构赋值 接受返回的响应数据
        var { meta: { status, msg } } = res;
        var msgIndex = layer.msg(msg);
        if (status === 0) {
            // 注册成功，两秒后关闭提示成功注册的弹出层，并跳转登录页面
            setTimeout(() => {
                layer.close(msgIndex)
                location.href = 'login.html'
            }, 2000)
        } else {
            btn.disabled = false; // 注册请求完成，将按钮的禁用解除
            return false;
        }
    })
}