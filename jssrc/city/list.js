/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：悟空找房h5
 2. 页面名称：city/list(城市列表)
 3. 作者：liyang@lifang.com
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
class cityListController extends Controller {
    constructor() {
        super();
        this.tableClick();
        this.choseCity();
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
       根据定位是否成功显示或隐藏定位的信息
       -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        if($.cookie('location_cityName')){
            $('.location').html( $.cookie('location_cityName'));
           /* $('.location').attr('data-pinyin',$.cookie('location_cityPinyin'));
            $('.location').attr('data-cityid',$.cookie('location_cityId') )*/
        }else {
            $('.inside-city').hide();
        }
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        动态渲染高度 和头部的置顶
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        if (!($('.table-name').length > 0)){
        $('.dic-name').css('position','static');
        $('.city-list').css('margin-top',0);
        }else {
            $('.city-list').css('margin-top',$('.dic-name').height());
        }
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
   table点击事件
   -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    tableClick() {
      $(".table-name > ul >li ").click(function () {
          $(this).siblings().removeClass('table-active');
          $(this).addClass('table-active');
          let indexP = $(this).index();
          if  (indexP == 0){
              $('.domestic-list').show();
              $('.oversea-list').hide();
          }else if (indexP == 1){
              $('.domestic-list').hide();
              $('.oversea-list').show();
          }
      });
    };
     /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    选取城市并跳转
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    choseCity() {
        let pinyin ='';
        let cityId ='';
        let self = this;
        $('.inside-city-list >ul > li').click(function () {
            pinyin =  $(this).attr('data-pinyin');
            cityId =  $(this).attr('data-cityid');
            let cityName =  $(this).html();
            self.backOrigin(pinyin,cityId,cityName)
        });

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
            for(let i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
            }
        }
        return theRequest;
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    返回最终的来源   @businessType : 业务类型，可以是old (二手房) | new (新房) | rent (租房) | xfPrice (新房价格行情) | esfPrice (新房价格行情)，只当前模块是哪个业务
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    backOrigin(pinyin,cityId,cityName) {
        if (this.GetRequest()['businessType'] == "old") {
            window.location.href = '/' + pinyin + "/esf"
        } else if (this.GetRequest()['businessType'] == "new") {
            window.location.href = '/' + pinyin + "/xflist"
        } else if (this.GetRequest()['businessType'] == "rent") {
            window.location.href = '/' + pinyin + "/rent/?channel=jrttsub"
        } else if(this.GetRequest()['businessType'] == "xfPrice") {
            window.location.href = "/xfPrice/price.html?regionId="+cityId+"&regionType=1"
        }else if(this.GetRequest()['businessType'] == "esfPrice") {
            window.location.href = "/esfPrice/price.html?regionId="+cityId+"&regionType=1"
        }
        $.cookie('userSelectedCity',pinyin,{path: '/',});
        $.cookie('userSelectedCityId',cityId,{path: '/',});
        $.cookie('userSelectedCityName',cityName,{path: '/',});
    }
}
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    类的初始化
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).ready(function () {
    new cityListController;
});