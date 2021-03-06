'use strict';

/**
 * 获取数据
 * @param baseargs --基本参数对象
 * @param cb --回调函数
 */
export function fetchAjaxData (baseargs, cb) {

    let data = [
        {
            shopName: "唛歌时尚KTV",
            lat: "31.21728515625", //维度
            lng: "121.42231750488281", //经度
            category: "ktv"
        },
        {
            shopName: "易园园区食堂",
            lat: "31.215476989746094", //维度
            lng: "121.42064666748047", //经度
            category: "eat"
        },
        {
            shopName: "厨房乐章",
            lat: "31.21701431274414", //维度
            lng: "121.42231750488281", //经度
            category: "eat"
        },
        {
            shopName: "喵星球猫咪咖啡馆",
            lat: "31.215864181518555", //维度
            lng: "121.42137145996094", //经度
            category: "eat"
        },
        {
            shopName: "智源咖啡",
            lat: "31.21513557434082", //维度
            lng: "121.42024230957031", //经度
            category: "eat"
        },
        {
            shopName: "大椒小厨（原侬好蛙）中山公园店",
            lat: "31.215219497680664", //维度
            lng: "121.4225082397461", //经度
            category: "eat"
        },
        {
            shopName: "徐州胡辣汤",
            lat: "31.216875076293945", //维度
            lng: "121.42189025878906", //经度
            category: "eat"
        },
        {
            shopName: "煲王之王",
            lat: "31.21715545654297", //维度
            lng: "121.42232513427734", //经度
            category: "eat"
        },
        {
            shopName: "福建妈祖混沌王",
            lat: "31.216449737548828", //维度
            lng: "121.42233276367188", //经度
            category: "eat"
        },
        {
            shopName: "寿司沼津港",
            lat: "31.21729850769043", //维度
            lng: "121.42024230957031", //经度
            category: "eat"
        },
        {
            shopName: "Home Garden",
            lat: "31.215116500854492", //维度
            lng: "121.4201889038086", //经度
            category: "eat"
        },
        {
            shopName: "粤1525",
            lat: "31.218528747558594", //维度
            lng: "121.42142486572266", //经度
            category: "eat"
        },
        {
            shopName: "龚记高汤馄饨",
            lat: "31.21697998046875", //维度
            lng: "121.42183685302734", //经度
            category: "eat"
        },
        {
            shopName: "百素·我家酸菜鱼",
            lat: "31.21708869934082", //维度
            lng: "121.42235565185547", //经度
            category: "eat"
        },
        {
            shopName: "峰味香黄焖鸡米饭",
            lat: "31.214252471923828", //维度
            lng: "121.4229736328125", //经度
            category: "eat"
        },
        {
            shopName: "TPlus茶家",
            lat: "31.21524429321289", //维度
            lng: "121.42005920410156", //经度
            category: "eat"
        },
        {
            shopName: "王师傅私房牛肉面",
            lat: "31.21773338317871", //维度
            lng: "121.418701171875", //经度
        },
        {
            shopName: "香港永祥烧腊茶餐厅",
            lat: "31.215211868286133", //维度
            lng: "121.42257690429688", //经度
            category: "eat"
        },
        {
            shopName: "兔当家",
            lat: "31.212810516357422", //维度
            lng: "121.42130279541016", //经度
            category: "eat"
        },
        {
            shopName: "嗨锅",
            lat: "31.217803955078125", //维度
            lng: "121.42189025878906", //经度
            category: "eat"
        },
        {
            shopName: "朝日日语",
            lat: "31.218433380126953", //维度
            lng: "121.4202651977539", //经度
            category: "education"
        },
        {
            shopName: "晓燕生煎",
            lat: "31.214210510253906", //维度
            lng: "121.42304992675781", //经度
            category: "eat"
        },
        {
            shopName: "一丁居酒屋",
            lat: "31.212905883789062", //维度
            lng: "121.41860961914062", //经度
            category: "eat"
        },
        {
            shopName: "南京大牌档",
            lat: "31.218793869018555", //维度
            lng: "121.41656494140625", //经度
            category: "eat"
        },
        {
            shopName: "泰妃殿",
            lat: "31.21880531311035", //维度
            lng: "121.41698455810547", //经度
            category: "eat"
        }
    ];

    cb(data);

}
