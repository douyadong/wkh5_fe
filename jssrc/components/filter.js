/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：悟空找房h5
 2. 页面名称：components -> filter(筛选条件)
 3. 作者：tangxuyang@lifang.com
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
 /**
  * options: {
      el: "", //挂载点
      houseType: "",//查询区域板块用的
      cityId: "",//查询区域板块和地铁用的
      cityName: "",
      near: true,
      longitude: "",// 经度
      latitude: "",// 纬度
      distances: [{value: "5000", text: "不限（智能范围）"},{value: "500", text: "500米"},{value: "1000", text: "1000米"},{value: "2000", text: "2000米"},{value: "5000", text: "5000米"}],
      filterChanged: function(condition){
        condition:{
            price: "",
            sort: "",
            district: "",
            town: "",
            metro: "",
            station: "",
            districtPinyin: "",
            metroKey: ""
            ...
        }

      },//查询条件变化回调
      prices:[{
          id: "",
          text: "不限"          
      },{
          id: "1",
          text: "100万以下"
      }],
      houseTypes:[{
          name: "types",//用来作为返回查询条件的key
          title: "户型",
          items: [{
              id: "",
              text: "不限",
              exclusive: true,//互斥
          }]
      },{
          name: "features",
          title: "特色",
          items: [{
              id: "",
              text: "进地铁"
          }]
      },{
          name: "propertyTypes",
          title: "物业类型",
          items: [{
              id: "",
              text: "住宅"
          }]
      },{
          name: "decorations",
          title: "装修",
          items: [{
              id: "",
              text: "毛坯"
          }]
      }],
      sorts:[{
          id: "",
          text: "综合排序",
          bigDataParam: '{eventName: ""}'
      }],
      bigDataParams: {// 大数据埋点参数
        sort: {// 排序相关的埋点数据.我还是决定把排序的埋点参数放在排序选项设置中，此处只保留点击排序tab的埋点参数
            clickTab: '{"eventName": "1050003"}'           
        },
      }
  }

  filteChange的参数: {
    sort: "", //排序
    price: "",//价格
    district: "",//区域id
    town: "",//板块id
    metro: "",//地铁线id
    station: "",//地铁站id
    .... // 对应options中houseTypes的name
  }
  */

/*
* ---------------------------取自underscore----------------------------
*/
var templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
};

var noMatch = /(.)^/;

var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

var escapeChar = function(match) {
    return '\\' + escapes[match];
};

var _template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = $.extend({}, settings, templateSettings);

    var matcher = RegExp([
        (settings.escape || noMatch).source,
        (settings.interpolate || noMatch).source,
        (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
        source += text.slice(index, offset).replace(escaper, escapeChar);
        index = offset + match.length;

        if (escape) {
            source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
        } else if (interpolate) {
            source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
        } else if (evaluate) {
            source += "';\n" + evaluate + "\n__p+='";
        }
        
        return match;
    });
    source += "';\n";

    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
        "print=function(){__p+=__j.call(arguments,'');};\n" +
        source + 'return __p;\n';

    try {
        var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
        e.source = source;
        throw e;
    }

    var template = function(data) {
        return render.call(this, data);
    };

    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
};
/*
* ----------------------------------------------------------------------
*/
define([],function(){
    const DEFAULT =  {
        el: "", //挂载点
        filterChanged: function(condition){},//查询条件变化回调
        prices:[{
            id: "",
            text: "不限"          
        },{
            id: "1",
            text: "100万以下"            
        },{
            id: "2",
            text: "100-150万"
        },{
            id: "3",
            text: "150-200万"
        },{
            id: "4",
            text: "200-250万"
        },{
            id: "5",
            text: "250-300万"
        },{
            id: "6",
            text: "300-500万"
        },{
            id: "7",
            text: "500-1000万"
        },{
            id: "8",
            text: "1000-2000万"
        },{
            id: "9",
            text: "2000万以上"
        }],
        houseTypes:[{
            name: "types",//用来作为返回查询条件的key
            title: "户型",
            items: [{
                id: "",
                text: "不限",
                exclusive: true,//互斥
                bigDataParam: encodeURIComponent('{"eventName": "1050018", "room": "0"}')
            },{
                id: "1",
                text: "一室",
                exclusive: false,//互斥
                bigDataParam: encodeURIComponent('{"eventName": "1050018", "room": "1"}')
            },{
                id: "2",
                text: "二室",
                exclusive: false,//互斥
                bigDataParam: encodeURIComponent('{"eventName": "1050018", "room": "2"}')
            },{
                id: "3",
                text: "三室",
                exclusive: false,//互斥
                bigDataParam: encodeURIComponent('{"eventName": "1050018", "room": "3"}')
            },{
                id: "4",
                text: "四室",
                exclusive: false,//互斥
                bigDataParam: encodeURIComponent('{"eventName": "1050018", "room": "4"}')
            },{
                id: "5",
                text: "五室及以上",
                exclusive: false,//互斥
                bigDataParam: encodeURIComponent('{"eventName": "1050018", "room": "5"}')
            }]
        },{
            name: "features",
            title: "特色",
            items: [{
                id: "f1",
                text: "近地铁",
                bigDataParam: encodeURIComponent('{"eventName": "1050041", "feature": "3"}')
            },{
                id: "s1",
                text: "即将开盘",
                bigDataParam: encodeURIComponent('{"eventName": "1050041", "feature": "9"}')
            },{
                id: "s2",
                text: "在售楼盘",
                bigDataParam: encodeURIComponent('{"eventName": "1050041", "feature": "10"}')
            },{
                id: "f0",
                text: "有优惠",
                bigDataParam: encodeURIComponent('{"eventName": "1050041", "feature": "11"}')
            },{
                id: "f2",
                text: "有视频",
                bigDataParam: encodeURIComponent('{"eventName": "1050041", "feature": "5"}')
            }]
        },{
            name: "propertyTypes",
            title: "物业类型",
            items: [{
                id: "1",
                text: "住宅",
                bigDataParam: encodeURIComponent('{"eventName": "1050040", "estate_type": "1"}')
            },{
                id: "2",
                text: "别墅",
                bigDataParam: encodeURIComponent('{"eventName": "1050040", "estate_type": "3"}')
            },{
                id: "3",
                text: "商用",
                bigDataParam: encodeURIComponent('{"eventName": "1050040", "estate_type": "2"}')
            }]
        },{
            name: "decorations",
            title: "装修",
            items: [{
                id: "1",
                text: "毛坯",
                bigDataParam: encodeURIComponent('{"eventName": "1050045", "fitment": "1"}')
            },{
                id: "2",
                text: "精装",
                bigDataParam: encodeURIComponent('{"eventName": "1050045", "fitment": "4"}')
            },{
                id: "3",
                text: "豪装",
                bigDataParam: encodeURIComponent('{"eventName": "1050045", "fitment": "5"}')
            }]
        }],
        sorts:[{
            //id: "-1",
            text: "综合排序",
            bigDataParam: encodeURIComponent('{"eventName": "1050004"}')
        },{
            id: "1",
            text: "均价从低到高",
            bigDataParam: encodeURIComponent('{"eventName": "1050005"}')
        },{
            id: "2",
            text: "均价从高到低",
            bigDataParam: encodeURIComponent('{"eventName": "1050006"}')
        },{
            id: "3",
            text: "面积从小到大",
            bigDataParam: encodeURIComponent('{"eventName": "1050008"}')
        },{
            id: "4",
            text: "面积从大到小",
            bigDataParam: encodeURIComponent('{"eventName": "1050007"}')
        }],
        near: true
    };
    
    function createPriceSection(prices){// 价格
        var templateStr = '<div class="total-price">\
                                <ul>\
                                <%for(var i = 0; i < prices.length; i++){%>\
                                    <li data-value="<%=prices[i].id%>"><%=prices[i].text%></li>\
                                <%}%>\
                                </ul>\
                                <div>\
                                    <div>\
                                        <input type="number" placeholder="最低价格">\
                                    </div>\
                                    <div class="normal">-</div>\
                                    <div>\
                                        <input placeholder="最高价格" type="number">\
                                    </div>\
                                    <div class="normal"></div>\
                                    <div>\
                                        <button type="button">确定</button>\
                                    </div>\
                                </div>\
                            </div>';
        var html = _template(templateStr)({prices:prices});        
        return html;
    }

    function createHouseTypeSection(houseTypes, bigDataParams){// 户型        
        var templateStr = '<div class="house-type">\
                            <div class="house-type-inner">\
                                <% var c = count || 4;%>\
                                <%for(var i = 0; i < houseTypes.length; i++){%>\
                                    <div class="house-type-section" data-key="<%= houseTypes[i].name%>">\
                                        <h4><%= houseTypes[i].title%></h4>\
                                        <%var r = Math.ceil(houseTypes[i].items.length/c);%>\
                                        <%for(var j = 0; j < r; j++){%>\
                                            <ul>\
                                            <%for(var k = 0; k < c; k++){%>\
                                              <%var item = houseTypes[i].items[j*c +k];%>\
                                              <%if(item){%>\
                                              <li data-value="<%= item.id%>" data-exclusive="<%= item.exclusive?1:0%>" <%= item.bigDataParam?("data-bigdata=\'" + item.bigDataParam + "\'"):""%> ><%= item.text %></li>\
                                              <%}else{%>\
                                                <li class="placeholder"></li>\
                                              <%}%>\
                                            <%}%>\
                                            </ul>\
                                        <%}%>\
                                    </div>\
                                    <%}%></div>\
                                    <ul class="operation">\
                                        <li class="reset" <%=bigDataParams && bigDataParams.houseTypes && bigDataParams.houseTypes.clickReset? ("data-bigdata=\'" + bigDataParams.houseTypes.clickReset +"\'") : "" %> >重置</li>\
                                        <li class="confirm" <%=bigDataParams && bigDataParams.houseTypes && bigDataParams.houseTypes.clickConfirm? ("data-bigdata=\'" + bigDataParams.houseTypes.clickConfirm +"\'") : "" %> >确定</li>\
                                    </ul>\
                            </div>';
        
        var html = _template(templateStr)({houseTypes: houseTypes, count: 4, bigDataParams});
        return html;
    }

    function createSortSection(sorts){// 排序
        var templateStr = '<div class="sort">\
                                <ul>\
                                <%for(var i = 0; i < sorts.length; i++){%>\
                                    <li <%= sorts[i].bigDataParam? ("data-bigdata=\'" + sorts[i].bigDataParam + "\'") : "" %> data-value="<%= sorts[i].id%>"><%= sorts[i].text%></li>\
                                <%}%>\
                                </ul>\
                            </div>';
        var html = _template(templateStr)({sorts: sorts});
        return html;        
    }

    function createDistrictAndMetroSection(options){// 区域（包括区域和地铁）
        var templateStr = '<div class="district-metro"><ul><li class="active" <%= bigDataParams && bigDataParams.districtAndMetero && bigDataParams.districtAndMetro.clickDistrictSection? ("data-bigdata=\'" + bigDataParams.districtAndMetro.clickDistrictSection + "\'"):""%> >区域</li><li <%= bigDataParams && bigDataParams.districtAndMetero && bigDataParams.districtAndMetro.clickMetroSection? ("data-bigdata=\'" + bigDataParams.districtAndMetro.clickMetroSection + "\'"):""%> >地铁</li></ul><div class="district district-metro-item">\
                                <div class="district-inner">\
                                    <ul class="parent">\
                                        <%if(near){%>\
                                            <%if(locationSuccessful == null){%>\
                                            <li data-value="near" class="near">定位中...</li>\
                                            <%}%>\
                                            <%if(locationSuccessful === true){%>\
                                            <li data-value="near" class="near">附近</li>\
                                            <%}%>\
                                            <%if(locationSuccessful === false){%>\
                                            <li data-value="near" class="near">定位失败</li>\
                                            <%}%>\
                                        <%}%>\
                                        <li>不限</li>\
                                        <%for(var i = 0; i< districts.length; i++){%>\
                                        <li data-value="<%= districts[i].id%>"><%= districts[i].name%></li>\
                                        <%}%>\
                                    </ul>\
                                    <div class="child">\
                                    <%if(near){%>\
                                        <ul data-value="near" class="near">\
                                            <%for(var i = 0; distances && i < distances.length; i++){%>\
                                                <li class="near" data-value="<%=distances[i].value%>"><%= distances[i].text%></li>\
                                            <%}%>\
                                        </ul>    \
                                    <%}%>\
                                    <%for(var i = 0; i < districts.length; i++){%>\
                                        <ul data-value="<%= districts[i].id%>" data-text="<%= districts[i].name%>">\
                                            <li data-pinyin="<%=districts[i].pinyin%>">不限</li>\
                                            <%for(var j = 0; j < districts[i].townList.length; j++){%>\
                                                <li data-pinyin="<%=districts[i].pinyin%>-<%=districts[i].townList[j].pinyin%>" data-value="<%= districts[i].townList[j].id%>"><%= districts[i].townList[j].name%></li>\
                                            <%}%>\
                                        </ul>\
                                    <%}%>\
                                    </div>\
                                </div>\
                            </div>\
                            <div class="metro district-metro-item">\
                            <div class="metro-inner">\
                                <ul class="parent">\
                                    <li>不限</li>\
                                    <%for(var i = 0; i< metros.length; i++){%>\
                                    <li data-value="<%= metros[i].id%>"><%= metros[i].name%></li>\
                                    <%}%>\
                                </ul>\
                                <div class="child">\
                                <%for(var i = 0; i < metros.length; i++){%>\
                                    <ul data-value="<%= metros[i].id%>" data-text="<%= metros[i].name%>">\
                                        <li data-pinyin="<%=metros[i].key%>">不限</li>\
                                        <%for(var j = 0; j < metros[i].subList.length; j++){%>\
                                            <li data-pinyin="<%=metros[i].key%><%=metros[i].subList[j].key%>" data-value="<%= metros[i].subList[j].id%>"><%= metros[i].subList[j].name%></li>\
                                        <%}%>\
                                    </ul>\
                                <%}%>\
                            </div>\
                        </div>\
                        </div></div>';        
        var html = _template(templateStr)({districts: options.districts, metros: options.metros, longitude: options.longitude, latitude: options.latitude, distances: options.distances, near: options.near, bigDataParams: options.bigDataParams, locationSuccessful: this.locationSuccessful}); 
        console.log(options.distances);       
        return html;
    }

    function create(){
        var options = this.options;
        return '<ul class="filter-items"><li><span class="label" '+(options.bigDataParams&&options.bigDataParams.districtAndMetro&&options.bigDataParams.districtAndMetro.clickTab?('data-bigdata="'+ options.bigDataParams.districtAndMetro.clickTab +'"'):'')+' >区域</span><span class="triangle"></span></li><li><span class="label" '+(options.bigDataParams&&options.bigDataParams.price&&options.bigDataParams.price.clickTab?('data-bigdata="'+options.bigDataParams.price.clickTab+'"'):'')+' >总价</span><span class="triangle"></span></li><li><span class="label" '+(options.bigDataParams&&options.bigDataParams.houseTypes&&options.bigDataParams.houseTypes.clickTab?('data-bigdata="'+options.bigDataParams.houseTypes.clickTab+'"'):'')+' >户型</span><span class="triangle"></span></li><li><span class="label" '+(options.bigDataParams&&options.bigDataParams.sort&&options.bigDataParams.sort.clickTab?('data-bigdata="' + options.bigDataParams.sort.clickTab+'"'):"")+' >排序</span><span class="triangle"></span></li></ul><div class="content"><div class="content-inner">'+createDistrictAndMetroSection.call(this,options)+createPriceSection(options.prices)+createHouseTypeSection(options.houseTypes, options.bigDataParams)+createSortSection(options.sorts)+'</div></div>';
    }

    // 计算查询条件，并调用filterChange回调
    function calcCondition() {
        var result = {};
        var self = this;
        // 排序
        delete this.result.sort;
        $('.sort .active').each(function(){
            if($(this).data('value')){
                result.sort = $(this).data('value');
            }
        });

        // 总价              
        $('.total-price .active').each(function(){
            if($(this).data('value')){
                result.price = $(this).data('value');
                self.result && delete self.result.price;
            }
        });               

        // 户型        
        $('.house-type-section').each(function(){
            var key = $(this).data('key');
            result[key] = [];
            self.result && delete self.result[key];
            $(this).find('.active').each(function(){
                var value = $(this).data('value');
                if(value != null && value != undefined && value != ''){
                    result[key].push(value);
                }                    
            });
            if(result[key].length == 0){// 没选中则删除
                delete result[key];
            }
        });

        // 区域地铁
        /*
        $('.district .parent li.active').each(function(){
            result.district = $(this).data('value');
        });
        $('.district .child li.active').each(function(){
            result.town = $(this).data('value');
        });
        $('.metro .parent li.active').each(function(){
            result.metro = $(this).data('value');
        });
        $('.metro .child li.active').each(function(){
            result.station = $(this).data('value');
        });*/
        // 区域地铁的有点复杂，还是在点击选中时直接复制给this.result
        

        // 经纬度
        if(this.result.longitude){
            this.result.longitude = this.options.longitude;
        }
        if(this.result.latitude){
            this.result.latitude = this.options.latitude;
        }

        result = $.extend({}, this.result, result);
        this.options.filterChanged && this.options.filterChanged(result);        
    }

    function bindEvent() {
        var self = this;
        
        // 监听页面滚动，适时的调整filter和列表的样式
        $(window).on('scroll.filter', function(event){            
            var top = $(window).scrollTop();
            if(top>42){
                $('.filter').addClass('fixed');
                $('#list').addClass('has-margin');// 好尴尬，这里竟然硬编码了列表的id
            }else{
                $('.filter').removeClass('fixed');
                $('#list').removeClass('has-margin');
            }
        });

        // 关闭筛选弹层
        function hide(){            
            self.$content.hide();
            $('.filter .filter-items li').removeClass('open');
            self.$body.removeClass('noscroll');

            if(self.scrollTop){
                $(window).scrollTop(self.scrollTop);
            }
        }

        // 打开筛选弹层
        function show(index){
            // 先隐藏
            self.$districtMetro.hide();
            self.$price.hide();
            self.$houseType.hide();
            self.$sort.hide();

            $('.filter-items li').removeClass('open');            
            self.$content.show();
            switch(index){
                case 0:
                    self.$districtMetro.slideDown();
                    self.$districtLabel.parent().addClass('open');
                break;
                case 1:
                    self.$price.slideDown();
                    self.$priceLabel.parent().addClass('open');
                break;
                case 2:
                    self.$houseType.slideDown();
                    self.$houseTypeLabel.parent().addClass('open');
                break;
                case 3:
                    self.$sort.slideDown();
                    self.$sortLabel.parent().addClass('open');
                break;
            }
            self.$body.addClass('noscroll');

            var top = self.$content.position().top;
            var winHeight = $(window).height();
            self.$content.height(winHeight - top); 
            
            self.scrollTop = $(window).scrollTop();
        }

        // 点击区域、总价、户型、排序，展示详情筛选条件
        $('.filter-items li').click(function(){
            if($(this).hasClass('open')){//当前筛选条件已经显示了，则关闭                
                hide();
            }else{
                var index = $('.filter-items li').index(this);                                        
                show(index);                
            }
        });

        // 点击排序中的选项
        $('.filter .sort li').click(function(){            
            self.$sort.find('li').removeClass('active');
            $(this).addClass('active');
            hide();
            calcCondition.apply(self);
            var id = $(this).data('value');
            if(id){
                self.$sortLabel.text($(this).text()).parent().addClass('active');
            } else {
                self.$sortLabel.text("排序").parent().removeClass('active');
            }
        });

        // 点击总价中的选项
        $('.filter .total-price li').click(function(){            
            self.$price.find('li').removeClass('active');
            $(this).addClass('active');
            hide();
            var id = $(this).data('value');
            if(id) {
                self.$priceLabel.text($(this).text()).parent().addClass('active');;
            } else {
                self.$priceLabel.text("总价").parent().removeClass('active');
            }
            self.$minPrice.val('');
            self.$maxPrice.val('');
            delete self.result.price;
            calcCondition.apply(self);
        });

        // 点击总价中输入框
        // $('.filter .total-price input').click(function(e){
        //     alert("click input...");
        //     $(this).focus();
        //     e.stopPropagation();
        // });

        // 自定义价格区间确定按钮
        $('.filter .total-price button').click(function(){
            // 校验输入，并做相应处理
            var minText = $.trim(self.$minPrice.val());
            var maxText = $.trim(self.$maxPrice.val());
            var min = parseInt(minText) || 0;
            var max = parseInt(maxText) || 0;

            if(min != minText && minText || max != maxText && maxText || min > max) {
                // TODO:提示价格区间有误，请从新输入

                return;
            }
            self.result.price = (min || 0) + "to" + (max || 0);
            if(self.result.price=="0to0"){
                delete self.result.price;
            }
            var str = "";
            if(!min && max){
                str = max + "万以下";
            } else if (min && !max) {
                str = min + "万以上";
            } else if (min && max) {
                str = min + "-" + max + "万";
            }
            if(str) {
                self.$priceLabel.text(str).parent().addClass('active');
            }else{
                self.$priceLabel.text("总价").parent().removeClass('active');
            }
            self.$price.find('li').removeClass('active');
            hide();
            calcCondition.apply(self);

            if(self.options.bigDataParams && self.options.bigDataParams.price && self.options.bigDataParams.price.clickButton){
                self.BigData.bigData({eventName: self.options.bigDataParams.price.clickButton, price_range: str});
            }            
        });

        // 户型中选项
        $('.filter .house-type-section li:not(.placeholder)').click(function(){
            var $this = $(this);
            if($this.hasClass('active')){// 已经选中了，则去除选中
                $this.removeClass('active');
            }else{                
                // 互斥处理
                var $parent = $this.closest('.house-type-section');
                var $items = $parent.find('li:not(.placeholder)');
                if($this.data('exclusive')){//互斥
                    $items.removeClass('active');
                }else{// 不互斥
                    $items.filter('[data-exclusive=1]').removeClass('active');
                } 
                $this.addClass('active');               
            }                        
        });

        // 户型中重置和确定按钮
        self.$houseTypeResetBtn.click(function(){
            self.$houseType.find('.house-type-section li:not(.placeholder)').removeClass('active');
            //$('.filter .house-type-section li:not(.placeholder)').removeClass('active');
        });
        self.$houseTypeConfirmBtn.click(function(){
            if(self.$houseType.find('.active').length > 0){
                self.$houseTypeLabel.parent().addClass('active');
            }else{
                self.$houseTypeLabel.parent().removeClass('active');
            }
            hide();
            calcCondition.apply(self);
        });

        //区域中，区域地铁单击
        $('.filter .district-metro >ul li').click(function(){
            var index = $('.filter .district-metro >ul li').index(this);
            if(index == 0){// 点击的区域                                
                self.$metro.hide();
                self.$district.show();
            } else {// 地铁                
                self.$metro.show();
                self.$district.hide();
            }
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
        });

        // 区域、地铁
        $('.filter .district .parent li').click(function(){
            var $this = $(this);
            var id = $this.data('value');   
            if(id=="near" && !self.locationSuccessful){// 点击的附近区块，判断定位成功
                return;
            }               
            $this.siblings().removeClass('active');
            $this.addClass('active');
            var $parent = $this.parent();
            $parent.siblings('.child').find('ul').hide().filter('[data-value='+id+']').show();
            if(!id){// 不限
                delete self.result.district;
                delete self.result.town;
                delete self.result.metro;
                delete self.result.station; 
                delete self.result.districtPinyin;
                delete self.result.metroKey;
                hide();
                calcCondition.apply(self);    
                self.$districtLabel.text("区域").parent().removeClass('active');           
            }

            if(id && self.options.bigDataParams && self.options.bigDataParams.districtAndMetro && self.options.bigDataParams.districtAndMetro.clickDistrict){
                self.BigData.bigData({
                    eventName: self.options.bigDataParams.districtAndMetro.clickDistrict,
                    region_id: id,                    
                });
            }
        });
        $('.filter .metro .parent li').click(function(){
            var $this = $(this);
            var id = $this.data('value');            
            
            $this.siblings().removeClass('active');
            $this.addClass('active');
            var $parent = $this.parent();
            $parent.siblings('.child').find('ul').hide().filter('[data-value='+id+']').show();
            if(!id){// 不限
                delete self.result.district;
                delete self.result.town;
                delete self.result.metro;
                delete self.result.station; 
                delete self.result.districtPinyin;
                delete self.result.metroKey;
                hide();
                calcCondition.apply(self);    
                self.$districtLabel.text("区域").parent().removeClass('active');           
            }

            if(id && self.options.bigDataParams && self.options.bigDataParams.districtAndMetro && self.options.bigDataParams.districtAndMetro.clickMetro){
                self.BigData.bigData({
                    eventName: self.options.bigDataParams.districtAndMetro.clickMetro,
                    subway_id: id,                    
                });
            }
        });

        // 板块、地铁站
        $('.filter .district .child li').click(function(){        
            var $this = $(this);
            $('.district-metro .child li').removeClass('active');
            $this.addClass('active');
            delete self.result.metro;
            delete self.result.station;
            delete self.result.metroKey;
            delete self.result.district;
            delete self.result.town;
            delete self.result.districtPinyin;
            delete self.result.longitude;
            delete self.result.latitude;
            delete self.result.meter;

            var str = "";
            
            if($this.hasClass('near')){//附近中选项                
                self.result.longitude = self.options.longitude;
                self.result.latitude = self.options.latitude;
                self.result.meter = $this.data('value');
                str = $this.text();
                if(str.indexOf('不限')> -1){
                    str = "附近";
                    //self.result.meter = 5000;
                }
            }else{
                self.result.district = $this.parent().data('value');
                self.result.town = $this.data('value');
                self.result.districtPinyin = $this.data('pinyin');
                if(!self.result.town){// 不限
                    str = $this.parent().data('text');

                    if(self.options.bigDataParams && self.options.bigDataParams.districtAndMetro && self.options.bigDataParams.districtAndMetro.clickItem){
                        self.BigData.bigData({
                            eventName: self.options.bigDataParams.districtAndMetro.clickItem,
                            region_id: self.result.district                        
                        });
                    }
                } else {
                    str = $this.text();
                    if(self.options.bigDataParams && self.options.bigDataParams.districtAndMetro && self.options.bigDataParams.districtAndMetro.clickItem){
                        self.BigData.bigData({
                            eventName: self.options.bigDataParams.districtAndMetro.clickItem,
                            region_id: self.result.district,
                            town_id: self.result.town
                        });
                    }
                }                
            }
            
            calcCondition.apply(self);
            hide();
            
            self.$districtLabel.text(str).parent().addClass('active');            
        });
        $('.filter .metro .child li').click(function(){
            var $this = $(this);
            $('.district-metro .child li').removeClass('active');
            $this.addClass('active');
            delete self.result.district;
            delete self.result.town;
            delete self.result.districtPinyin;
            delete self.result.longitude;
            delete self.result.latitude;
            delete self.result.meter;
            self.result.metro = $this.parent().data('value');
            self.result.station = $this.data('value');
            self.result.metroKey = $this.data('pinyin');
            calcCondition.apply(self);
            hide();
            var str = "";
            if(!self.result.station) {// 不限
                str = $this.parent().data('text');
                if(self.options.bigDataParams && self.options.bigDataParams.districtAndMetro && self.options.bigDataParams.districtAndMetro.clickItem){
                    self.BigData.bigData({
                        eventName: self.options.bigDataParams.districtAndMetro.clickItem,
                        subway_id: self.result.metro,
                    });
                }
            } else {
                str = $this.text();
                if(self.options.bigDataParams && self.options.bigDataParams.districtAndMetro && self.options.bigDataParams.districtAndMetro.clickItem){
                    self.BigData.bigData({
                        eventName: self.options.bigDataParams.districtAndMetro.clickItem,
                        subway_id: self.result.metro,
                        station_id: self.result.station
                    });
                }
            }
            self.$districtLabel.text(str).parent().addClass('active');
        });

        // 点击遮罩关闭筛选条件
        $('.content').click(function(event){
            if(this == event.target) {
                hide();
            }
        });
    }

    // 设置弹层的高度
    function setMaxHeight(){
        var winHeight = $(window).height() - 80;
        this.$districtMetro.find('.parent,.child').css('max-height', winHeight * .7 + "px");
        this.$price.css('max-height', winHeight * .8 + "px");
        this.$price.find('ul').css('max-height', (winHeight * .8 - 84) + "px");
        //this.$price.find('ul').css('max-height', winHeight * .7 + "px");
        this.$houseType.find('.house-type-inner').css('max-height', winHeight * .7 + "px");
        this.$sort.css('max-height', winHeight * .7 + "px");
        this.$content.height(winHeight);
    }

    function getDistrictAndMetro(houseType, cityId, cb){
        initCount = 0;
        // 查询区域板块
        var self = this;
        this.controller.request(this.controller.apiUrl.rent.list.cityAreas,{
            houseType: this.options.houseType,
            cityId: this.options.cityId
        },{
            successCallback: function(data){
                self.options.districts = data.data;
                init.apply(self);                
            },
            errorCallback: function(){
                self.options.districts = [];
                init.apply(self);                
            },
            exceptionCallback: function(){
                self.options.districts = [];
                init.apply(self);                
            }
        });

        // 查询地铁
        this.controller.request(this.controller.apiUrl.rent.list.citySubway,{            
            cityId: this.options.cityId
        },{
            successCallback: function(data){
                self.options.metros = data.data;
                init.apply(self);                
            },
            errorCallback: function(){
                self.options.metros = [];
                init.apply(self);                
            },
            exceptionCallback: function(){
                self.options.metros = [];
                init.apply(self);
            }
        });
    }

    var initCount = 0;
    function init(){
        initCount++;        
        if(initCount!=2){// 获取区域和地铁是两个接口，因此这里要确定它们都已经成功返回了
            return;
        }
        this.$el.html(create.apply(this));
        this.$content = this.$el.find('.content');
        this.$body = $('body');
        // 筛选条中的内容
        this.$districtLabel = this.$el.find('.filter-items li:eq(0) .label');
        this.$priceLabel = this.$el.find('.filter-items li:eq(1) .label');
        this.$houseTypeLabel = this.$el.find('.filter-items li:eq(2) .label');
        this.$sortLabel = this.$el.find('.filter-items li:eq(3) .label');
        // 各个筛选条件的内容
        this.$districtMetro = this.$el.find('.district-metro');
        this.$price = this.$el.find('.total-price');
        this.$houseType = this.$el.find('.house-type');
        this.$sort = this.$el.find('.sort');
        // 
        this.$district = this.$districtMetro.find('.district');
        this.$metro = this.$districtMetro.find('.metro');
        this.$minPrice = this.$price.find('input:eq(0)');
        this.$maxPrice = this.$price.find('input:eq(1)');
        this.$priceConfirmBtn = this.$price.find('button');
        this.$houseTypeResetBtn = this.$houseType.find('.reset');
        this.$houseTypeConfirmBtn = this.$houseType.find('.confirm');

        
        //this.result = {};
        //this.initValue = this.$el.data('init');//不从dom节点上读了，这样加大了node端对条件的解析，filter本身直接读取url，分析

        //--- 读取url 并分析初始条件-----------------
        this.initValue = {};
        //var pageUrl = location.href;
        var pageUrl = location.origin + location.pathname;
        pageUrl = pageUrl.replace('//','');
        var tmpArr = pageUrl.split('/');
        if(tmpArr[3]){// 有查询条件
            var obj = ParamGenerator.queryString2Object(tmpArr[3]);
            if(obj){
                this.initValue = ParamGenerator.convert2FilterParam(obj);
            }
        }

        //--- end-----------------------------------

        // if(this.initValue){
        //     this.initValue = JSON.parse(decodeURIComponent(this.initValue));
        // }else{
        //     this.initValue = {};
        // }
        if(this.$el.length == 0) {
            throw "挂载点不存在";
        }
        
        this.setValue(this.initValue);
        bindEvent.apply(this);
        setMaxHeight.apply(this);
        // 只用于android        
        var u = navigator.userAgent;
        var android = u.indexOf('Android') > -1|| u.indexOf('Linux') > -1;
        if(android){
            $(window).on('resize',()=>{            
                setMaxHeight.apply(this);
            });
            
        }        

        // new $.Drag({elem: ".total-price ul"});
    }

    function Filter(options) {                
        this.options = $.extend({},DEFAULT, options);     
        this.BigData = this.options.BigData;                       
        this.$el = $(options.el);
        this.controller = options.controller;        

        getDistrictAndMetro.apply(this);  
    }

    // 根据指定的值设置控件中各个筛选条件选中值
    Filter.prototype.setValue = function(value){
        /**
         * {
         *  district: "",
         *  town: "",
         *  metro: "",
         *  station: "",
         * 
         *  price: "",
         *  houseTypes:{
         *      key: []...
         *  },
         *  sort: ""
         * }
         */        
        // 区域/地铁
        var str = "";
        this.result = {};                
        if(value.district != undefined || value.town != undefined){            
            if(value.district != undefined) {
                str = this.$district.find('.parent li[data-value='+value.district+']').addClass('active').text();
                this.$district.find('.child ul[data-value='+value.district+']').show();
                this.result.district = value.district;
                this.result.districtPinyin = this.$district.find('.child ul[data-value='+value.district+'] li:eq(0)').data('pinyin');
            }
            if(value.town != undefined) {
                str = this.$district.find('.child li[data-value='+value.town+']').addClass('active').text();
                this.result.town = value.town;
                this.result.districtPinyin = this.$district.find('.child li[data-value='+value.town+']').data('pinyin');
            }                    
        } else if(value.metro != undefined || value.station != undefined){        
            if(value.metro != undefined) {
                str = this.$metro.find('.parent li[data-value='+value.metro+']').addClass('active').text();
                this.$metro.find('.child ul[data-value='+value.metro+']').show();
                this.result.metro = value.metro;
                this.result.metroKey = this.$metro.find('.child ul[data-value='+value.metro+'] li:eq(0)').data('pinyin');
            }
            if(value.station != undefined) {
                str = this.$metro.find('.child li[data-value='+value.station+']').addClass('active').text();
                this.result.station = value.station;
                this.result.metroKey = this.$metro.find('.child li[data-value='+value.station+']').data('pinyin');
            }

            $('.filter .district-metro >ul li').removeClass('active').filter(':eq(1)').addClass('active');
                       
            this.$district.hide();
            this.$metro.show();
        } else if(value.longitude || value.latitude){
            str = "附近";
            this.$district.find('.parent .near').addClass('active');
            this.$district.find('.child ul.near').show();
            if(value.meter){// 具体范围
                str = value.meter + "米";
                this.$district.find('.child li.near').removeClass('active').filter('[data-value=' +value.meter+']').addClass('active');
            }else if(value.meter != undefined){// 不限
                this.$district.find('.child li.near:eq(0)').addClass('active');
            }
        } else{// 清空选中的区域地铁
            this.$districtMetro.find('ul, li').removeClass('active');
            this.$districtMetro.find('.child ul').hide();
            this.$districtLabel.text('区域').parent().removeClass('active');
            this.$district.show();
            this.$metro.hide();
            this.$districtMetro.find('>ul li:eq(0)').addClass('active');
            // delete this.result.district;
            // delete this.result.districtPinyin;
            // delete this.result.town;
            // delete this.result.metro;
            // delete this.result.metroKey;
            // delete this.result.station;
        }
        if(str){// 设置选中区域或地铁站到区域内容中
            this.$districtLabel.text(str).parent().addClass('active');
        }

        // 总价
        if(value.price) {
            this.$price.find('li').removeClass('active');
            var $pr = this.$price.find('[data-value='+value.price+']');
            if($pr.length == 0){// 不是选项而是自定义价格
                var strs = value.price.split('to');
                var min = strs[0];
                var max = strs[1];
                this.$minPrice.val(min||"");
                this.$maxPrice.val(max||"");
                this.result.price = value.price;
                if(!min){
                    str = max + "万以下";
                } else if(!min){
                    str = min + "万以上";
                } else {
                    str = min + "-" + max + "万";
                }
            } else {// 选项                
                $pr.addClass('active');
                this.result.price = value.price;
                str = $pr.text();
            }
            this.$priceLabel.text(str).parent().addClass('active');
        }else{
            this.$price.find('li').removeClass('active');
            this.$maxPrice.val('');
            this.$minPrice.val('');
            this.$priceLabel.text('总价').parent().removeClass('active');            
        }

        // 户型
        // 先清空
        this.$houseType.find('li').removeClass('active');
        this.$houseTypeLabel.text('户型').parent().removeClass('active');        
        if(value.houseTypes){
            for(var key in value.houseTypes) {
                for(var i = 0; i < value.houseTypes[key].length; i++){
                    this.$houseType.find('[data-key='+key+'] [data-value='+value.houseTypes[key][i]+']').addClass('active');
                    if(!this.result[key]){
                        this.result[key] = [];
                    }
                    this.result[key].push(value.houseTypes[key][i]);
                }                
            }

            this.$houseTypeLabel.parent().addClass('active');
        }

        // 排序
        if(value.sort){            
            var str = this.$sort.find('li[data-value='+value.sort+']').addClass('active').text();
            if(str){
                this.$sortLabel.text(str).parent().addClass('active');
            }
            this.result.sort = value.sort;
        }else{
            //delete this.result.sort;
            this.$sort.find('li').removeClass('active');
            this.$sortLabel.text('排序').parent().removeClass('active');
        }

        //经纬度
        if(value.longitude){
            this.options.longitude = value.longitude;
        }
        if(value.latitude){
            this.options.latitude = value.latitude;
        }
        //this.result = value || {};
    }

    Filter.prototype.clear = function() {
        this.setValue({});        
        calcCondition.apply(this);
    }

    Filter.prototype.clearDistrictAndMetro = function(){
        this.$districtMetro.find('.parent li').removeClass('active');
        this.$districtMetro.find('.child li').removeClass('active');
        this.$districtLabel.text('区域').parent().removeClass('active');
        delete this.result.district;
        delete this.result.town;
        delete this.result.metro;
        delete this.result.station;
        delete this.result.districtPinyin;
        delete this.result.metroKey;
        delete this.result.meter;
        delete this.result.longitude;
        delete this.result.latitude;
    }

    Filter.prototype.getResult = function(){
        return this.result;
    };

    Filter.prototype.setLocationInfo = function(val){
        if(val){// 定位成功
            this.locationSuccessful = true;
            this.$el.find('.district .parent .near').text('附近');
            this.options.longitude = val.longitude;
            this.options.latitude = val.latitude;            
        }else{// 失败
            this.$el.find('.district .parent .near').text('定位失败');
            this.locationSuccessful = false;
        }
    };

    Filter.XFDEFAULT = {        
        bigDataParams: {
            sort: {
                clickTab: encodeURIComponent('{"eventName": "1050003"}')
            },
            districtAndMetro: {
                clickItem: "1050016", // 区域筛选条件
                clickDistrict: "1050032", // 区域点击
                clickTown: "1050033", //板块点击
                clickMetro: "1050034",// 地铁线点击
                clickStation: "1050035", //地铁站点击
                clickDistrictSection: encodeURIComponent('{"eventName": "1050043"}'),// 点击区域tab
                clickMetroSection: encodeURIComponent('{"eventName": "1050044"}'),// 点击地铁tab
            },
            price: {
                clickButton: "1050017",// 
                // clickItem: "",// 选项点击            
            },
            houseTypes: {
                clickConfirm: encodeURIComponent('{"eventName: "1050019"}')
            },            
        }
    };

    Filter.ESFDEFAULT = {
        distances: [{value: "", text: "不限（智能范围）"},{value: "500", text: "500米"},{value: "1000", text: "1000米"},{value: "2000", text: "2000米"},{value: "5000", text: "5000米"}],// 二手房才有附近筛选功能
        sorts: [{                    
            text: "默认排序",
            bigDataParam: encodeURIComponent('{"eventName": "1068007"}')
        },{
            id: "1",
            text: "单价从低到高",
            bigDataParam: encodeURIComponent('{"eventName": "1068002"}')
        },{
            id: "2",
            text: "单价从高到低",
            bigDataParam: encodeURIComponent('{"eventName": "1068003"}')
        },{
            id: "3",
            text: "总价从低到高",
            bigDataParam: encodeURIComponent('{"eventName": "1068008"}')
        },{
            id: "4",
            text: "总价从高到低",
            bigDataParam: encodeURIComponent('{"eventName": "1068009"}')
        },{
            id: "6",
            "text": "面积从小到大",
            bigDataParam: encodeURIComponent('{"eventName": "1068010"}')
        },{
            id: "5",
            text: "面积从大到小",
            bigDataParam: encodeURIComponent('{"eventName": "1068011"}')
        },{
            id: "7",
            text: "发布时间从近到远",
            bigDataParam: encodeURIComponent('{"eventName": "1068001"}')
        }],
        houseTypes: [{
            name: "types",//用来作为返回查询条件的key
            title: "户型",
            items: [{                
                text: "不限",
                exclusive: true,//互斥
                bigDataParam: encodeURIComponent('{"eventName": "1068020", room: 0}')
            },{
                id: "1",
                text: "一室",
                exclusive: false,//互斥
                bigDataParam: encodeURIComponent('{"eventName": "1068020", room: 1}')
            },{
                id: "2",
                text: "二室",
                exclusive: false,//互斥
                bigDataParam: encodeURIComponent('{"eventName": "1068020", room: 2}')
            },{
                id: "3",
                text: "三室",
                exclusive: false,//互斥
                bigDataParam: encodeURIComponent('{"eventName": "1068020", room: 3}')
            },{
                id: "4",
                text: "四室",
                exclusive: false,//互斥
                bigDataParam: encodeURIComponent('{"eventName": "1068020", room: 4}')
            },{
                id: "5",
                text: "五室及以上",
                exclusive: false,//互斥
                bigDataParam: encodeURIComponent('{"eventName": "1068020", room: 5}')
            }]
        },{
            name: "features",
            title: "特色",
            items: [{
                id: "fd",
                text: "降价",
                bigDataParam: encodeURIComponent('{"eventName": "1068049", feature: "6"}')
            },{
                id: "n",
                text: "新上",
                bigDataParam: encodeURIComponent('{"eventName": "1068049", feature: "7"}')
            },{
                id: "m2",
                text: "满二",
                bigDataParam: encodeURIComponent('{"eventName": "1068049", feature: "1"}')
            },{
                id: "m5",
                text: "满五唯一",
                bigDataParam: encodeURIComponent('{"eventName": "1068049", feature: "2"}')
            },{
                id: "f1",
                text: "地铁房",
                bigDataParam: encodeURIComponent('{"eventName": "1068049", feature: "3"}')
            },{
                id: "s",
                text: "近学校",
                bigDataParam: encodeURIComponent('{"eventName": "1068049", feature: "4"}')
            },{
                id: "f2",
                text: "有视频",
                bigDataParam: encodeURIComponent('{"eventName": "1068049", feature: "5"}')
            },{
                id: "ns",
                text: "南北通透",
                bigDataParam: encodeURIComponent('{"eventName": "1068049", feature: "8"}')
            }]
        },{
            name: "areas",
            title: "面积",
            items: [{
                id: "1",
                text: "50以下",
                bigDataParam: encodeURIComponent('{"eventName": "1068047", area_range: "0-50"}')
            },{
                id: "2",
                text: "50-70",
                bigDataParam: encodeURIComponent('{"eventName": "1068047", area_range: "50-70"}')
            },{
                id: "3",
                text: "70-90",
                bigDataParam: encodeURIComponent('{"eventName": "1068047", area_range: "70-90"}')
            },{
                id: "4",
                text: "90-110",
                bigDataParam: encodeURIComponent('{"eventName": "1068047", area_range: "90-110"}')
            },{
                id: "5",
                text: "110-130",
                bigDataParam: encodeURIComponent('{"eventName": "1068047", area_range: "110-130"}')
            },{
                id: "6",
                text: "130-150",
                bigDataParam: encodeURIComponent('{"eventName": "1068047", area_range: "130-150"}')
            },{
                id: "7",
                text: "150-200",
                bigDataParam: encodeURIComponent('{"eventName": "1068047", area_range: "150-200"}')
            },{
                id: "8",
                text: "200-300",
                bigDataParam: encodeURIComponent('{"eventName": "1068047", area_range: "200-300"}')
            },{
                id: "9",
                text: "300以上",
                bigDataParam: encodeURIComponent('{"eventName": "1068047", area_range: "300"}')
            }]
        },{
            name: "houseTypes",
            title: "房屋类型",
            items: [{
                id: "1",
                text: "公寓",
                bigDataParam: encodeURIComponent('{"eventName": "1068050", feature: "1"}')
            },{
                id: "2",
                text: "别墅",
                bigDataParam: encodeURIComponent('{"eventName": "1068050", feature: "2"}')
            }]
        },{
            name: "decorations",
            title: "装修",
            items: [{
                id: "1",
                text: "毛坯",
                bigDataParam: encodeURIComponent('{"eventName": "1068054", feature: "1"}')
            },{
                id: "2",
                text: "简装",
                bigDataParam: encodeURIComponent('{"eventName": "1068054", feature: "2"}')
            },{
                id: "3",
                text: "中装",
                bigDataParam: encodeURIComponent('{"eventName": "1068054", feature: "3"}')
            },{
                id: "4",
                text: "精装",
                bigDataParam: encodeURIComponent('{"eventName": "1068054", feature: "4"}')
            },{
                id: "5",
                text: "豪装",
                bigDataParam: encodeURIComponent('{"eventName": "1068054", feature: "5"}')
            }]
        },{
            name: "ages",
            title: "房龄",
            items: [{
                id: "1",
                text: "5年以内",
                bigDataParam: encodeURIComponent('{"eventName": "1068051", feature: "1"}')
            },{
                id: "2",
                text: "5-10年",
                bigDataParam: encodeURIComponent('{"eventName": "1068051", feature: "2"}')
            },{
                id: "3",
                text: "10-20年",
                bigDataParam: encodeURIComponent('{"eventName": "1068051", feature: "3"}')
            },{
                id: "4",
                text: "20年以上",
                bigDataParam: encodeURIComponent('{"eventName": "1068051", feature: "4"}')
            }]
        }],
        bigDataParams: {
            sort: {
                clickTab: encodeURIComponent('{"eventName": "1068006"}')
            },
            districtAndMetro: {
                clickTab: encodeURIComponent('{"eventName":"1068029"}'),
                clickItem: "1068018", // 区域筛选条件
                clickDistrict: "1068041", // 区域点击
                clickTown: "1068042", //板块点击
                clickMetro: "1068043",// 地铁线点击
                clickStation: "1068044", //地铁站点击
                clickDistrictSection: encodeURIComponent('{"eventName":"1068055"}'),// 点击区域tab
                clickMetroSection: encodeURIComponent('{"eventName": "1068056"}'),// 点击地铁tab
            },
            price: {
                clickButton: "1068019",// 
                clickItem: "",// 选项点击  
                clickTab: encodeURIComponent('{"eventName":"1068030"}'),//           
            },
            houseTypes: {
                clickConfirm: encodeURIComponent('{"eventName":"1068021"}'),
                clickReset: encodeURIComponent('{"eventName": "1068004"}'),// 点击重置
                clickTab: encodeURIComponent('{"eventName": "1068031"}')
            },            

        }
    };

    // 低价位城市价格选择项（二手房和新房）
    Filter.LOWPRICES = {
        prices: [{
            id: "",
            text: "不限"
        },{
            id: "21",
            text: "50万以下"
        },{
            id: "22",
            text: "50-80万"
        },{
            id: "23",
            text: "80-100万"
        },{
            id: "24",
            text: "100-150万"
        },{
            id: "25",
            text: "150-200万"
        },{
            id: "26",
            text: "200-300万"
        },{
            id: "27",
            text: "300-500万"
        },{
            id: "28",
            text: "500万以上"
        }]
    };

    return Filter;
});