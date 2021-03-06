/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：悟空找房h5
 2. 页面名称：components -> async-item(异步 绘制新房房源、二手房源、租房房源、经纪人等条目)
 3. 作者：zhaohuagang@lifang.com
 4. 备注：
    
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
 class AsyncItem {
     constructor({controller}) {
        //  this.appPath = "/wkh5_fe" ;
        //  this.appStatic = {
        //     "dev" : "//dev01.fe.wkzf" + this.appPath ,
        //     "test" : "//test01.fe.wkzf" + this.appPath ,
        //     "sim" : "//sim01.fe.wkzf" + this.appPath ,
        //     "prod" : "//cdn01.wkzf.com" + this.appPath
        //  } ;
        this.controller = controller;
     }     
     /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    绘制新房条目
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    xf(item) {
        let result = "<a class=\"xf-item\" href=\"" + item.url + "\" data-bigdata=\"" + item.bigDataParams + "\">" ;
        result += "<div class=\"img\">" ;
        result += "<img src=\"" + this.controller.staticDomain + "/wkh5_fe/images/common/loading.jpg\" class=\"lazy\" data-src=\"" + item.imageUrl + "\">" ;
        if( item.hasVideo  == 1) result += "<span class=\"play\"></span>" ;
        if( item.activitys && item.activitys[0] ) result += "<div class=\"yh\">" + item.activitys[0].title + "</div>" ;
        if(item.isHot) result += "<div class=\"hot\"><span>热销</span></div>" ;
        result += "</div>" ;
        result += "<div class=\"info\">" ;
        result += "<h3>" + item.estateName + "</h3>" ;
        result += "<p class=\"district-town-area\">" ;
        result += "<span>" + item.districtName + " " + item.townName + "</span><span>" + item.startSpace + "m²-" + item.endSpace + "m²</span>" ;
        result += "</p>" ;
        result += "<div class=\"wk-tags\">" ;
        if( item.hasActivity == "1" ) result += "<div class=\"highlight promotion\"><span>有优惠</span></div>" ;
        if( item.isSubwayEstate == "1" ) result += "<div class=\"highlight near-subway\"><span>近地铁</span></div>" ;
        if( item.hasVideo == "1" ) result += "<div><span>有视频</span></div>" ;
        if( item.isSoonOpen == "1" ) result += "<div><span>即将开盘</span></div>" ;
        else result += "<div><span>在售楼盘</span></div>" ;
        result += "</div>" ;
        result += "<p class=\"unit-price\">" ;
        let className = ( item.avgPriceWou == '0' ) ? "normal" : "" ;
        let avgPriceWou = ( item.avgPriceWou == '0' ) ? "价格待定" : item.avgPriceWou ;
        result += "<span class=\"" + className + "\">" + avgPriceWou + "</span>" ; 
        if( item.avgPriceWou != '0' ) result += "<span>元/m²</span>" ;
        result += "</div>" ;
        result += "</a>" ;
        return result ;
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    绘制二手房条目
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    esf(item) {
        let result = "<a href=\"" + item.url + "\" class=\"esf-item\" data-bigdata=\"" + item.bigDataParams + "\">" ;
        result += "<dl><dt>" ;
        result += "<img src=\"" + item.houseImgUrl + "?x-oss-process=image/resize,w_150\" alt=\"" + item.estateName + "\" class=\"lazy\">" ;
        if( item.hasVideo == 1 ) result += "<span class=\"play\"></span>" ;
        result += "</dt>" ;
        result += "<dd class=\"title\">" + item.houseTitle + "</dd>" ;
        result += "<dd>" + item.houseChild + " " + item.areaStr + " | " + item.district + " " + item.town + "</dd>" ;
        result += "<dd class=\"tags\"><div class=\"wk-tags\">" ;
        item.tagList && item.tagList.forEach( (tag)=> {
            if( tag == "降价" ) result += "<div class=\"highlight promotion\"><span>" + tag + "</span></div>" ;
            else if( tag == "新上" ) result += "<div class=\"highlight new\"><span>" + tag + "</span></div>" ;
            else if( tag == "满二" || tag == "满五唯一" ) result += "<div class=\"highlight over\"><span>" + tag + "</span></div>" ;
            else result += "<div><span>" + tag + "</span></div> " ;
        }) ;
        result += "</div></dd>" ;
        result += "<dd><span class=\"money\">" + item.totalPrice + "</span> <span class=\"unit\">万</span>&nbsp;<span class=\"price\">" + item.unitPrice + " 元/㎡</span></dd>" ;
        result += "</dl></a>" ;
        return result ;
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    绘制租房条目
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    rent(item) {
        let result = "<a data-bigdata=\"" + item.bigDataParams + "\" class=\"rent-item box\" href=\"" + item.url + "\">" ;
        result += "<div class=\"left\">" ;
        result += "<img data-src=\"" + item.firstImageUrl + "\" alt=\"" + item.estateName + "\" class=\"lazy\">" ;
        if( item.houseTag.hasVideo == 1 ) result += "<span class=\"play\"></span>" ;
        if( item.houseTag.isZeroCommission) result += "<span class=\"commission\">0 佣金</span>" ;
        result += "</div><div class=\"right\">" ;
        result += "<h4>" + item.houseTitle + "</h4>" ;
        result += "<p class=\"base-info\">" + item.houseTypeStr + "  " + item.spaceArea + "㎡ | " + item.districtAndTownName + "</p>" ;
        if( item.distanceSubway) result += "<p class=\"base-info\">" + item.distanceSubway + "</p>" ;
        result += "<div class=\"wk-tags\">" ;
        if(item.houseTag) {
            let houseTag = item.houseTag ;
            if( houseTag.isZeroCommission == 1 ) result += "<div><span>0佣金</span></div>" ;
            if( houseTag.isSubwayHouse == 1 ) result += "<div class=\"highlight near-subway\"><span>近地铁</span></div>" ;
            if( houseTag.isPriceDown == 1) result += "<div class=\"highlight depreciate\"><span>降价</span></div>" ;
            if( houseTag.isNewHouse == 1 ) result += "<div class=\"highlight new\"><span>新上</span></div>" ;
            if( houseTag.isShortRent == 1 ) result += "<div><span>可短租</span></div>" ;
            if( houseTag.isHardcover == 1 ) result += "<div><span>精装</span></div>" ;
            if( houseTag.isHardcover == 2 ) result += "<div><span>豪装</span></div>" ;
            if( houseTag.isSouth == 1) result += "<div><span>朝南</span></div>" ;
        }
        result += "</div>" ;
        result += "<p class=\"unit-price\"><span>" + item.rentPriceStr + "</span>  元/月</p>" ;
        result += "</div></a>" ;
        return result ;
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    整个组件定义结束
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
 }

//  AsyncItem.appPath = "/wkh5_fe" ;
//  AsyncItem.appStatic = {
//     "dev" : "//dev01.fe.wkzf" + AsyncItem.appPath ,
//     "test" : "//test01.fe.wkzf" + AsyncItem.appPath ,
//     "sim" : "//sim01.fe.wkzf" + AsyncItem.appPath ,
//     "prod" : "//cdn01.wkzf.com" + AsyncItem.appPath
//  } ;


 define([],function(){
     return AsyncItem;
 });