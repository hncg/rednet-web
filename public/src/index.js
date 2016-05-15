option = {
    // title: {
    //     text: '湖南省各州市当天情感分布图',
    //     subtext: '',
    //     left: 'center'
    // },
    visualMap: {
        min: -2500,
        max: 2500,
        text: ['高','低'],           // 文本，默认为数值文本
        calculable: true,
        inRange: {
            color: ['#FF0000', '#990000', '#ff6600', '#ffffff', '#00ffff', '#00ff00']
        },
        hoverLink: true,
    },
    tooltip: {
        trigger: 'item'
    },
    series: [
        {
            name: '情感值',
            type: 'map',
            mapType: '湖南',
            roam: false,
            label: {
                normal: {
                    show: true
                },
                emphasis: {
                    show: true
                },
                position:'auto'
            },
            data:[
                // {name: '永州市',value: Math.round(Math.random()*1000)},
                // {name: '邵阳市',value: Math.round(Math.random()*1000)},
                // {name: '郴州市',value: Math.round(Math.random()*1000)},
                // {name: '常德市',value: Math.round(Math.random()*1000)},
                // {name: '湘西土家族苗族自治州',value: Math.round(Math.random()*1000)},
                // {name: '衡阳市',value: Math.round(Math.random()*1000)},
                // {name: '岳阳市',value: Math.round(Math.random()*1000)},
                // {name: '益阳市',value: Math.round(Math.random()*1000)},
                // {name: '长沙市',value: Math.round(Math.random()*1000)},
                // {name: '张家界市',value: Math.round(Math.random()*1000)},
                // {name: '怀化市',value: Math.round(Math.random()*1000)},
                // {name: '湘潭市',value: Math.round(Math.random()*1000)},
                // {name: '株洲市',value: Math.round(Math.random()*1000)},
                // {name: '娄底市',value: Math.round(Math.random()*1000)}
            ]
        },
    ]

}
var Moods;

var HnMap = React.createClass({
    loadMoods: function() {
        $.ajax({
            url:  './api/v1/mood',
            cache: false,
            type: 'get',
            success: function(moods) {
                Moods = moods;
                series = get_series(Moods, "cps");
                option.series[0].data = series.data;
                option.visualMap.max = series.eage;
                option.visualMap.min = -series.eage;
                var myChart = echarts.init(document.getElementById('hnMap'));
                myChart.on("click", function (events){
                    city = events.name;
                    window.open("./detail/index.html?city=" + city);
                });
                myChart.setOption(option);
            }.bind(this),
            error: function(xhr, status,err) {
                console.log(xhr, status, err.toString());
            }
        });
    },
    getInitialState: function() {
        return {moods: []};
    },
    componentDidMount: function() {
        this.loadMoods();

    },
    render: function() {
        return (
            <div>
                <div id="hnMap"></div>
            </div>
        )
    }
});

var Rednet = React.createClass({
    render: function() {
        return (
            <div>
                <HnMap></HnMap>
            </div>
        )
    }
});

ReactDOM.render(
  <Rednet></Rednet>,
  document.getElementById('rednet')
);