/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：悟空找房h5
 2. 页面名称：components -> swiper(底部助手条)
 3. 作者：tangxuyang@lifang.com
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
 define(['../lib/swiper-3.4.2.jquery.min'],function(Swiper){
    var swiper = new Swiper('.album');

    //

    //图片预览    
    $('.album .img').click(function(){
       
        var url = $(this).data('url');        
        var $preview = $('.album').siblings('.preview-image');
        if($preview.length == 0){
            $preview = $('<div class="preview-image"><img src=""></div>');            
            $('.album').before($preview);
        }

        $preview.find('img').attr('src',url);
        $('body').css('overflow-y','hidden');//去掉垂直滚动条
        $preview.show();
    });

    $('body').on('click','.preview-image',function(){
        var $preview = $('.album').siblings('.preview-image');
        $preview.hide();
        $('body').css('overflow-y','auto');//
    });
    

    return {};
 });