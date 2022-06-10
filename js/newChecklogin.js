$(() => {
    // 校验用户是否登录
    // 根据cookie校验
    // 获取用户名
    let username = getCookie('username');
    if (username) {
        // 将用户名渲染和退出页面中
        $('.login').html(`
      <li>
      <a >欢迎尊贵的：${username} 来到小虎网站！</a>
      <span>|</span>
      </li>
      <li>
      <span style="color:#b0b0b0;cursor:pointer" class="logout">退出登录</span>
      <span>|</span>
      </li>
  `)
// 用户登录信息渲染之后,给退出点击事件,完成退出
    $('.logout').click(() => {
            // 使用一个 提示弹出层
            let index = layer.confirm('你真的要退出吗?', () => {
                // 点击确定
                // 清除cookie
                delCookie('username');
                // 关闭弹出层
                layer.close(index);
                setTimeout(() => {
                    location.href = 'login.html';
                }, 1000)
                // 渲染登录注册
                $('.login').html(`<li><a href="login.html">登陆</a></li><li><a href="register.html">注册</a></li>`)
            }, () => {
                layer.msg('你已经取消退出');
            })


        })
    } else {
        // 渲染登录注册
        $('.login').html(`<li><a href="login.html">登陆</a></li><li><a href="register.html">注册</a></li>`)
    }
})