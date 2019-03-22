Component({
    properties: {
        MaskImgArr: Array // 遮罩显示图片
    },
    data: {
        showMaskFlag: false // 是否显示放大图片遮罩
    },
    methods: {
        // 放大图片
        showImageMask (e) {
            console.log(1);
            let index = e.currentTarget.dataset.index;
            let MaskImgArr = this.data.commentList[index]['comment_images'];
            this.setData({
                showMaskFlag: true,
                MaskImgArr
            })
        },
        // 隐藏遮罩
        hideImageMask () {
            this.setData({
                showMaskFlag: false,
            })
        }
    }
})
