// 封装前端操作cookie的函数

/**
 * 设置cookie的函数 
 * @param {string} key cookie的键名
 * @param {string} val  cookie的键值
 * @param {object} options 设置的路径和有效时间的 对象 {path:/,expires:10}
 */
function setCookie(key, val, options = {}) {
  // 判断传递的options对象中的是否有 expires和path
  let path = options.path || '';
  let expires = options.expires || '';
  // 组装cookie数据的字符串
  // es6中的模板字符串----反引号包裹--可以换行书写,可以书写变量 ${变量}  
  let str = `${key}=${val}`;
  // 判断是否传递了path路径.传递了追加到cookie数据字符串中
  if (path) str += `;path=${path}`;
  // 判断是否传递了expires路径.传递了追加到cookie数据字符串中
  if (expires) {
    // 计算有效时间
    let t = new Date();
    // expires秒后失效
    let sT = t.getTime() - 8 * 60 * 60 * 1000 + expires * 1000;
    let sTobj = new Date(sT);
    str += `;expires=${sTobj}`;
  }
  // 设置cookie
  document.cookie = str;
}

/**
 * 根据键名设置cookie失效的函数
 * @param {string} key 要删除的cookie键名
 * @param {string} path 要删除的cookie的路径
 */
function delCookie(key,path='') {
  // 调用setCookie方法设置对应的cookie过期
  setCookie(key,'',{expires:-1,path:path});
}

// 根据键名获取cookie的函数
function getCookie(key) {
  // 获取所有的cookie
  let cookies = document.cookie;
  // console.log( cookies )// name=zs; age=18; hobby=ctrl; study=code
  // 将获取的cookie字符串转为数组
  let cookieArr = cookies.split('; ');
  // console.log( cookieArr );
  // 定义一个变量接受cookie值
  let str = '';
  cookieArr.forEach(item=>{
    // 将每个cookie键值对字符串转为数组 '='     
    // console.log( item.split('=') )
    // 如果数组的第一个元素和传入的键名一样,中的数组的第二个元素就是属性值
    // if(item.split('=')[0]===key) {
    //   str = item.split('=')[1];
    // }
    if(item.split('=')[0]===key) str = item.split('=')[1];
  })
  return str;
}


