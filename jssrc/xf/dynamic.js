/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：悟空找房h5
 2. 页面名称：xf/detail(新房-详情)
 3. 作者：zhaohuagang@lifang.com
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
 class DynamicController extends Controller {
    constructor() {
        super() ; 
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        给页面元素绑定事件
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        this.addEventListener() ;
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        组件逻辑的引入
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/    
        let self = this ;
        require([ '../components/bigdata.min'],function(BigData){        
            BigData.init(self) ;
            BigData.bigData({
                pageName : '1110' ,
                pageParam : {
                    new_house_id : $('#subEstateId').val()
                } ,
                channel : self.GetRequest()['channel'] || "" ,
                type : 1
            }) ;            
        }) ; 
        
    }
   /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    截取？后面的参数
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    GetRequest() {
        let url = location.search;
        let theRequest = {};
        if (url.indexOf("?") !== -1) {
            let str = url.substr(1);
            let strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=strs[i].split("=")[1];
            }
        }
        // console.log(theRequest);
        return theRequest;
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    给页面元素绑定事件
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    addEventListener() {        
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        点击电话咨询按钮，让页面跳转
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        $(".consult-phone").click(function(){            
            window.location.href = $(this).attr("data-href") ;
        }) ;        
    }
    
}

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
类的初始化
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).ready(function() {
   new DynamicController ;
}) ;