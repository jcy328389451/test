// 详情页面的js代码
// 1. 先显示加载层
let index = layer.load(0, { shade: [0.3, '#ccc'] });
// 获取商品id---sessionStorage获取
let id = sessionStorage.getItem('goodsId');
if (!id && !/^\d+$/.test(id)) {
  layer.msg('非法请求');// 弹窗提示,然后跳转
  location.href = 'list.html';
}
// 根据商品id获取商品详情并渲染
$.ajax({
  url: '../server/detail.php',
  data: { id },
  dataType: 'json',
  success(res) {
    let { meta: { status }, data } = res;
    // 判断请求数据是否成功
    if (status == '1') {
      layer.msg('非法请求');// 
      location.href = 'list.html';
    } else {
      // 数据请求成功.,将数据渲染
      let pic = data.imgpath.split('==========')[0];
      $('.preview_img>img').attr('src', pic); // 渲染中图
      $('.big>img').attr('src', pic); // 渲染中大图
      let pics = data.imgpath.split('==========');
      // 遍历图片数据并组装html字符串然后渲染
      $('.list_item').html(pics.map(v => `<li><img src=${v} style="width=52px;height:52px"/></li>`).join(''));
      // 调用放大镜函数
      // enlarge();
      // 将商品库存渲染到id="num"的输入框中
      $('#num').attr('stock', data.stock);
      //渲染标题和价格及详情
      $('.good-name').text(data.name);
      $('.good-price').text(data.price);
      // console.log(data);
      // $('.details .tab>ol>li').first().html(data.introduce);
      // 如果有商品详情则渲染商品详情,没有则渲染商品介绍
      // console.log($('.select-list>ul>li>span')[0]);
      // console.log(data.introduce);
      $('.select-list>ul>li>span').first().text(data.introduce);

      layer.close(index);
    }
  }
})



// 点击购买商品数量的累加
$('.add-m').click(function () {
  // 只要点击了加的按钮,就解除键按钮的禁用
  $(this).next().next().prop('disabled', false);
  // 获取到商品的库存
  let stock = $(this).next().attr('stock') - 0;// -0减值转为数值
  // 获取输入框中的值
  let n = $(this).next().val() - 0;
  n++;
  if (n >= stock) {
    $(this).prop('disabled', true);// 禁用点击按钮
    // 将最大库存渲染到输入框
    $(this).next().val(stock);
  }
  $(this).next().val(n);
})
// 点击购买商品数量的递减
$('.reduce-m').click(function () {
  // 只要点击了减的按钮,就解除加按钮的禁用
  $(this).prev().prev().prop('disabled', false);
  // 获取到商品的库存
  let stock = $(this).prev().attr('stock') - 0;// -0减值转为数值
  // 获取输入框中的值
  let n = $(this).prev().val() - 0;
  n--;
  if (n <= 1) {
    $(this).prop('disabled', true);// 禁用点击按钮
    // 将最小购买数渲染到输入框
    $(this).prev().val(stock);
  }
  $(this).prev().val(n);
})


// 点击进入购物车

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

// 点击加入购物车
$('.add-cart').click(function () {
  // 通过cookie获取用户名
  let username = getCookie('username');
  // 判断用户是否登录
  if (!username) {
    layer.msg('请先登录');
    location.href = 'login.html';
    return;
  }
  // 用户已经登录则加入购物车
  // 获取库存
  let stock = $('#num').attr('stock') - 0;
  // 获取本次购买数量
  let num = $('#num').val() - 0;
  // 组装加入购物车的数据
  let cartObj = { username, id, num };

  // 获取本地购物车数据
  let str = localStorage.getItem('goodsData');
  // 购物车数组
  let arr;
  if (!str) { // 之前购物车为空
    arr = [cartObj];
  } else {
    // 判断用户之前是够添加过此商品的购物车
    let cartArr = JSON.parse(str);
    let cart = cartArr.find(v => {
      return v.id === id && v.username === username;
    });
    if (!cart) { // 之前没有添加过次购物车
      cartArr.push(cartObj);
      arr = cartArr;
      layer.msg('加入购物车成功');
    } else {
      let n1 = cart.num - 0; // 之前添加购物车的数量
      let n2 = n1 + num;
      if (n2 > stock) { // 添加的商品数超过库存
        layer.msg('购物数量超过库存');
        n2 = stock;
      } else {
        layer.msg('加入购物车成功');
      }
      // 将购买数累加并赋值给对象cart的num属性
      cart.num = n2;
      arr = cartArr
    }
  }
  // 将购物车数据arr写到localStorage中
  localStorage.setItem('goodsData', JSON.stringify(arr));

})

/*
  购物车数据存储?
    - 存储位置: localStorage
    - 存储的数据:
      + 键名: goodsData
      + 值: 一个json格式的字符串
        + 一条购物车数据就用一个对象表示
        + 多条购物数据存放到数组中
        + 一个购物车数据对象
          - {username,id,num}
          - username是购物车的用户
          - id是商品的id
          - num购买数量
*/


