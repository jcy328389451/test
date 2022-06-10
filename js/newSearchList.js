//// 列表页(分页)js

// 1. 先显示加载层
// let index = layer.load(0,{shade:[0.3,'#ccc']});
// 获取商品id---sessionStorage获取
let keyword = sessionStorage.getItem('info');
if (!keyword && !/^\d+$/.test(keif (!keyword)) ){
  layer.msg('非法请求');// 弹窗提示,然后跳转
  location.href = 'list.html';
}
// 请求获取数据
$.ajax({
    url: '../server/like.php',
    data: {
        keyword
    },
    dataType: "json",
    success(res) {
        // console.log(res);
        let {
            data,
            message: {
                status
            }
        } = res
        console.log(66666,data);
    // layui分页组件
    // 引入了layui之后使用use方法导入laypage
  layui.use(['laypage'], function(){
    let laypage = layui.laypage;              
    //调用分页
    laypage.render({
      elem: 'page', // 在页面中渲染分页组件的标签keif (!keyword
      count: data.length, // 总数据的条数
      // count:数据总条数显示 prev:上一页  next:下一页
      layout: ['prev', 'page', 'next', 'limit', 'refresh', 'skip'],
      limits:[4,8,10,12],
      limit:4,
      first:'首页',
      last:'尾页',
      groups:3,
      jump: function(obj){ // 页码跳转函数        
        let str = function(){ // 自调用函数执行,返回一个拼接好的html字符串
          var thisData = data.concat().splice((obj.curr -1)*obj.limit, obj.limit);          
          var arr = thisData.map(v=>`
          <li class="item">
          <img src="${v.imgpath.split('==========')[0]}" class="pic" alt="">
          <h3 class="item-name">${v.name}</h3>
          <p class="item-info">安全的大功率快充插线板</p>
          <p class="item-price">
              <span class="present-price">${v.price}</span>
              <span class="primary-price"></span>
              <a href="#" class="btn btn-default detail" role="button" index=${v.id}>查看详情</a>
          </p>
      </li>
          `);
          return arr.join('');
        }();
        //渲染
        $('#list').html(str);
        // 关闭弹出层
        // layer.close(index);
      }
    });     
  });
  }
})

// 使用事件委托进行查看详情的跳转
$('#list').on('click','.detail',function () {
  // 获取商品的id
  let id = $(this).attr('index');
  // 将商品id存储到sessionStorage中  在跳转的页面中页面方法到商品的id
  sessionStorage.setItem('goodsId',id);
  // 跳转
  location.href = 'detail.html';
  return false;// 阻止默认跳转
})

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