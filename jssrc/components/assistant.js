/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：悟空找房h5
 2. 页面名称：components -> assistant(底部助手条)
 3. 作者：tangxuyang@lifang.com
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
define(function(){    
    $(".wx").click(function(){
        $.modal({
            "id" : "addWechatModal" ,
            "title" : "扫码加微信" ,
            "content" : "<img src=\"" + $(this).data("agentwchartqrimgurl") + "\" style=\"width : 12rem ; height : 12rem ; \"><p>微信号：" + $(this).data("agentwchatid") + "</p>" ,
            "buttons" : [
                { "text" : "确定"  , "clickCallback" : function(){ $.modal.close("addWechatModal") ; } }               
            ]
        }) ;
    }) ;
    return {} ;
}) ;