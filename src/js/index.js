$(function(){
    var $portfoliowrapper=$('.portfolio-wrapper');
    $portfoliowrapper.on('mouseenter','li',function(){
        console.log(1)
        $(this).addClass('change').siblings().removeClass('change')
    }).on('mouseleave','li',function(){
        $(this).removeClass('change')
    })
   
    var $navs=$('.tipscroll>li>a'),
    $sections=$('.section'),
    // $window=$(window),
    navlength=$navs.length-1;
    // console.log(navlength);
    // console.log($sections);
    // console.log($navs);

    $(window).scroll(function(){
        var scrollY=$(document).scrollTop();
        var len=navlength;
        if(scrollY>200){
            $('.navscroll').removeClass('hidden').addClass('show');
            $('.navbackground').removeClass('show').addClass('hidden');
        }else{
            $('.navscroll').removeClass('show').addClass('hidden');
            $('.navbackground').removeClass('hidden').addClass('show');
        }
        console.log(2)
        
        for(;len>-1;len--){
            var that=$sections.eq(len);
            if(scrollY>=that.offset().top){
                $navs.removeClass('current').eq(len).addClass('current');
                break;
            }
        }
    })
    $navs.on('click', function(e) {
        var scrollTop = $(window).scrollTop();
        console.log(1111);
        e.preventDefault();
        $('html, body').animate({
            'scrollTop': $($(this).attr('href')).offset().top
        }, 400);
        console.log(scrollTop)
    });
})