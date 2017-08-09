<template>
<div class="app">
    <!--地图容器  -->
    <div id="container"></div>
    <!--定位当前所在位置按钮  -->
    <div class="geolocation-btn" @click="onGeoLocationBtnClick"></div>
    <!--地图放大按钮  -->
    <div class="map-up-btn" @click="onMapUpBtnClick"></div>
    <!--地图缩小按钮  -->
    <div class="map-down-btn" @click="onMapDownBtnClick"></div>
</div>
</template>

<script>

export default {
    name: 'app',
    components: {

    },
    props: {
        data: {}
    },
    data() {
        return {
            map: null
        }
    },
    computed: {
        markerData(){
            let markerData = [];
            if (this.$store.state.ajaxData && this.$store.state.ajaxData.length) {
                markerData = this.$store.state.ajaxData;
            }
            return markerData;
        }
    },
    mounted() {
        // 定位当前位置
        this.onGeoLocationBtnClick();
        // 异步获取网络数据
        this.$store.dispatch('fetchData');

        var map = new qq.maps.Map(document.getElementById("container"), {
            // 地图的中心地理坐标。
            center: new qq.maps.LatLng(31.216579,121.420914),
            zoom: 17 // 最大18 最小4
        });

        // function update() {
        //     var currentZoom = map.getZoom();
        //     console.log(currentZoom)
        //     qq.maps.event.trigger(zoomLevelControl, "resize");
        // }
        // //添加dom监听事件  一旦zoom的缩放级别发生变化则触发update函数
        // qq.maps.event.addDomListener(map, "zoom_changed", update);
        
        // 地图中心位置改变
        qq.maps.event.addDomListener(map, "center_changed", function () {
            console.log("地图中心位置改变");
            console.log(map.getCenter());
        });

        this.map = map;
        this.createCluster();
    },
    methods: {
        onGeoLocationBtnClick(){
            var self = this;
            var options = {timeout: 8000};
            function showPosition(position) {
                self.map.panTo(new qq.maps.LatLng(position.lat, position.lng));
                // 覆盖物
                var marker = new qq.maps.Marker({
                    position: new qq.maps.LatLng(position.lat, position.lng),
                    map: self.map,
                    animation:qq.maps.MarkerAnimation.DROP
                });
                // 自定义覆盖物图标
                var size = new qq.maps.Size(20, 20),
                    origin = new qq.maps.Point(0, 0),
                    markerIcon = new qq.maps.MarkerImage(
                        "https://p1.meituan.net/education/015a669771407537bacd5fb55aac7a0a1580.png",
                        size, 
                        origin,
                        new qq.maps.Point(10, 0),
                        new qq.maps.Size(20, 20)
                    );
                marker.setIcon(markerIcon);
            };
            function showErr() {
            };
            var geolocation = new qq.maps.Geolocation("YSPBZ-FEM6P-FXZDL-VH3G6-EMXK5-C2F7J", "时趣");
            geolocation.getLocation(showPosition, showErr, options)
        },
        onMapUpBtnClick(){
            let currentZoom = this.map.getZoom();
            this.map.setZoom(currentZoom + 1);
        },
        onMapDownBtnClick(){
            let currentZoom = this.map.getZoom();
            this.map.setZoom(currentZoom - 1);
        },
        createCluster() {
            var Marker = qq.maps.Marker;
            var LatLng = qq.maps.LatLng;
            var Event = qq.maps.event;
            var MarkerImage = qq.maps.MarkerImage;
            var MarkerShape = qq.maps.MarkerShape;
            var MarkerAnimation = qq.maps.MarkerAnimation;
            var Point = qq.maps.Point;
            var Size = qq.maps.Size;
            var ALIGN = qq.maps.ALIGN;
            var MVCArray = qq.maps.MVCArray;
            var MarkerCluster = qq.maps.MarkerCluster;
            var MarkerDecoration = qq.maps.MarkerDecoration;
            var markers = new MVCArray();
            var markerCluster;
            
            for (var i = 0; i < this.markerData.length; i++) {
                var latLng = new LatLng(this.markerData[i].lat, this.markerData[i].lng);
                var marker = new Marker({
                    'position': latLng,
                    map: this.map,
                    markerId: i //给覆盖物设置唯一标识
                });
                // 自定义覆盖物图标
                var markerIcon = new qq.maps.MarkerImage(
                        this.categoryIcon(this.markerData[i].category),
                        new Size(26, 30),
                        new qq.maps.Point(0, 0),
                        new qq.maps.Point(13, 0),
                        new qq.maps.Size(26, 30)
                    );
                marker.setIcon(markerIcon);
                // 添加文本标注 
                var label = new qq.maps.Label({
                    position: new qq.maps.LatLng(this.markerData[i].lat, this.markerData[i].lng),
                    map: this.map,
                    offset: new qq.maps.Size(-42, 33),
                    style: {
                        color: "#333",
                        fontSize: "12px",
                        lineHeight: "14px",
                        border: "1px #d7d7d7 solid",
                        borderRadius: "20px",
                        padding: "0px 5px",
                        textAlign: "center",
                        width: "74px",
                        whiteSpace: "nowrap",
                        wordWrap: "normal",
                        textOverflow: "ellipsis",
                        overflow: "hidden"
                    },
                    content:'' + this.markerData[i].shopName
                });
                markers.push(marker);
                Event.addListener(marker, 'click', function(e) {
                    console.log('点击了覆盖物');
                    console.log(e.target.markerId);
                });
            }
    
            var markerClusterer = new MarkerCluster({
                map: this.map,
                minimumClusterSize: 2, //默认2
                markers: markers,
                zoomOnClick: false, //默认为true
                gridSize: 30, //默认60
                averageCenter: true, //默认false
                maxZoom: 18, //默认18
                styles: [{
                            icon: new MarkerImage(
                                "https://p1.meituan.net/education/62dd3c033c9e53ea4c5ed4726f371da71591.png", 
                                new Size(36, 36),
                                new qq.maps.Point(0, 0),
                                new qq.maps.Point(18, 0),
                                new qq.maps.Size(36, 36)
                            ),
                            text: new MarkerDecoration('<div style="color:#fff;font-size:12px;font-weight:bold;line-height:14px;">{num}</div>', new Point(0, 0))
                        }]
            });
    
            // 聚合覆盖物的点击事件
            Event.addListener(markerClusterer, 'clusterclick', function(evt) {
                console.log('点击了聚合点');
                console.log(evt);
            });
        },
        categoryIcon(category){
            let icon = "";
            switch (category) {
                case "ktv":
                    icon = "https://p0.meituan.net/education/c0c61acf8208ceb8ec31c4c21656a65f2521.png";
                    break;
                case "education":
                    icon = "https://p0.meituan.net/education/7ab2bd8d44fb4b51455013143e504da62123.png";
                    break;
                case "eat":
                    icon = "https://p1.meituan.net/education/eab18254262ce1913cc884004df5d2732313.png";
                    break;
                default:
                    break;
            }
            return icon;
        }
    },

}
</script>

<style scoped lang="less" rel="stylesheet/less">
.app {
    #container{
        position: fixed !important;
        width: 100%;
        height: 100%;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 999;
        
    }
    .geolocation-btn{
        position: fixed !important;
        width: 30px;
        height: 30px;
        background-size: 30px 30px;
        background-image: url('https://p1.meituan.net/education/a7ca3c8f622de5cf6f26a8f72fea35fb1480.png');
        bottom: 40px;
        left: 15px;
        z-index: 1000;
    }
    .map-up-btn{
        position: fixed !important;
        width: 30px;
        height: 30px;
        background-size: 30px 30px;
        background-image: url('https://p0.meituan.net/education/8a5f5f15cdcba33b037bc4eb73fee5a0328.png');
        bottom: 80px;
        right: 15px;
        z-index: 1000;
    }
    .map-down-btn{
        position: fixed !important;
        width: 30px;
        height: 30px;
        background-size: 30px 30px;
        background-image: url('https://p0.meituan.net/education/37440e1babbd8c455709a3f04da01739242.png');
        bottom: 40px;
        right: 15px;
        z-index: 1000;
    }
}
</style>
