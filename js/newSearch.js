let timer
// $(selector).on({click:fn1,mouseover:fn2})
$('#search').on("input", Write)
$('#search').on("focus", Out)
$('#search').bind('blur', Cicle)


function Write() {

     keyword = String(this.value)
    // console.log(keyword);
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
            // console.log(data,message);
            // let {data:}
            //  console.log(data);   
            let itemStr = data.map(v => {
                return `
                    <li index='${v.id}' class='tiao'>${v.name}</li>
                    `
            }).join('')
            // console.log(itemStr);
            $('#search-box').html(itemStr)

            $('#search-btn').on("click", toList)
        }
    })
}
function Cicle() {
clearInterval(timer)
timer=setTimeout(function(){
     $('#search-box').css('display', 'none')
    },300)
    // console.log(666);
}

function Out() {
    $('#search-box').css('display', 'block')
}
// $('#search-box').blur(function(){
//     console.log(888);
//     $('#search-box').css('display', 'none')
// })

//   // 事件委托的方式给 button 绑定点击事件
//   $('div').on('click', 'button', function () {
//     console.log(this) // button 按钮
// })

// // 事件委托的方式给 button 绑定点击事件并携带参数
// $('div').on('click', 'button', { name: 'Jack' }, function (e) {
//     console.log(this) // button 按钮
//     console.log(e.data)
// })


$('#search-box').on('click', '.tiao', function () {
    let id = $(this).attr('index');
    console.log(id);
    // 将商品id存储到sessionStorage中  在跳转的页面中页面方法到商品的id
    sessionStorage.setItem('goodsId', id);
    // 跳转
    location.href = 'detail.html';
    return false; // 阻止默认跳转
})



function toList(){
//  // 获取商品的id
//     let id = $(this).attr('index');
//     // 将商品id存储到sessionStorage中  在跳转的页面中页面方法到商品的id
//     sessionStorage.setItem('goodsId',id);
//     // 跳转
    // let info=keyword;
    // keyword = String($('#search').value)
    // console.log(66666666,keyword);
    sessionStorage.setItem('info',keyword)
    location.href = 'search-list.html';
    return false;// 阻止默认跳转
}


  