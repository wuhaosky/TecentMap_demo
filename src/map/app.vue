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
            map: null,
            markerData: [
                [31.290679, 121.420914],
                [31.281779, 121.421914],
                [31.272879, 121.422914],
                [31.263979, 121.423914],
                [31.211579, 121.424914],
                [31.215479, 121.425914],
                [31.216379, 121.426914],
                [31.217279, 121.427914],
                [31.218179, 121.428914],
                [31.219079, 121.429914]
                // [31.216579, 121.420914],
                // [31.216679, 121.420914],
                // [31.216779, 121.420914],
                // [31.216879, 121.420914],
                // [31.216879, 121.420914],
                // [31.216729, 121.420914],
                // [31.216539, 121.420914],
                // [31.216649, 121.420914],
                // [31.216559, 121.420914],
                // [31.216169, 121.420914]
            ]
        }
    },
    computed: {

    },
    mounted() {
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

        // 覆盖物
        var marker = new qq.maps.Marker({
            position: new qq.maps.LatLng(31.214579,121.420914),
            map: map
        });
        // 自定义覆盖物图标
        var size = new qq.maps.Size(40, 40),
            origin = new qq.maps.Point(0, 0),
            markerIcon = new qq.maps.MarkerImage(
                "https://p1.meituan.net/dpnewvc/4f8abed20ec6555d1ccc433ed36028391382.png",
                size, 
                origin
            );
        marker.setIcon(markerIcon);

        //添加信息窗口
        // var info = new qq.maps.InfoWindow({
        //     map: map
        // });
        // qq.maps.event.addListener(marker, 'click', function() {
        //     info.open(); 
        //     info.setContent('<div style="text-align:center;white-space:nowrap;">单击标记</div>');
        //     info.setPosition(new qq.maps.LatLng(31.216579,121.420914)); 
        // });

        // 添加文本标注 
        // var label = new qq.maps.Label({
        //     position: new qq.maps.LatLng(31.216579,121.420914),
        //     map: map,
        //     content:'文本标注'
        // });
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
                var size = new qq.maps.Size(35, 35),
                    origin = new qq.maps.Point(0, 0),
                    markerIcon = new qq.maps.MarkerImage(
                        "https://p1.meituan.net/education/60e4d8ca130fbad7a6e34b1909fe10921520.png",
                        size, 
                        origin
                    );
                marker.setIcon(markerIcon);
                // 添加文本标注 
                var label = new qq.maps.Label({
                    position: new qq.maps.LatLng(position.lat, position.lng),
                    map: self.map,
                    offset: new qq.maps.Size(-35, 0),
                    style: {
                        color: "#f00",
                        fontSize: "16px",
                        fontWeight: "bold"
                    },
                    content:'我的位置'
                });
                
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
                var latLng = new LatLng(this.markerData[i][0], this.markerData[i][1]);
                var decoration = new MarkerDecoration(i, new Point(0, -5));
                var marker = new Marker({
                    'position': latLng,
                    map: this.map,
                    markerId: i //给覆盖物设置唯一标识
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
            });
    
            // 聚合覆盖物的点击事件
            Event.addListener(markerClusterer, 'clusterclick', function(evt) {
                console.log('点击了聚合点');
                console.log(evt);
            });
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
