/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：悟空找房h5
 2. 页面名称：esf/list(二手房列表)
 3. 作者：zhaohuagang@lifang.com
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
class ListController extends Controller {
    constructor() {        
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        类的初始化，继承控制器基类
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        super() ;        
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        加载相关页面组件逻辑
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        require([ "../components/conning-tower.min" ] , () => {
            new ConningTower({                
                "moduleType" : "esf" ,
                "cityClick" : () => {
                    alert("在二手房城市选择器中点选了城市") ;
                }
            }) ;
        }) ;
    }        
    
}
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
类的初始化
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).ready(function() {
    new ListController ;
}) ;