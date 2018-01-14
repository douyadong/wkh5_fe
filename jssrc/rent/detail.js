/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：悟空找房h5
 2. 页面名称：rent/detail(租房-详情)
 3. 作者：tangxuyang@lifang.com
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
class DetailController extends Controller {
    constructor() {
        super(); 
        
        /*
            使用requirejs引入组件
        */        
        let self = this;
        require(['../components/assistant.min','../components/album.min','../components/bigdata.min', '../components/preview-image.min'],function(assistant,album, BigData, PreviewImage){        
            BigData.init(self);

            BigData.bigData({
                pageName: '1204',
                pageParam: {
                    rent_house_id: $('#houseId').val()
                },
                type: 1
            });

            //评论中图片添加预览功能
            PreviewImage('.rent-comments');
        }); 
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        下载条的关闭按钮事件赋予
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        $(".download-app .icon-remove").click(function(){
            $(".content-wrapper").css({ "padding-bottom" : 0 }) ;
        }) ;

        //外来房源基本信息
        var $externalSellPoint = $('.external-sellpoint');
        if($externalSellPoint.length>0){
            let lineNum = parseInt($externalSellPoint.css('height')) / parseInt($externalSellPoint.css('line-height'));
            if(lineNum > 5){//超过五行了
                $externalSellPoint.css('max-height',parseInt($externalSellPoint.css('line-height'))*5 + 'px');
                $externalSellPoint.after($('<div class="more">查看更多</div>').click(function(){
                    $externalSellPoint.css('max-height','100%');
                    $(this).remove();
                }));
            }
        }
    };   
}

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
类的初始化
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).ready(function() {
   new DetailController;
});
