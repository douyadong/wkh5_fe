/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：悟空找房h5
 2. 页面名称：components -> swiper(底部助手条)
 3. 作者：tangxuyang@lifang.com
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
 define(['../components/swiper-3.4.2.jquery.min'],function(Swiper){
    var swiper = new Swiper('.album');

    //

    //图片预览    
    var previewSwiper;
    $('.album .img').click(function(){
       
        var url = $(this).data('url');   
        var index = $(this).data('index');     
        var $preview = $('.album').siblings('.preview-image');
        if($preview.length == 0){
            $preview = $('.album .preview-image-template .swiper-container').clone().addClass('preview-image');// $('<div class="preview-image"><img src=""></div>');            
            $('.album').after($preview);
            previewSwiper = new Swiper('.preview-image');
        }

        $preview.find('img').attr('src',url);
        previewSwiper.slideTo(index);
        $('body').addClass('preview-image-open');//去掉垂直滚动条
        $preview.show();
    });

    $('body').on('click','.preview-image',function(){
        var $preview = $('.album').siblings('.preview-image');
        $preview.hide();
        $('body').removeClass('preview-image-open');//
    });
    

    return {};
 });