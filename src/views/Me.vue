<template>
  <div>
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
      <mt-tabbar v-model="tabbar" fixed>
        <mt-tab-item id="index">首页
          <img src="../../public/img/index_enabled.png" slot="icon" v-if="tabbar=='index'">
          <img src="../../public/img/index_disabled.png" slot="icon" v-else>
        </mt-tab-item>
        <mt-tab-item id="me">我的
          <img src="../../public/img/me_enabled.png" slot="icon" v-if="tabbar=='me'">
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
</style>

<script>
export default {
  data(){
    return {
      tabbar:"me"
    }
  },
  watch:{
    tabbar(value){
      if(value=="index"){
        this.$router.push("/").catch(e=>{})
      }
      if(value=="me"){
        
        this.$router.push("/me").catch(e=>{})
      }
    }
  }
}
</script>