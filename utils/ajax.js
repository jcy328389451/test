/**
 * ajax请求函数
 * @param {object} options 请求参数对象 {url,method,sync,dataType,data,success}
 */
function ajax(options={}) {
  // 1. 请求地址参数校验
  if(!options.url){ // 因为请求地址是必填的,没有则抛出异常
    // 手动抛出异常,throw语法 
    // 异常: new Error(异常信息)
    throw new Error('请求地址不能为空');
  }
  // 2. 准备一个默认参数对象
  let info = {
    method:'get',
    sync:true,
    dataType:'string',
    data:{},
    success:function () {}
  }

  // 3. 将传递的参数替换默认值
  // 遍历传入的对象,将默认参数对象中的值替换
  for (const key in options) {
    info[key] = options[key];
  }

  // 4. 将传递参数的对象转为查询字符串
  // 遍历data对象
  let qStr = '';
  for (const key in info.data) {
    qStr += `${key}=${info.data[key]}&`;
  }
  // 截取方式去除最后一个&,如果没有携带参数则不需要截取
  qStr = qStr?qStr.slice(0,-1):'';
  
  // 5. 创建ajax对象
  let xhr = new XMLHttpRequest();
  // 6. 配置请求信息并发送请求
  if(info.method.toLowerCase() === 'get'){
    xhr.open('get',`${info.url}?${qStr}`);
    xhr.send();
  }else{
    xhr.open('post',`${info.url}`);
    xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
    xhr.send(qStr);
  }
  // 7. 获取响应
  xhr.onload = function () {
    // 8. 判断是否转换json
    let res;
    if(info.dataType==='json'){
      res = JSON.parse(xhr.responseText);
    }else{
      res = xhr.responseText;
    }
    // 9. 获取响应完成,执行函数
    info.success(res);
  }
}


// 使用Promise来封装ajax请求函数
function pAjax(options = {}) {
  return new Promise(resolve => {
    // 调用ajax函数发起请求
    ajax({
      url: options.url || '',
      method: options.method || 'get',
      sync: typeof (options.sync) != 'boolean' ? true : options.sync,
      dataType: options.dataType || 'string',
      data: options.data || {},
      success: options.success || function (res) {
        resolve(res);
      }
    })
  })
}
