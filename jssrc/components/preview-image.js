/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：悟空找房h5
 2. 页面名称：components -> preview-image(图片预览)
 3. 作者：tangxuyang@lifang.com
 4. 依赖：swiper
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * 用法：
 * PreviewImage(container)
 * container: 是包含有图片的容器，其中图片要有preview-image-item类
 */

 define(['../components/swiper-3.4.2.jquery.min'],function(Swiper){

    function addListener(){
        $('body').on('touchmove',function(e){
            e = e || window.e;
            e.preventDefault();
            e.stopPropagation();
        })
    }

    function removeListener(){
        $('body').off('touchmove');
    }

    return function(container){
        let swiper = $(container).data('preview-swiper');            
        if(!swiper){
            let $imgs = $(container).find('.preview-image-item');//获取所有要预览的图片
            let id = (new Date).getTime();

            let str = '<div class="swiper-container preview-image" id="'+id+'">' + 
                        '<div class="swiper-wrapper">';
            $imgs.each(function(index,img){
                str += '<div class="swiper-slide">' + 
                            '<div class="preview-item">' +
                                '<img src="'+$(img).attr('src')+'">' + 
                                '<div class="indicator">' + 
                                (index + 1) + '/' + ($imgs.length) + 
                                '</div>' + 
                            '</div>' +
                        '</div>'; 
                $(img).data('index',index);           
            });
            
            str += "</div></div>";         
                
            $imgs.click(function(){
                let index = $(this).data('index');
                let $preview = $('#'+id);
                if($preview.length == 0){
                    $('body').append(str);
                    swiper = Swiper('#' + id, {
                        initialSlide: index
                    });
                    $(container).data('preview-swiper',swiper);

                    //退出预览模式
                    $('#' + id).on('click',function(){                                     
                        $(this).hide();
                        $('body').removeClass('preview-image-open');//
                        $('html').removeClass('preview-image-open');
                        removeListener();
                    });
                }

                swiper.slideTo(index);
                $('body').addClass('preview-image-open');//去掉垂直滚动条
                $('html').addClass('preview-image-open');
                addListener();
                $preview.show();                
            });            
        } else {
            
        }

        
    };

    /*
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <%
                    if(imgList && imgList.length> 0){
                        for(let i = 0; i < imgList.length; i++){
                            if(!imgList[i].isVideo){
                %>
                    <div class="swiper-slide">
                        <div class="preview-item">
                            <img src="">
                            <div class="indicator">
                                <%= i+1 - startIndex%>/<%= imgList.length - startIndex%>
                            </div>             
                        </div>
                    </div>
                <%
                            }
                        }
                    }
                %>
                
            </div>
        </div>
    */



 });