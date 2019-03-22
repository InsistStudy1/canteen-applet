Component({
    properties: {
        maxUploadNum: {
            type: Number,
            value: 4
        }
    },
    data: {
        tempFilePaths: [], // 上传图片
        addShowFlag: true, // 是否显示上传图片
        addText: '上传图片'
    },
    methods: {
        // 添加图片
        joinPicture () {
            let self = this
            let maxUploadNum = self.data.maxUploadNum
            wx.chooseImage({
                count: maxUploadNum,
                success: res => {
                    let nowTempFilePaths = res.tempFilePaths // 刚刚添加的图片集
                    let tempFilePaths = this.data.tempFilePaths.concat(nowTempFilePaths) // 把添加的图片和原来的图片拼接起来
                    if (tempFilePaths.length > maxUploadNum  ) { // 如果图片总长度大于最大值
                        wx.showToast({
                            title: '图片长度超过4张',
                            icon: 'error'
                        })
                        tempFilePaths.splice(maxUploadNum) // 删除剩最大张数
                    }
                    if (tempFilePaths.length >= maxUploadNum ) { // 如果图片已经到达最大张数，不再显示添加图片
                        this.setData({
                            addShowFlag: false
                        })
                    }

                    // 把数据传递给调用者
                    self.triggerEvent('getimagelist', {imageList: tempFilePaths})

                    this.setData({ //更新数据
                        tempFilePaths,
                        addText: maxUploadNum - tempFilePaths.length + '/' + maxUploadNum
                    })
                }
            })
        },
        // 删除图片
        delImage (e) {
            let self = this
            let index = e.target.dataset.index // 获取要删除的索引
            let maxUploadNum =  self.data.maxUploadNum
            this.data.tempFilePaths.splice(index, 1)
            this.setData({
                addShowFlag: true,
                tempFilePaths: self.data.tempFilePaths,
                addText: maxUploadNum - self.data.tempFilePaths.length + '/' + maxUploadNum
            })
        }
    }
})
