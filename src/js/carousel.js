$(function(){
    function Carousel($ct){
        this.$ct=$ct;
        this.init();
        this.bind();
        // this.tipsShow();
    }
    Carousel.prototype.init=function(){
        this.$preBtn=this.$ct.find('.arrow.pre');
        this.$nextBtn=this.$ct.find('.arrow.next');
        this.list=this.$ct.find('.pics>li');
        var imgWidth=this.imgWidth=this.$ct.find('img').width();
        var listCount=this.listCount=this.list.length;
        this.$imgCt=this.$ct.find('.pics');
        this.pageIndex=0;
        this.$tipsBtn=this.$ct.find('.tipchoose>li');

        this.isAminate=false;

        this.$imgCt.css({left:-imgWidth});
        this.$imgCt.append(this.list.first().clone());
        this.$imgCt.prepend(this.list.last().clone());
        // console.log(listCount);
        // console.log(imgWidth);
        this.$imgCt.width(((listCount)+2)*imgWidth);
        // console.log(this.$imgCt)
        // console.log(this.$imgCt.width())
        // console.log("init部分结束")
    }

    Carousel.prototype.bind=function(){
        var _this=this
        // console.log(this.$preBtn)
        // console.log('测试'+this.pageIndex)
        
        this.$preBtn.on('click',function(){
            _this.playPre(1)
        })
        this.$nextBtn.on('click',function(){
            _this.playNext(1)
        })
        this.$tipsBtn.on('click',function(){
            var _thistb=this
            var index=$(_thistb).index();
            // console.log(index);
            // console.log(_this.pageIndex);
            if(index>_this.pageIndex){
                _this.playNext(index-_this.pageIndex);
            }else if(index<_this.pageIndex){
                _this.playPre(_this.pageIndex-index);
            }
        })
    }
    Carousel.prototype.playPre=function(len){
        this.len=len;
        // console.log(len);
        // console.log(this.len);
        var _this=this;
        // console.log('外面pageindex是:'+this.pageIndex)
        if(_this.isAminate) return;
        _this.isAminate=true;
        // console.log(this.len*this.imgWidth)
        this.$imgCt.animate({left:'+='+this.len*this.imgWidth},function(){
            _this.pageIndex -=_this.len;
            // console.log('pageindex是:'+_this.pageIndex)
            // pageIndex--;
            if(_this.pageIndex<0){
                _this.pageIndex=_this.listCount-1;
                _this.$imgCt.css({left:-_this.imgWidth*_this.listCount});
            }
            // console.log(_this.pageIndex);  
            _this.tipsShow() 
            _this.isAminate=false;
        })
    }

    Carousel.prototype.playNext=function(len){
        this.len=len;
        var _this=this
        if(_this.isAminate) return;
        _this.isAminate=true;
        _this.$imgCt.animate({left:'-='+this.len*this.imgWidth},function(){
            _this.pageIndex +=_this.len;
            // pageIndex++;
            if(_this.pageIndex==_this.listCount){
                _this.pageIndex=0;
                _this.$imgCt.css({left:-_this.imgWidth});
            }
            // console.log(_this.pageIndex);
            _this.tipsShow()
            _this.isAminate=false;
        })  
    }
    Carousel.prototype.tipsShow=function(){
        var _this=this
        _this.$tipsBtn.removeClass('active').eq(_this.pageIndex).addClass('active');
    }
    var a=new Carousel($('#carousel'));
})