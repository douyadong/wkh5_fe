/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：悟空找房h5
 2. 页面名称：components -> album(底部助手条)
 3. 作者：tangxuyang@lifang.com
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
 define(['../components/swiper-3.4.2.jquery.min','./preview-image.min'],function(Swiper,PreviewImage){
     var swiper = new Swiper('.album');

    // //图片预览    
    // var previewSwiper;
    // $('.album .img').click(function(){
       
    //     var url = $(this).data('url');   
    //     var index = $(this).data('index');     
    //     var $preview = $('.album').siblings('.preview-image');
    //     if($preview.length == 0){
    //         $preview = $('.album .preview-image-template .swiper-container').clone().addClass('preview-image');
    //         $('.album').after($preview);
    //         previewSwiper = new Swiper('.preview-image',{
    //             initialSlide: index
    //         });
    //     }
        
    //     previewSwiper.slideTo(index);
    //     $('body').addClass('preview-image-open');//去掉垂直滚动条
    //     $preview.show();
    // });

    // //退出预览模式
    // $('body').on('click','.preview-image',function(){
    //     var $preview = $('.album').siblings('.preview-image');
    //     $preview.hide();
    //     $('body').removeClass('preview-image-open');//
    // });

    PreviewImage('.album');
    return {};
 });