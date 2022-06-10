function enlarge(){
    $('.detail .enlarge .small ul li').click(function(){
        $(this).addClass('active').siblings().removeClass('active')
        $('.middle>img').attr('src',$(this).find('img').attr('src'))
        $('.big>img').attr('src',$(this).find('img').attr('src'))
    })
    $('.middle').hover(function(){
        $('.middle .shade').css('display','block')
        $('.middle .big').css('display','block')
        $('.middle').on('mousemove',function(e){
            var x = e.pageX;
            var y = e.pageY;
            var l = x - $('.middle').offset().left - $('.shade').width()/2
            var t = y - $('.middle').offset().top - $('.shade').height()/2
            if(l<=0){
                l=0
            }
            if(t<=0){
                t=0
            }
            if(l>=$('.middle').width()-$('.shade').width()){
                l = $('.middle').width()-$('.shade').width()
            }
            if(t>=$('.middle').height()-$('.shade').height()){
                t = $('.middle').height()-$('.shade').height()
            }
            $('.shade').css({
                left:l+"px",
                top:t+"px"
            })
            var xPercent = l/$('.middle').width()
            var yPercent = t/$('.middle').height()
            var bigl = xPercent * $('.big>img').width()
            var bigt = yPercent * $('.big>img').height()
            $('.big>img').css({
                left:-bigl + "px",
                top:-bigt + "px"
            })
        })
    },function(){
        $('.middle .shade').css('display','none')
        $('.middle .big').css('display','none')
    })
    $('.small>a.leftBtn').on('click',function(){
        var l = $('.small ul').position().left
        $('.small ul').animate({
            left:l - 55
        })
        return false;
    })
    $('.small>a.rightBtn').on('click',function(){
        var l = $('.small ul').position().left
        $('.small ul').animate({
            left:l + 55
        })
        return false;
    })
}