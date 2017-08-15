$(function(){
    var curPage=1
    var perPageCount=7
    var liwidth=$('.item').outerWidth(true);
    var waterfallarr=[]
    var arrlen=parseInt($('.pic').width()/liwidth)
    for(var i=0;i<arrlen;i++){
        waterfallarr[i]=0
    }
    /*
    1、获取数据（ajax）
    2、将数据拼装成dom，通过瀑布流算法渲染显示到页面
    （这里，数据获取加载之后，我才能知道img的高度是多少，需要做个load事件）
    3、懒加载，隐藏的.load元素显示时，就请求数据加载显示，循环回第一步
    */
    Loaddata()
    function Loaddata(){
        getData(function(newsList){
            $.each(newsList,function(idx,news){
                var $nodes=getNodes(news)
                $nodes.find('img').load(function(){
                    $('.pic').append($nodes)
                    // console.log($nodes,'loading。。。')
                    waterFallPlace($nodes)
                })
            })
        })
    }
    /*当浏览器窗口放大缩小时*/
    $(window).resize(function(){
        Loaddata()
    })
    $('.loadpicture').on('click',function(){
        Loaddata()
    })
    /*从接口获取数据*/
    //新浪新闻接口： http://platform.sina.com.cn/slide/album_tech?jsoncallback=func&app_key=1271687855&num=3&page=4
    //http://platform.sina.com.cn/slide/album_tech
    function getData(callback){
        $.ajax({
            url:'http://platform.sina.com.cn/slide/album_tech',
            dataType:'jsonp',
            jsonp:'jsoncallback',
            data:{
                app_key:'1271687855',
                num:perPageCount,
                page:curPage
            }
        }).done(function(res){
            if(res && res.status && res.status.code==="0"){
                callback(res.data); 
                curPage++
            }else{
                console.log('get data error');
            }
        })
    }
    /*html的拼装*/
    function getNodes(item){
        var html=''
        html += '<li><a href="' +item.url+ '" class="link">'
        html += '<img src="'+item.img_url+'" alt="" class="waterimg"></a></li>'
        return $(html)
        //返回一个jquery对象
    }
    //瀑布流
    function waterFallPlace($nodes){
        $nodes.each(function(){
            var minValue=Math.min.apply(null,waterfallarr)
            var minIndex=waterfallarr.indexOf(minValue)
            $(this).css({
                top:waterfallarr[minIndex],
                left:$(this).outerWidth(true) * minIndex, //计算包括外边距
                opacity:1
            })
            waterfallarr[minIndex] += $(this).outerHeight(true);
            $('.pic').height(Math.max.apply(null,waterfallarr));
        })
    }
})