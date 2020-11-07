<template>
  <div class="acticle">
    <!-- 顶部导航 -->
    <mt-header title="详情页">
      <router-link to="/" slot="left">
        <mt-button icon="back">
          <img src="../../public/img/homepage.png" slot="icon">
        </mt-button>
      </router-link>
    </mt-header>
    <!-- 正文 -->
    <div class="question">
      <!-- 标题 -->
      <div class="question-header">
        <div class="question-header-title">{{info.subject}}</div>
        <div class="question-header-datetime">{{this.moment.unix(info.created_at).format('Y年MM月DD日 HH:mm')}}</div>
      </div>

      <!-- 作者信息 -->
      <div class="author-info">
        <img :src="info.avatar" class="author-info-avtar">
        <div class="author-info-detail">
          <div class="author-info-nickname">{{info.nickname}}</div>
          <div class="author-info-badge">
            共<mt-badge type="primary" size="small">{{info.article_number}}</mt-badge>篇
          </div>
        </div> 
      </div>

      <!-- 内容 -->
      <div class="question-content">
        <div class="rich-content" v-html="info.content"></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .article{
      background: #f6f6f6;
      height: 100vh;
  }
  .question-header{
      margin-bottom: 5px;
      padding: 10px;
      background: #fff;
      box-shadow: 0 1px 3px rgba(26,26,26,.1);
  }
  .question-header-title {
      font-size: 18px;
      color: #1a1a1a;
      line-height: 1.5;
  }
  .question-header-datetime{
      margin-top:5px;
      font-size:14px;
      color:#646464;
  }
  .author-info{
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      padding: 8px 10px;
      background: #fff;
      box-shadow: 0 1px 3px rgba(26,26,26,.1);
      
  }
  .author-info-avatar{
      width:40px;
      height: 40px;
      border-radius: 100%;
  }
  .author-info-detail{
      margin-left:15px;
  }
  .author-info-nickname{
      font-size: 15px;
      margin-bottom:6px;
  }
  .author-info-badge{
      font-size: 14px;
  }
  .question-content {
      padding: 10px;
      background-color:#fff;
  }
  </style>
  <style>
  .rich-content p,.rich-content li{
      padding: 5px 0;
      line-height: 1.7;
  }
  .rich-content img{
      max-width:100%;
}
</style>
<script>
export default {
  data(){
    return {
      info:{}
    }
  },
  mounted(){
    //获取地址栏中的id
    let id=this.$route.params.id;
    this.axios.get('/article?id='+id).then(res=>{
      let data=res.data.result;
      data.avatar=require("../../public/img/avatar/"+data.avatar);
      this.info=data;
    })
  }
}
</script>