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
      filterChanged: function(condition){},//查询条件变化回调
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
          text: "综合排序"
      }]
  }
  */

define([],function(){
    let template = {
        outline: ``,
        districtMetro: ``,
        total: ``,
        houseType: ``,
        sort:`<ul></ul>`
    };

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
            },{
                id: "1",
                text: "一室",
                exclusive: false,//互斥
            },{
                id: "2",
                text: "二室",
                exclusive: false,//互斥
            },{
                id: "3",
                text: "三室",
                exclusive: false,//互斥
            },{
                id: "4",
                text: "四室",
                exclusive: false,//互斥
            },{
                id: "5",
                text: "五室及以上",
                exclusive: false,//互斥
            }]
        },{
            name: "features",
            title: "特色",
            items: [{
                id: "1",
                text: "进地铁"
            },{
                id: "2",
                text: "即将开盘"
            },{
                id: "3",
                text: "在售楼盘"
            },{
                id: "4",
                text: "有优惠"
            },{
                id: "5",
                text: "有视频"
            }]
        },{
            name: "propertyTypes",
            title: "物业类型",
            items: [{
                id: "1",
                text: "住宅"
            },{
                id: "2",
                text: "别墅"
            },{
                id: "3",
                text: "商用"
            }]
        },{
            name: "decorations",
            title: "装修",
            items: [{
                id: "1",
                text: "毛坯"
            },{
                id: "2",
                text: "简装"
            },{
                id: "3",
                text: "中装"
            },{
                id: "4",
                text: "精装"
            },{
                id: "5",
                text: "豪装"
            }]
        }],
        sorts:[{
            id: "1",
            text: "综合排序"
        },{
            id: "2",
            text: "均价从低到高"
        },{
            id: "3",
            text: "均价从高到低"
        },{
            id: "4",
            text: "面积从小到大"
        },{
            id: "5",
            text: "面积从大到小"
        }]
    };

    //没有模板库，先自己写函数吧
    function createPriceSection(prices){// 价格
        return '<div class="total-price"><ul>' + prices.map(function(price){
            return '<li data-value="'+price.id+'">'+price.text+'</li>';
        }).join('') + '</ul>' + '<div><div><input type="numeric" placeholder="最低价格"></div><div class="normal">-</div><div><input placeholder="最高价格" type="numeric"></div><div class="normal"></div><div><button type="button">确定</button></div></div></div>';
    }

    function createHouseTypeSection(houseTypes){// 户型
        function createUl(items, count){
            count = count || 4;//默认四个作为一个ul
            var result = "";

            var appendCount = count - items.length%count;
            if(appendCount){
                for(var i = 0; i < appendCount; i++) {
                    items.push({id: "", text: ""});
                }
            }

            var times = items.length / count;
            var item = null;
            for(var i = 0; i < times; i++){
                result += "<ul>";
                for(var j = 0; j < count; j++){
                    item = items[i*count + j];
                    if(item.text){
                        result += '<li data-value="'+item.id+'" '+(item.exclusive?'data-exclusive="1"':'')+'>'+item.text+'</li>';
                    }else{
                        result += '<li class="placeholder"></li>';
                    }                    
                }
                result += "</ul>";
            }

            return result;
        }

        return '<div class="house-type"><div class="house-type-inner">' + houseTypes.map(function(houseType){
            return '<div class="house-type-section" data-key="'+ houseType.name +'"><h4>'+houseType.title+'</h4>' + createUl(houseType.items) + '</div>';
        }).join('') + '</div><ul class="operation"><li class="reset">重置</li><li class="confirm">确定</li></ul></div>';
    }

    function createSortSection(sorts){// 排序
        return '<div class="sort"><ul>'+ sorts.map(function(sort){
            return '<li data-value="'+ sort.id +'">'+ sort.text +'</li>';
        }).join('') +'</ul></div>';
    }

    function createDistrctAndMetroSection(options){// 区域（包括区域和地铁）
        

        var district = "";
        var metro = "";

        if(options.districts){// 区域
            district += '<div class="district district-metro-item"><div class="district-inner">';
            district += '<ul class="parent"><li>不限</li>'+ (options.districts && options.districts.map(function(district){
                return '<li data-value="'+district.id+'">' + district.name + '</li>';
            }).join('') || '') +'</ul>';

            district +='<div class="child">' + (options.districts && options.districts.map(function(district){
                return '<ul data-value="'+district.id+'" data-text="'+district.name+'"><li>不限</li>'+ (district.townList && district.townList.map(function(town){
                    return '<li data-value="'+town.id+'">'+town.name+'</li>';
                }).join('') || '') +'</ul>';
            }).join('') || '') + '</div>';

            district += '</div></div>';
        }

        if(options.metros){// 板块
            metro += '<div class="metro district-metro-item"><div class="metro-inner">';
            metro += '<ul class="parent"><li>不限</li>'+ (options.metros && options.metros.map(function(metro){
                return '<li data-value="'+metro.id+'">' + metro.name + '</li>';
            }).join('') || '') +'</ul>';

            metro += '<div class="child">' + (options.metros && options.metros.map(function(metro){
                return '<ul data-value="'+metro.id+'" data-text="'+metro.name+'"><li>不限</li>'+ (metro.subList && metro.subList.map(function(station){
                    return '<li data-value="'+station.id+'">'+station.name+'</li>';
                }).join('') || '') +'</ul>';
            }).join('') || '') + '</div>';

            metro += '</div></div>';
        }
        return '<div class="district-metro"><ul><li class="active">区域</li><li>地铁</li></ul>'+district + metro+'</div>';
    }

    function create(){
        var options = this.options;
        return '<ul class="filter-items"><li><span class="label">区域</span><span class="triangle"></span></li><li><span class="label">总价</span><span class="triangle"></span></li><li><span class="label">户型</span><span class="triangle"></span></li><li><span class="label">排序</span><span class="triangle"></span></li></ul><div class="content"><div class="content-inner">'+createDistrctAndMetroSection({districts: options.districts, metros: options.metros})+createPriceSection(options.prices)+createHouseTypeSection(options.houseTypes)+createSortSection(options.sorts)+'</div></div>';
    }

    function bindEvent() {
        var self = this;
        // 计算查询提交，并调用filterChange回调
        function calcCondition() {
            var result = {};
            // 排序
            $('.sort .active').each(function(){
                result.sort = $(this).data('value');
            });

            // 总价
            $('.total-price .active').each(function(){
                result.price = $(this).data('value');
            });
            // TODO:读取自定义总价

            // 户型
            $('.house-type-section').each(function(){
                var key = $(this).data('key');
                result[key] = [];
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
            
            result = $.extend({}, this.result, result);
            console.log(result);
        }

        // 关闭筛选弹层
        function hide(){            
            self.$content.hide();
            $('.filter .filter-items li').removeClass('open');
            self.$body.removeClass('noscroll');
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
            calcCondition.apply(self);
        });

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
        $('.filter .parent li').click(function(){
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
                hide();
                calcCondition.apply(self);    
                self.$districtLabel.text("区域").parent().removeClass('active');           
            }
        });

        // 板块、地铁站
        $('.filter .district .child li').click(function(){
            var $this = $(this);
            $('.district-metro .child li').removeClass('active');
            $this.addClass('active');
            delete self.result.metro;
            delete self.result.station;
            self.result.district = $this.parent().data('value');
            self.result.town = $this.data('value');
            calcCondition.apply(self);
            hide();
            var str = "";
            if(!self.result.town){// 不限
                str = $this.parent().data('text');
            } else {
                str = $this.text();
            }
            self.$districtLabel.text(str).parent().addClass('active');
        });
        $('.filter .metro .child li').click(function(){
            var $this = $(this);
            $('.district-metro .child li').removeClass('active');
            $this.addClass('active');
            delete self.result.district;
            delete self.result.town;
            self.result.metro = $this.parent().data('value');
            self.result.station = $this.data('value');
            calcCondition.apply(self);
            hide();
            var str = "";
            if(!self.result.station) {// 不限
                str = $this.parent().data('text');
            } else {
                str = $this.text();
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
        var winHeight = $(window).height();
        this.$districtMetro.find('.parent,.child').css('max-height', winHeight * .7 + "px");
        this.$price.find('ul').css('max-height', winHeight * .7 + "px");
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
                console.log('area: success');
            },
            errorCallback: function(){
                self.options.districts = [];
                init.apply(self);
                console.log('area: error');
            },
            exceptionCallback: function(){
                self.options.districts = [];
                init.apply(self);
                console.log('area: exception');
            }
        });

        // 查询地铁
        this.controller.request(this.controller.apiUrl.rent.list.citySubway,{            
            cityId: this.options.cityId
        },{
            successCallback: function(data){
                self.options.metros = data.data;
                init.apply(self);
                console.log('subway: success');
            },
            errorCallback: function(){
                self.options.metros = [];
                init.apply(self);
                console.log('subway: error');
            },
            exceptionCallback: function(){
                self.options.metros = [];
                init.apply(self);
                console.log('subway: exception');
            }
        });
    }

    var initCount = 0;
    function init(){
        initCount++;
        console.log(initCount);
        if(initCount!=2){
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

        
        this.result = {};
        this.initValue = this.$el.data('init');
        if(this.initValue){
            this.initValue = JSON.parse(decodeURIComponent(this.initValue));
        }
        if(this.$el.length == 0) {
            throw "挂载点不存在";
        }
        
        this.setValue(this.initValue);
        bindEvent.apply(this);
        setMaxHeight.apply(this);
    }

    function Filter(options) {        
        this.options = $.extend({},DEFAULT, options);  
        //this.options = options;                      
        this.$el = $(options.el);
        this.controller = options.controller;        

        getDistrictAndMetro.apply(this);


        //init.apply(this);        
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
        if(value.district != undefined || value.town != undefined){            
            if(value.district != undefined) {
                str = this.$district.find('.parent li[data-value='+value.district+']').addClass('active').text();
                this.$district.find('.child ul[data-value='+value.district+']').show();
                this.result.district = value.district;
            }
            if(value.town != undefined) {
                str = this.$district.find('.child li[data-value='+value.town+']').addClass('active').text();
                this.result.town = value.town;
            }                    
        } else if(value.metro != undefined || value.station != undefined){        
            if(value.metro != undefined) {
                str = this.$metro.find('.parent li[data-value='+value.metro+']').addClass('active').text();
                this.$metro.find('.child ul[data-value='+value.metro+']').show();
                this.result.metro = value.metro;
            }
            if(value.station != undefined) {
                str = this.$metro.find('.child li[data-value='+value.station+']').addClass('active').text();
                this.result.station = value.station;
            }

            $('.filter .district-metro >ul li').removeClass('active').filter(':eq(1)').addClass('active');
                       
            this.$district.hide();
            this.$metro.show();
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
        }

        // 户型
        if(value.houseTypes){
            for(var key in value.houseTypes) {
                for(var i = 0; i < value.houseTypes[key].length; i++){
                    this.$houseType.find('[data-key='+key+'] [data-value='+value.houseTypes[key][i]+']').addClass('active');
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
        }
    }

    return Filter;
});