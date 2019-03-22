// 首页 index 数据
export const index = {
    // banner 数据
    bannerData: [
        "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1547783538&di=bcf45a4889992b062b5999876b2190e3&src=http://img.zcool.cn/community/01ab4c5ad9bacfa801214a611b7787.jpg@2o.jpg",
        "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3791343697,1569674109&fm=26&gp=0.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547793754717&di=21a947b2c4a058a18d39d560d9f99cab&imgtype=0&src=http%3A%2F%2Fimg1.gtimg.com%2Fhouseedong%2Fpics%2Fhv1%2F53%2F17%2F191%2F12424163.jpg"
    ],
    // 今日推荐
    foodRecommendList: [
        {
            sml_image: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2122824689,1479767289&fm=27&gp=0.jpg",
            goodsname: "肉沫茄子煲",
            price: 12
        },
        {
            sml_image: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2122824689,1479767289&fm=27&gp=0.jpg",
            goodsname: "肉沫茄子煲",
            price: 12
        },
        {
            sml_image: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2122824689,1479767289&fm=27&gp=0.jpg",
            goodsname: "肉沫茄子煲",
            price: 12
        },
        {
            sml_image: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2122824689,1479767289&fm=27&gp=0.jpg",
            goodsname: "肉沫茄子煲",
            price: 12
        },
        {
            sml_image: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2122824689,1479767289&fm=27&gp=0.jpg",
            goodsname: "肉沫茄子煲",
            price: 12
        },
        {
            sml_image: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2122824689,1479767289&fm=27&gp=0.jpg",
            goodsname: "肉沫茄子煲",
            price: 12
        }
    ],
    // 养生推荐数据
    healthRecommendList: [
        {src: "/static/images/index/health-recommend1.png", title: "冬季养生之选材"},
        {src: "/static/images/index/health-recommend2.png", title: "秋天吃什么补气血"}
    ],
    canteenType: ["全部", "第一饭堂", "第二饭堂"],
    // 饭堂
    canteenFloorType: {
        "全部": [
          "全部"
        ],
        "第一饭堂": [
            "一楼",
            "二楼",
            "三楼"
        ],
        "第二饭堂": [
            "二楼",
            "三楼"
        ],
    },
    // 菜品列表
    foodList: [
        {
            sml_image: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2710064199,2180614330&fm=27&gp=0.jpg",
            title: "烧鸭饭",
            canteenType: "一饭二楼",
            type: "腊味",
            price: "10",
            sold_num: 28
        },
        {
            sml_image: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2710064199,2180614330&fm=27&gp=0.jpg",
            title: "烧鸭饭",
            canteenType: "一饭二楼",
            type: "腊味",
            price: "10",
            sold_num: 28
        },
        {
            sml_image: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2710064199,2180614330&fm=27&gp=0.jpg",
            title: "烧鸭饭",
            canteenType: "一饭二楼",
            type: "腊味",
            price: "10",
            sold_num: 28
        },
        {
            sml_image: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2710064199,2180614330&fm=27&gp=0.jpg",
            title: "烧鸭饭",
            canteenType: "一饭二楼",
            type: "腊味",
            price: "10",
            sold_num: 28
        }
    ],
    qrCodeList: {
        "0101001": "一饭一楼 001餐桌",
        "0101002": "一饭一楼 002餐桌",
        "0101003": "一饭一楼 003餐桌",
        "0102001": "一饭二楼 001餐桌",
    }
}

// 订单 order 数据
export const orderData = {
    orderList: [{
        "id": "23",
        "order_id": "11",
        "goods_name": "牛肉豆腐煲",
        "commit_state": "0",
        "price": "9.00",
        "image": "http://www.steffenkong.cn/Project/Application/Admin/Public/Upload/2018-12-18/5c18ef0e8211e.jpg",
        "type_name": "饭",
        "canteenType": "二饭二楼",
        "goods_num": "1",
        "create_time": "1547108147"
    }, {
        "id": "24",
        "order_id": "12",
        "goods_name": "煲仔菜",
        "commit_state": "0",
        "price": "8.00",
        "image": "http://www.steffenkong.cn/Project/Application/Admin/Public/Upload/2018-12-18/5c18e07e41377.jpg",
        "type_name": "饭",
        "canteenType": "二饭一楼",
        "goods_num": "1",
        "create_time": "1547108147"
    }]
}
