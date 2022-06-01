
    /*      
        面向对象编程
          - 根据需求找对象,找不到可以完成此需求的对象,则自己创建对象
          - 为了功能可以复用,我们一般都通过自定义构造函数来创建对象
          - 创建出来的对象实现功能
        面向对象编程实现选项卡切换
          - 自定义构造函数
            + 一般将操作的DOM元素在构造函数中给实例对象当做属性添加
          - 实例化对象,用实例化的对象调用某一个方法完成功能
            + 一般实例对象调用的方法,不会在构造函数中给实例对象添加
            + 一般将方法 添加给原型对象
     */
    // 1. 自定义一个 tab构造函数
    function Tab() {
        // 获取元素,并添加到实例对象的属性中
        this.ulis = document.querySelectorAll('ul>li');
        this.olis = document.querySelectorAll('ol>li');
    }
    // 给原型对象添加 change方法
    Tab.prototype.change = function () {
        // 此方法中实现切换效果
        // 1. 给ulis中的每一个li绑定点击事件
        // console.log( this.ulis )
        this.ulis.forEach((v, i) => {
            // 给每一个ul>li绑定点击事件
            v.onclick = () => {
                // 让所有ul>li清除active样式
                this.ulis.forEach(t => t.classList.remove('active'))
                this.ulis[i].classList.add('active');
                // 让ol>li跟随显示
                // 让所有ol>li清除active样式
                this.olis.forEach(k=>k.classList.remove('active'));
                this.olis[i].classList.add('active');
            }
        })
    }

    // 2. 实例化对象
    let tab = new Tab();
    // console.log( tab )
    tab.change();
