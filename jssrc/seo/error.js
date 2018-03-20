/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：悟空找房数据决策
 2. 页面名称：seo/error(错误页面)
 3. 作者：zhaohuagang@lifang.com
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
class ErrorController extends Controller {
    constructor() {
        super() ;
        this.remainer = 3 ;  //还剩多少秒
        this.countdown() ;
    } ;
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    倒计时并跳转
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    countdown() {
        $(".container .countdown").text(this.remainer) ;
        window.setInterval( ()=> {            
            if(this.remainer) this.remainer -- ;
            $(".container .countdown").text(this.remainer) ;
            if( this.remainer === 0 ) window.location.href = "/" ;
        } , 1000 ) ;
    } ;   
}
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
类的初始化
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).ready(function() {
    new ErrorController;
}) ;
