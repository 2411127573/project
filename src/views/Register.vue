<template>
  <div>
    <mt-header title="注册页面">
      <router-link to="/" slot="left">
        <mt-button icon="back">
          <img src="../../public/img/homepage.png" slot="icon">
        </mt-button>
      </router-link>
      <router-link to="/login" slot="right" class="shortcut">登录</router-link>
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
      <mt-field 
        type="password"
        label="确认密码"
        placeholder="请再次输入密码"
        :attr="{maxlength:16,autocomplete:'off'}"
        v-model="conpassword"
        @blur.native.capture="checkConpasssword"
        :state="conpasswordState">
      </mt-field>

      <mt-button type="primary" size="large" @click="handel">免费注册</mt-button>
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
      conpassword:"",
      usernameState:"",
      passwordState:"",
      conpasswordState:""
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
    checkConpasssword(){
      if(this.conpassword!==this.password){
        this.conpasswordState="error";
        this.$toast({
          message:"两次密码不一致",
          position:"top",
          duration:"3000"
        });
        return false;
      }else{
        this.conpasswordState="success";
        return true;
      }
    },
    handel(){
      console.log(this.username,this.password);
      if(this.checkUsername()&&this.checkPasssword()&&this.checkConpasssword()){
        this.axios.post("/register","username="+this.username+"&password="+this.password).then(res=>{
          if(res.data.code==200){
            this.$router.push("/login");
          }else{
            this.$messagebox("注册提示","用户名已占用")
          }
      })
      }
    }
  }
}
</script>