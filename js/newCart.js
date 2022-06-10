// 购物车页面的js代码
// 通过cookie获取用户名
let username = getCookie('username');
if (!username) {
  layer.msg('非法请求,请先登录');
  location.href = 'login.html';
}

// 渲染本地购物车页面
ff();
function ff() {
  // 获取本地购物车数据
  let cart = localStorage.getItem('goodsData');
  if (!cart) {
    // 如果购物车没有任何数据,则渲染对应的内容
    $('.cart>.content').html(`<div style="padding-left:10px;" class="jumbotron">
    <h1>购物车空空如也!</h1>
    <p>赶快去列表页挑选商品吧</p>
    <p><a class="btn btn-primary btn-lg" href="list.html" role="button">去列表页</a></p>
  </div>`)
  } else {
    // cart中有数据,转为数组
    let cartArr1 = JSON.parse(cart);
    // 通过filter方法,将不是对应用户的数据筛选出
    let cartArr = cartArr1.filter(v => v.username === username);
    if (cartArr.length === 0) {
      $('#cart_goods_area').html(`<div style="padding-left:10px;" class="jumbotron">
      <h1>购物车空空如也!</h1>
      <p>赶快去列表页挑选商品吧</p>
      <p><a class="btn btn-primary btn-lg" href="list.html" role="button">去列表页</a></p>
    </div>`)
    } else {
      // 有数据,则获取对应的ids
      let ids = cartArr.map(v => v.id).join();
      // 定义个发送请求及渲染页面的函数
      fn();
      async function fn() {
        // 发送请求
        let res = await pAjax({ url: '../server/cart.php', data: { ids }, dataType: 'json' });
        // 结构获取数据
        let { data } = res;
        // 拼接html字符串,然后渲染到页面
        // console.log(data)
        // 先拼接头部标签字符串
        let htmlStr = `<table class="table">
      <thead>
          <tr>
              <th style="text-align:center"><input type="checkbox" name="selectAll"></th>
              <th style="text-align:center">商品图片</th>
              <th style="text-align:center">商品名称</th>
              <th style="text-align:center">商品价格</th>
              <th style="text-align:center">商品数量</th>
              <th style="text-align:center">小计</th>
              <th style="text-align:center">操作</th>
          </tr>
      </thead>
      <tbody>`;
        // 循环data拼接中间的html字符串
        data.forEach(v => {
          // 遍历cartArr,通过find方法找到对应的购物车对象,并获取购买数量
          let num = cartArr.find(t => t.id === v.id).num;
          htmlStr += `
        <!--将商品的id和库存存储到表单的属性中-->
        <tr valign="bottom" stock=${v.stock} index=${v.id}>
          <td><input type="checkbox" name="selectOne"></td>
          <td style="text-align:center"><img src="${v.imgpath.split('==========')[0]}" width="50" height="50"></td>
          <td>${v.name}</td>
          <td class="price">￥<span>${v.price}</span></td>                    
          <td class="number">
              <button class="btn btn-default reduce">-</button>
              <input type="text" name="number" value="${num}">
              <button class="btn btn-default add">+</button>
          </td>
          <td class="subtotal">￥<span>${v.price * num}</span></td>
          <td><button class="btn btn-danger remove">移除</button></td>
        </tr>         
        `;
        });
        // 最后拼接尾部的html字符串
        htmlStr += `
      </tbody>
        <tfoot>
            <tr>
                <td><input type="checkbox" name="selectAll"></td>
                <td colspan="2">商品总数：<span class="totalNum">0</span></td>
                <td colspan="2">商品总价：<span class="totalPrice">0</span></td>
                <td><a class="btn btn-primary" href="list.html">回列表页</a></td>
                <td><a class="btn btn-warning" href="order.html">去结算</a></td>
            </tr>
        </tfoot>
      </table>
      `;
        // 渲染htmlStr字符串
        $('#cart_goods_area').html(htmlStr);
        // 渲染完毕后,调用事件绑定的函数
        bindClick();
        addAndReduce();
        removeBind();
      }
    }
  }
}

// 定义一个计算总数和总价并渲染的函数
function countSumAndTotal() {
  let sum = 0; // 总数
  let total = 0;// 总价
  $('input[name=selectOne]').each((i, v) => {
    if ($(v).prop('checked')) {
      sum += $(v).parent().parent().find('input[name=number]').val() - 0;
      total += $(v).parent().parent().find('.subtotal>span').text() - 0;
    }
  })
  // 将总数和总价渲染
  $('.totalNum').text(sum);
  $('.totalPrice').text(total);
}

// 定义一个函数--绑定全选和单个勾选的点击事件
function bindClick() {
  // 全选点击事件
  $('input[name=selectAll]').click(function () {
    // 将每一个单个勾选的复选框的checked属性的值和全选复选框的checked的值保持一致
    $('input[name=selectOne]').prop('checked', $(this).prop('checked'));
    // 两个全选复选框,保持一致的勾选状态
    $('input[name=selectAll]').prop('checked', $(this).prop('checked'));
    // 调用计算总价和总数的函数
    countSumAndTotal()
  })
  // 单个勾选的复选框 点击事件
  $('input[name=selectOne]').click(function () {
    // 当所有的单个勾选复选框,都勾选的时候,全选复选框应该勾选上
    //  只有有一个单个勾选框,没有勾选,则全选复选框不应该勾选上

    // 将获取的所有单个勾选复选框 转为真数组
    let flag = [...$('input[name=selectOne]')].every(v => $(v).prop('checked'));
    $('input[name=selectAll]').prop('checked', flag);
    countSumAndTotal();
  })
}


// +和-的点击事件函数
function addAndReduce() {
  // + 的点击事件
  $('.add').click(function () {
    // 点击+的时候,将-的禁用解除
    $('.reduce').prop('disabled', false);
    // 获取点击的购物商品id和库存    
    let id = $(this).parent().parent().attr('index');
    let stock = $(this).parent().parent().attr('stock') - 0;
    // 获取当前的购买数量
    let num = $(this).prev().val() - 0;
    num++;
    if (num > stock) {
      layer.msg('购买数超过库存');
      // 将+按钮禁用
      $(this).prop('disabled', true);
      num = stock;
    }
    // 将num渲染到输入框中
    $(this).prev().val(num);
    // 修改本地购物车中的数据
    // 获取本地数据
    let cartArr = JSON.parse(localStorage.getItem('goodsData'));
    let cartObj = cartArr.find(v => v.id === id && v.username === username);
    // 修改购物数据
    cartObj.num = num;
    // 将修改后的cartArr写回到本地数据中
    localStorage.setItem('goodsData', JSON.stringify(cartArr));

    // 获取价格
    let price = $(this).parent().prev().find('span').text() - 0;
    // 计算小计并渲染
    $(this).parent().next().find('span').text(price * num);
  })

  // -点击事件
  $('.reduce').click(function () {
    // 点击-的时候,将+的禁用解除
    $('.add').prop('disabled', false);
    // 获取点击的购物商品id和库存
    let id = $(this).parent().parent().attr('index');
    // 获取当前的购买数量
    let num = $(this).next().val() - 0;
    num--;
    if (num < 1) {
      layer.msg('购买数最少为1');
      // 将-按钮禁用
      $(this).prop('disabled', true);
      num = 1;
    }
    // 将num渲染到输入框中
    $(this).next().val(num);
    // 修改本地购物车中的数据
    // 获取本地数据
    let cartArr = JSON.parse(localStorage.getItem('goodsData'));
    let cartObj = cartArr.find(v => v.id === id && v.username === username);
    // 修改购物数据
    cartObj.num = num;
    // 将修改后的cartArr写回到本地数据中
    localStorage.setItem('goodsData', JSON.stringify(cartArr));
    // 获取价格
    let price = $(this).parent().prev().find('span').text() - 0;
    // 计算小计并渲染
    $(this).parent().next().find('span').text(price * num);
  })

  // 给输入框一个失去焦点事件
  $('input[name=number]').blur(function () {
    // 获取点击的购物商品id和库存
    let id = $(this).parent().parent().attr('index');
    let stock = $(this).parent().parent().attr('stock') - 0;
    // 获取本地数据
    let cartArr = JSON.parse(localStorage.getItem('goodsData'));
    let cartObj = cartArr.find(v => v.id === id && v.username === username);
    // 获取输入的内容
    let val = $(this).val();
    if (!/^\d+$/.test(val)) { // 校验只能为数字
      layer.msg('请输入购买数');
      $(this).val(cartObj.num);
    }
    if (val < 1) {
      layer.msg('购买数最小为1');
      $(this).val(cartObj.num);
    }
    if (val > stock) {
      layer.msg('购买数超出库存');
      $(this).val(stock);
    }
    // 获取此时输入框的值,并修改本地购物车的数据,然后重新写入
    let num = $(this).val() - 0;
    cartObj.num = num;
    // 将修改后的cartArr写回到本地数据中
    localStorage.setItem('goodsData', JSON.stringify(cartArr));
    // 获取价格
    let price = $(this).parent().prev().find('span').text() - 0;
    // 计算小计并渲染
    $(this).parent().next().find('span').text(price * num);
  })
}

// 移除事件函数
function removeBind() {
  $('.remove').click(function () {
    // 弹窗,确定或取消
    let index = layer.confirm('你真的要移除此商品', () => {
      // 点击确定的回调函数
      // 获取商品的id
      let id = $(this).parent().parent().attr('index');
      // 获取本地购物车数据
      let cartArr = JSON.parse(localStorage.getItem('goodsData'));
      // 使用数组的过滤方法
      let res = cartArr.filter(v => !(v.id == id && v.username == username));
      // 将过滤后的数据存储会本地
      localStorage.setItem('goodsData', JSON.stringify(res));
      // 移除当前的tr标签
      $(this).parent().parent().remove();
      countSumAndTotal();
      // 判断页面中有多少个商品购物车,如果为0则重新渲染
      if($('input[name=selectOne]').length==0) ff();
      // 关闭弹出窗口
      layer.close(index);
    }, () => {
      // 点击取消的回调函数
      layer.msg('取消成功,快付钱吧');
    })
  })
}

