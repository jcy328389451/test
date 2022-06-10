// 首页渲染的js代码

// 1. 先显示加载层
let index = layer.load(0,{shade:[0.3,'#ccc']});

// 渲染首页函数
bindHtml()
async function bindHtml() {
  // 请求接口获取数据(北京的景点数据)
  let bjobj = await pAjax({url:'../server/scenics.php',data:{pid:2},dataType:'json'})
  // 结构获取数据
  let {data:bjarr} = bjobj
  // console.log(bjobj);

  // 遍历数组拼接html字符串并渲染
  let bgStr = bjarr.map(v=>{    
    // 获取商品的第一张图片地址
    // console.log( v )
    // console.log( v.imgpath.split('==========')[0] )
    return `
    <li class="item">
    <img src="${v.imgpath.split('==========')[0]}" class="pic" alt="" style="overflow:hidden">
    <h3 class="item-name">${v.name}</h3>
    <p class="item-info">安全的大功率快充插线板</p>
    <p class="item-price">
        <span class="present-price">${v.price}</span>
        <span class="primary-price"></span>
    </p>
</li>
  `;   
  }).join('');
  // 渲染到页面中
  $('.beijing').html(bgStr);
    // 请求接口获取数据(北京的景点数据)
    let anobj = await pAjax({url:'../server/scenics.php',data:{pid:13},dataType:'json'})
    // 结构获取数据
    let {data:anarr} = anobj
    // 遍历数组拼接html字符串并渲染
    let anStr = anarr.map(v=>`
    <li class="item">
    <img src="${v.imgpath.split('==========')[0]}" class="pic" alt=""  style="overflow:hidden">
    <h3 class="item-name">${v.name}</h3>
    <p class="item-info">安全的大功率快充插线板</p>
    <p class="item-price">
        <span class="present-price">${v.price}</span>
        <span class="primary-price"></span>
    </p>
</li>
    `).join('');
    // 渲染到页面中
    $('.anhui').html(anStr);

    // 关闭加载层
    layer.close(index);
}


$('.toCart').click(function () {
  // 通过cookie获取用户名
  let username = getCookie('username');
  // 判断用户是否登录
  if (!username) {
    layer.msg('请先登录');
    location.href = 'login.html';
    return false;
  }
  // 已经登录则跳转至购物车页面
  location.href = 'shoppingCart.html';
  return false;
})