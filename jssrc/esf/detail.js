/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：悟空找房h5
 2. 页面名称：rent/list(租房-列表)
 3. 作者：liyang@lifang.com
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


class DetailController extends Controller {
    constructor() {
        super();
        $('.more').hide();
        let rowNum=Math.round($(".base-info").height()/parseFloat($(".base-info").css('line-height')));
        if(rowNum > 5){
            $(".base-info").addClass('word-line');
            $('.more').show();
        }else {
            $(".base-info").removeClass('word-line');
            $('.more').hide();
        }
        $('.more').click(function () {
            $(".base-info").removeClass('word-line');
            $('.more').hide();
        });
        let myChart = echarts.init(document.getElementById('main'),{ width: '82%' });
        // 指定图表的配置项和数据
        let option = {
            tooltip: {      // 提示框
                trigger: 'item',
                triggerOn: 'click',
                position: 'top',
                backgroundColor: '#92A7C3',
                padding: 4,
                textStyle: {
                    color: '#fff',
                    fontSize: '12'
                },
                formatter: '{c}元'
            },
            xAxis: {
                data: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],  // X坐标数据
                splitLine: {show: false}, // 控制网格线是否显示
                axisTick: {show: false},  // 去除x轴上的刻度线
                position: 'bottom',
                type: 'category',
                boundaryGap: false,
                axisLine: {
                    lineStyle: {
                        color: '#979797', // x轴颜色
                    }
                },
                axisLabel: {
                    interval: 0,
                    rotate: 0, //60度角倾斜显示
                    textStyle: {
                        color: '#999',
                        fontSize: 12,
                        fontFamily: '微软雅黑'
                    }
                },
            },
            yAxis: {
                axisLine: {show: false},   // y轴是否显示
                splitLine: {
                    show: true,  // 控制网格线是否显示
                    lineStyle: {
                        color: ['#979797'] // y刻度颜色
                    }
                },
                axisTick: {show: false},// 去除y轴上的刻度线
                axisLabel:{
                    inside: false,
                    textStyle: {
                        color: '#999',
                    },
                    formatter: function(value, index) {
                        if (value == 0) {
                            return "";
                        } else {
                            return value / 10000 + '万';
                        }
                    }
                },
            },
            series: [{
                name: '销量',
                type: 'line',
                lineStyle:{
                    normal:{
                        color:'#92A7C3', // 折线条颜色
                    }

                },
                itemStyle:{
                    normal:{
                        color: "#92A7C3" //图标颜色
                    },
                    emphasis: { //重点，强调时候的样式，即当鼠标悬停或点击上去的时候的拐点的样式
                        borderColor: '#92A7C3',
                        borderWidth: 2,
                        color: '#92A7C3'
                    }
                },
                data: [50000, 200000, 360000, 100000, 100000, 200000,50000, 200000, 360000, 100000, 100000, 200000],

            }],
        };
        myChart.setOption(option);
    }
}


/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
类的初始化
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).ready(function() {
    new DetailController;
});