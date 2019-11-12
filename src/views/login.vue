<template>
  <div id="box">
    <div id="inner">
      <van-divider
        :style="{ color: '#000', borderColor: '#000', padding: '0 16px',fontSize:'24px', width: '100%',boxSizing:'border-box' }"
      >登录</van-divider>
      <label for="username" class="inputC">
        <div class="ttll">用户名</div>
        <div class="inputW">
          <van-icon name="user-o" />
          <input type="text" placeholder="请输入用户名" id="username" class="inpuC" v-model="username" />
        </div>
      </label>
      <label for="password" class="inputC">
        <div>密码</div>
        <div class="inputW">
          <van-icon name="closed-eye" />
          <input type="password" placeholder="请输入密码" id="password" class="inpuC" v-model="password" />
        </div>
      </label>
      <div class="btnWarp">
        <van-button
          color="#7232dd"
          size="large"
          round
          loading-text="登录中..."
          @click="login"
          :loading="isLogin"
        >登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data: () => ({
    username: "",
    password: "",
    isLogin: false
  }),
  methods: {
    ...mapMutations(["setUser"]),
    login() {
      const { username, password, setUser } = this;
      if (username && username.trim() && password && password.trim()) {
        setUser({ username, password });
        this.isLogin = true;
        this.$socket.emit("login", {
          username,
          password
        });
      }
    }
  },
  mounted() {
    // 监听登录
    this.sockets.subscribe("login", res => {
      if (res.code === 200) {
        setTimeout(() => {
          this.isLogin = false;
          this.$router.push("talk").catch(e => {
            console.log(e);
          });
        }, 2500);
      } else {
        this.isLogin = false;
        this.$notify({
          type: "danger",
          message: res.msg,
          duration: 3000
        });
      }
    });
  }
};
</script>
<style lang="less" scoped>
#box {
  background: url("../assets/bg.jpg") no-repeat;
  background-size: cover;
}
#inner {
  box-sizing: border-box;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 50%;
  height: 80%;
  background: #fff;
  box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.2);
  border-radius: 20px;
}
.btnWarp {
  width: 80%;
  padding-top: 50%;
}
.inputC {
  width: 70%;
  border-bottom: 1px solid #666;
  padding: 5px;
}
.inpuC {
  border: none;
  font-size: 14px;
  background-color: none;
  margin-left: 10px;
}
.inputW {
  padding: 5px 0;
  display: flex;
  align-items: center;
}
.ttll {
  font-size: 12px;
}
</style>