/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：悟空找房h5
 2. 页面名称：trend/new/district(新房价格行情 区域)
 3. 作者：liyang@lifang.com
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
class districtController extends Controller {
    constructor() {
        super();

        let that = this;
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        搜索框的点击：
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        require(['../../components/trend-search.min'],function(listSearch){
            listSearch.init(that,"newhouselist");
            listSearch.selectFun("icon-search");
        });
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        定位的一个实例
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        new Location({
            businessType : "newTrend" ,
            cityApiUrl : this.apiUrl.common.getCityByLatLon ,
            identical : (position)=> {

            },
            investmentFlag:(Flag)=>{
                if (Flag.investment){
                    $('notopen-investment').show();
                }else {
                    $('notopen-investment').hide();
                }
            }
        }) ;
    }
}
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
类的初始化
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).ready(function() {
    new districtController;
});