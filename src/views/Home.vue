<template>
  <div class="home">
    <mt-header title="主页面">
      <router-link to="/" slot="left">
        <mt-button icon="back">
          <img src="../../public/img/homepage.png" slot="icon">
        </mt-button>
      </router-link>
      <router-link to="/register" slot="right" class="shortcut">注册</router-link>
      <router-link to="/login" slot="right" class="shortcut">登录</router-link>
    </mt-header>

    <div>
      <mt-navbar v-model="active">
        <mt-tab-item           
          v-for="(item,index) of category"
          :key="index"
          :id="item.id.toString()">
          {{item.category_name}}
        </mt-tab-item>
      </mt-navbar>
    </div>
    <!-- loadMore -->
    <div 
      class="main"
      v-infinite-scroll="loadMore"
      infinite-scsroll-distance="20"
      infinite-scroll-disabled="busy"
      infinite-scroll-immediate-check="true">
      <mt-tab-container v-model="active">
        <mt-tab-container-item :id="active.toString()">
          <!-- 单一文章信息 -->
          <div class="article"
            v-for="(article,index) of articles" 
            :key="index">  
            <router-link :to="`/article/${article.id}`">
              <!-- 文章标题 -->
              <div class="article-subject">
                {{article.subject}}
              </div>
              <!-- 图片及文章简介 -->
              <div class="article-wrapper">
                <!-- 图片 -->
                <div class="article-image" v-if="article.image!=null">
                  <img :src="article.image">
                </div>
                <!-- 简介 -->
                <div class="article-desc">
                  {{article.description}}
                </div>
              </div>
            </router-link>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>

    <div>
      <mt-tabbar v-model="tabbar" fixed>
        <mt-tab-item id="index">首页
          <img src="../../public/img/index_enabled.png" slot="icon" v-if="tabbar=='index'">
          <img src="../../public/img/index_disabled.png" slot="icon" v-else>
        </mt-tab-item>
        <mt-tab-item id="me">我的
          <img src="../../public/img/me_enabled.png" slot="icon" v-if="tabbar=='index'">
          <img src="../../public/img/me_disabled.png" slot="icon" v-else>
        </mt-tab-item>
      </mt-tabbar>
    </div>
  </div>
</template>
<style scoped>
  .shortcut{
    text-decoration: none;
    margin-left: 5px;
  }
  .main{
    margin-bottom: 55px;
  }
  .article{
	padding-bottom:10px;
	border-bottom:1px solid #999;
	margin:10px;
}
.article a{
  text-decoration: none;
}
/* 文章标题 */
.article-subject{
	font-size:16px;
	line-height:22px;
	font-weight:bold;
	font-family:'Microsoft Yahei';
	color:#1a1a1a;
  margin-bottom: 10px;
}
/* 缩略图及简介容器 */
.article-wrapper{
	display:flex;
	align-items:center;
}
/* 缩略图容器 */
.article-image{
  margin-right: 15px;
}
.article-image img{
  width:112px;
  border-radius: 5px;
}
/* 文章简介容器 */
.article-desc{
	font-size:15px;
	font-weight:400;
	line-height:21px;
	height:63px;
  overflow: hidden;
  color:#999;
}
.tips{
  padding:15px;
  text-align: center;
  background-color:#f5f5f5;
  color:#333;
}
</style>
<script>
export default {
  data(){
    return {
      active:"1",
      tabbar:"index",
      category:[],
      articles:[],     
      busy:false,
      page:1,
      pagecount:0
    }
  },
  methods:{
    /**
     * 加载数据的自定义函数会被mounted,active,loadMore调用
     * 
     * @param cid number 表示文章分类的id
     * @param page number 表示页码
     * 
     * @return void
     * */
    
    loadDate(cid,page){ 
      //显示加载提示框
      this.$indicator.open({
        text:"加载中...",
        spinnerType:"double-bounce"
      });
      this.busy=true;
      this.axios.get("/lists?cid="+cid+"&page="+page).then(res=>{
        let data=res.data.result;
        this.pagecount=res.data.pagecount;
        data.forEach(item=>{
          if(item.image!=null){
            item.image=require("../../public/img/articles/"+item.image);
          }
          this.articles.push(item);
        });
        this.$indicator.close();
        this.busy=false
      });
    },
    
    loadMore(){
      this.page++;
      if(this.page<=this.pagecount){
        this.loadDate(this.active,this.page)
      };
    }
  },
  watch:{
    //监听顶部选项卡
    active(){
      //清除之前可能保存的文章数据
      this.articles=[];
      this.page=1;
      this.loadDate(this.active,this.page)
    },
    //监听底部选项卡
    tabbar(value){
      if(value=="index"){
        this.$router.push("/")
      };
      if(value=="me"){
        this.$router.push("/me")
      }
    }
  },
  mounted(){
    //通过axios工具向服务端发送请求
    this.axios.get("/category").then(res=>{
      this.category=res.data.result;
    });
    this.loadDate(this.active,this.page)
  }
}
</script>