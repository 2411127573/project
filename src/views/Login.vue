<template>
  <div>
    <mt-header title="注册页面">
      <router-link to="/" slot="left">
        <mt-button icon="back">
          <img src="../../public/img/homepage.png" slot="icon">
        </mt-button>
      </router-link>
    </mt-header>

      <mt-field 
        type="text"
        label="用户名"
        placeholder="请输入用户名"
        :attr="{maxlength:16}"
        v-model="username"
        @blur.native.capture="checkUsername"
        :state="usernameState">
      </mt-field>
      <mt-field 
        type="password"
        label="密码"
        placeholder="请输入密码"
        :attr="{maxlength:16,autocomplete:'off'}"
        v-model="password"
        @blur.native.capture="checkPasssword"
        :state="passwordState">
      </mt-field>

      <mt-button type="primary" size="large" @click="handel">登录</mt-button>
  </div>
</template>
<style scoped>
  .shortcut{
    text-decoration: none;
  }
</style>
<script>

export default {
  data(){
    return {
      username:"",
      password:"",
      usernameState:"",
      passwordState:""
    }
  },

  methods:{
    checkUsername(){
      let usernameRegExp=/^[\u4e00-\u9fa50-9a-zA-Z]{6,16}$/;
      if(usernameRegExp.test(this.username)){
        this.usernameState="success";
        return true;
      }else{
        this.usernameState="error";
        this.$toast({
          message:"用户名为必填项",
          position:"top",
          duration:"3000"
        });
        return false;
      }
    },
    checkPasssword(){
      let passwordRegExp=/^[\u4e00-\u9fa50-9a-zA-Z]{6,16}$/;
      if(passwordRegExp.test(this.password)){
        this.passwordState="success";
        return true;
      }else{
        this.passwordState="error";
        this.$toast({
          message:"密码为数字、字母的组合体",
          position:"top",
          duration:"3000"
        });
        return false;
      }
    },
    handel(){
      if(this.checkUsername()&&this.checkPasssword()){
        let obj={
          username:this.username,
          password:this.password
        };
      // this.$store.dispatch("login",obj)
        this.axios.post("/login",this.qs.stringify(obj)).then(res=>{
          if(res.data.code==200){
            this.$router.push("/");
          }else{
            this.$messagebox("登录提示","用户名或密码错误")
          }
        })
      }
    }
  }
}
</script>