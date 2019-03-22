const app = getApp();
import { upload, post } from '../../utils/http';
import { errMsg } from '../../utils/utils';
Page({
    data: {
        star: 0, // 星级
        starTextArray: ['差', '一般', '还不错', '很满意', '强烈推荐'], // 星级对应文字
        tempFilePaths: [], // 上传图片
        commentContent: ''
    },
    // 修改星级
    chaneStar (e) {
        const index = e.detail.index;
        this.setData({
            star: index
        });
    },
    // 修改评论内容
    changCommentContent (e) {
        this.setData({
            commentContent: e.detail.value
        });
    },
    // 获取图片
    getImageList (e) {
        this.setData({
            tempFilePaths: e.detail.imageList
        });
    },
    // 发表评论
    postComment () {
        let self = this;
        let { star, commentContent, tempFilePaths } = self.data;
        if (!star) { return errMsg('请给菜品评分'); }
        else if (!commentContent) { return errMsg('评价内容不能为空'); }
        else if (commentContent.length<15) { return errMsg('评价内容需要15字以上哦'); }


        console.log('评论星星数为', star, '评论内容为', commentContent);
        console.log('上传了图片文件为', tempFilePaths);

        // 上传评论内容和星星数量
        // post({
        //     url: app.api.postComment,
        //     data: {
        //         star,commentContent
        //     }
        // }).then(res => {
        //     console.log(res);
        // });

        // 上传照片
        // for (let i = 0;i<tempFilePaths.length; i++) {
        //     upload({
        //         url: app.api.commentImg,
        //         filePath: self.data.tempFilePaths[i],
        //         name: 'commentImage',
        //         loadingText: `正在上传第${i + 1}张图片`,
        //     }).then(res => {
        //         console.log(res);
        //     });
        // }
    }
});
