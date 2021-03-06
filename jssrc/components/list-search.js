/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：悟空找房h5
 2. 页面名称：components -> listSearch（搜索框的组件）
 3. 作者：liyang@lifang.com
    参数说明：
    channelFlag      频道来源标识的值
    conditionObject  符合SEO要求的字符串转成的对象
    url              完整路径的URL（不包含query参数）
    areasLineSting   query参数（?）包含检索当中的区域与地铁的互斥
    cityId           城市的ID
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

define(function(){
    let that;
    let searchInputClick = function (channelFlag,conditionObject,url,areasLineSting,cityId) {
        let acWordHouseList = '';  // 联想词
        let valueSearch =''; // 检索搜索框的value值
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        搜索框的点击：
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

        $('#searchInput').click(function () {
            $('.rent-search').siblings('ul').addClass('on-hide');
            $('.all-control').addClass('on-hide');
            $('.search-result').show();
            $('.show-result').hide();
            $('.icon-hanbao').hide();
            if ($('#searchInput').val()){
                $('.conone').show();
            }else {
                $('.conone').hide();
            }
            if (GetRequest()['channel']){
                $('.rent-search').addClass('active-search-channel');
                $('.cancel-channel').show();
                $('.location-all').hide();
                $('#searchInput').css({"background-color":"#F8F8F8",'width':"100%"});
            }else {
                $('.input-kw-form').css({"background-color":"#f0f0f0"});
                $('.rent-search').addClass('active-search');
                $('.back').hide();
                $('.fanhui').show();
                $('.contwo').hide();
            }

            if (JSON.parse(localStorage.getItem('searchHistory')) && !acWordHouseList) {  // Storage取值渲染
                $('body').css('background-color','#F0F0F0');
                $('.have-result').show();
                let searchHistory = JSON.parse(localStorage.getItem('searchHistory')).reverse();
                let listSearchHistory = '';
                /* 埋点的参数*/
                let bigdata =encodeURIComponent(JSON.stringify({
                    eventName: '1203005',
                    channel:channelFlag ,
                    type: 2
                }));
                searchHistory.forEach(function (item,index) {
                    if (index == 0){
                        listSearchHistory = `<li data-bigdata="${bigdata} " data-type="${item.type}" data-value="${item.id}" data-name="${item.key}" data-address="${item.address}"><p>${item.key}</p><span>${item.address}</span></li>`
                    }else {
                        listSearchHistory = listSearchHistory + `<li data-bigdata="${bigdata} " data-type="${item.type}" data-value="${item.id}" data-name="${item.key}" data-address="${item.address}"><p>${item.key}</p><span>${item.address}</span></li>`
                    }
                });
                $('#resultHistory').empty().append(listSearchHistory);
                // 历史搜索点击
                $('#resultHistory >li').click(function () {
                    let saveLocalStorage =[];
                    JSON.parse( localStorage.getItem('searchHistory')) ?  saveLocalStorage = JSON.parse( localStorage.getItem('searchHistory')) : saveLocalStorage = [];
                    let ind =$(this).index();
                    let singleData = {
                        "key":$(this).attr('data-name'),
                        "id": $(this).attr('data-value'),
                        "address": $(this).attr('data-address'),
                        "type":$(this).attr('data-type'),
                    };
                    saveLocalStorage.forEach(function (item,index) {
                        if (item.id == singleData.id && item.type == singleData.type){
                            saveLocalStorage.splice(index,1)
                        }
                    });
                    saveLocalStorage.push(singleData);
                    localStorage.setItem("searchHistory",JSON.stringify(saveLocalStorage));
                    delete (conditionObject['di']); delete (conditionObject['to']);
                    delete (conditionObject['li']); delete (conditionObject['st']);
                    delete(conditionObject['ne']);  // 删除附近
                    let conditionString = that.objectToString(conditionObject); // 转换成字符串
                    let valueSearch = $(this).attr('data-value');
                    let typeS = $(this).attr('data-type');
                    window.location.href = url + conditionString + checkType(typeS,valueSearch);
                });
            }else {
                $('.show-result').show();
                $('.have-result').hide();
                $('body').css('background-color','#FFF');
            }
        });

        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        搜索 联想词
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        $('#searchInput').on('keyup input',function (event) {
            if ($(this).val()) {
                $('.conone').show();
                $('.have-result').hide();
                let saveLocalStorage = [];
                let sendData={
                    key:$(this).val(),
                    cityId:cityId,
                    pageName:"renthouselist"
                };
                /* 埋点的参数*/
                let bigdata =encodeURIComponent(JSON.stringify({
                    eventName: '1203004',
                    channel:channelFlag ,
                    type: 2
                }));
                that.request(that.apiUrl.common.acWord,sendData,{successCallback(data){
                        let renthouselistData = data.data;
                        acWordHouseList = renthouselistData.secondHouseList;
                        if (renthouselistData.secondHouseList) {
                            $('.show-result').show();
                            $('.no-result').hide();
                            $('.search-result').show();
                            let titleName ='';
                            let addreName = '';
                            let searchaAcWord = '';
                            renthouselistData.secondHouseList.forEach(function (item,index) {  // 循环出搜索结果
                                titleName = item.estateDesc.replace(item.markname,`<span>${item.markname}</span>`);
                                addreName = item.address.replace(item.markname,`<span>${item.markname}</span>`);
                                searchaAcWord += `<li data-bigdata="${bigdata} " data-type="${item.type}" data-value="${item.value}" data-name="${item.estateDesc}" data-address="${item.address}"><p>${titleName}</p><span>${addreName}</span></li>`
                            }) ;
                            $('#showResult').empty().append(searchaAcWord);
                            $('body').css('background-color','#F0F0F0');
                        } else {
                            $('.no-result').show();
                            $('.have-result').hide();
                            $('.show-result').hide();
                            $('body').css('background-color','#FFF');
                        }
                        // 搜索条目点击跳转 和储存
                        $('#showResult >li').click(function () {
                            JSON.parse( localStorage.getItem('searchHistory')) ?  saveLocalStorage = JSON.parse( localStorage.getItem('searchHistory')) : saveLocalStorage = [];
                            let singleData = {
                                "key":$(this).attr('data-name'),
                                "id": $(this).attr('data-value'),
                                "address": $(this).attr('data-address'),
                                "type":$(this).attr('data-type'),
                            };
                            if (saveLocalStorage.length >4){
                                saveLocalStorage.reverse().splice(4)
                            }
                            saveLocalStorage.forEach(function (item,index) {
                                if (item.id == singleData.id && item.type == singleData.type){
                                    saveLocalStorage.splice(index,1)
                                }
                            });
                            let saveLocal= saveLocalStorage.reverse();
                            saveLocal.push(singleData);
                            localStorage.setItem("searchHistory",JSON.stringify(saveLocal));
                            delete (conditionObject['di']); delete (conditionObject['to']);
                            delete (conditionObject['li']); delete (conditionObject['st']);
                            delete(conditionObject['ne']);  // 删除附近
                            let conditionString = that.objectToString(conditionObject); // 转换成字符串
                            valueSearch = $(this).attr('data-value');
                            let typeS = $(this).attr('data-type');
                            window.location.href = url + conditionString + checkType(typeS,valueSearch);
                        });
                    }});
                if (acWordHouseList){
                    if (event.keyCode == 13){ //enter存值  ta-0-ta-0-ta-0-ta-0-la-0
                        JSON.parse( localStorage.getItem('searchHistory')) ?  saveLocalStorage = JSON.parse( localStorage.getItem('searchHistory')) : saveLocalStorage = [];
                        let singleData={
                            "key":$('#showResult>li:eq(0)').attr('data-name'),
                            "id": $('#showResult>li:eq(0)').attr('data-value'),
                            "address": $('#showResult>li:eq(0)').attr('data-address'),
                            "type":$('#showResult>li:eq(0)').attr('data-type'),
                        };
                        if (saveLocalStorage.length >4){
                            saveLocalStorage.reverse().splice(4)
                        }
                        let saveLocal= saveLocalStorage.reverse();
                        saveLocal.push(singleData);
                        localStorage.setItem("searchHistory",JSON.stringify(saveLocal));
                        delete (conditionObject['di']); delete (conditionObject['to']);
                        delete (conditionObject['li']); delete (conditionObject['st']);
                        delete(conditionObject['ne']);  // 删除附近
                        let conditionString = that.objectToString(conditionObject); // 转换成字符串
                        valueSearch = $('#showResult>li:eq(0)').attr('data-value');
                        let typeS = $('#showResult>li:eq(0)').attr('data-type');
                        window.location.href = url + conditionString + checkType(typeS,valueSearch);
                    }
                }
            }else {
                $('.show-result').hide();
                localStorage.getItem('searchHistory') ? $('.have-result').show(): $('.have-result').hide();
                $('#showResult').empty();
            }
        });

        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        搜索框是否有值的初步渲染
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        if (JSON.parse(localStorage.getItem('searchHistory')) && haveNot() ) {
            let firtName = JSON.parse(localStorage.getItem('searchHistory')).reverse()[0].key;
            $('#searchInput').val(firtName);
            $('.contwo').show();
        }
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
         删除搜索框并跳转
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        $('.contwo').click(function () {
            $('#searchInput').val('');
            $('.icon-close').hide();
            $('#showResult').empty();
            $('.no-result').hide();
            $('.have-result').hide();
            let conditionString = that.objectToString(conditionObject); // 转换成字符串
            window.location.href = url + conditionString + areasLineSting
        });
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
         删除罩层搜索框值不跳转
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        $('.conone').click(function () {
            $('#searchInput').val('');
            $('.icon-close').hide();
            $('#showResult').empty();
            $('.no-result').hide();
            if (JSON.parse(localStorage.getItem('searchHistory'))) {  // Storage取值渲染
                $('.have-result').show();
                $('body').css('background-color','#F0F0F0');
            }else {
                $('.have-result').hide();
                $('body').css('background-color','#FFF');
            }
        });
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
         判断是否为今日头条等频道
         -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        if (GetRequest()['channel']){
            $('.rent-list').css({"box-shadow":" 0 0 0 0 rgba(0,0,0,.15)","background-color":"#fff"});
            $('.search-input').css('width',"96%");
            $('.history-name').hide();
            $('.icon-fanhui').hide();
            $('.sort').hide();
            if ($('#searchInput').val()){
                $('.conone').show();
            }else {
                $('.conone').hide();
            }
            $('.cancel-channel').click(function () {
                $(this).hide();
                $('.contwo').hide();
                $('.conone').hide();
                $('.all-control').removeClass('on-hide');
                $('.search-result').hide();
                $('.no-result').hide();
                $('.back').hide();
                $('.show-result').hide();
                $('#showResult').empty();
                $('#searchInput').val('');
                $('.location-all').show();
                $('#searchInput').css({"background-color":"#F8F8F8",'width':"52%"});
                $('.rent-search').siblings('ul').removeClass('on-hide');
                $('.rent-search').removeClass('active-search-channel');
                $('body').css('background-color','#F0F0F0');
            });
            $('.location-all').click(function () {
                $.cookie('citySelectionOpen', 1 ,{path: '/',});
            })
        }else {
            $('.input-kw-form').css({"background-color":"#FFF"});
            $('.location-all').hide();
            $('.sort').show();
            $('.icon-hanbao').show();
        }
    };
    /*返回到首页*/
    $('.back').click(function () {
        window.location.href = "/"
    });
    /*返回到列表页*/
    $('.fanhui').click(function () {
        $('.input-kw-form').css({"background-color":"#fff"});
        $('.rent-search').removeClass('active-search');
        $('.all-control').removeClass('on-hide');
        $('.rent-search').siblings('ul').removeClass('on-hide');
        $('.search-result').hide();
        $('.no-result').hide();
        $('.back').show();
        $('.icon-hanbao').show();
        $(this).hide();
        $('.contwo').hide();
        $('.show-result').hide();
        $('#searchInput').val('');
        $('.conone').hide();
    });
    /*清楚搜索历史*/
    $('#clearHistory').click(function () {
        localStorage.removeItem('searchHistory');
        $('body').css('background-color','#FFF');
        $('.have-result').hide();
    });
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    阻止表单的默认行为：
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    $('.input-kw-form').submit(function(event){
        event.preventDefault();
    });
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    判断search板块？后面的参数是什么
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    let checkType = function(type,value){
        let typeSearch = '';
        if (type == 1){
            typeSearch = "?districtId=" + value;
        }else if (type == 2){
            typeSearch = "?townId="+value;
        }else if (type == 3){
            typeSearch = "?subwayLine="+value;
        }else if (type == 4){
            typeSearch = "?subwayStation="+value;
        }else if (type == 5){
            typeSearch = "?subEstateId="+value;
        }
        if (GetRequest()['channel'] && typeSearch){
            typeSearch = typeSearch+"&channel="+ GetRequest()['channel']
        }else if (GetRequest()['channel'] && !typeSearch){
            typeSearch = "?channel="+GetRequest()['channel']
        }else if (!GetRequest()['channel'] && typeSearch){
            typeSearch = typeSearch
        }
        return typeSearch

    };
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
     查询？后面 是否包含搜索的参数
     -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    let haveNot = function(){
        if(GetRequest()['districtId'] || GetRequest()['townId'] || GetRequest()['subwayLine'] || GetRequest()['subwayStation'] || GetRequest()['subEstateId']){
            return true
        }else {
            return false
        }
    };
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
     截取？后面的参数
     -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    let  GetRequest = function() {
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
    };

   return {
       init: function(c){
           that = c;
       },
       searchInputClick:searchInputClick
   }
});