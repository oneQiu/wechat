<template>
  <div id="box">
    <div id="inner">
      <div id="main">
        <div class="main_item">
          <van-image width="35" height="35" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        </div>
        <div class="main_item">
          <van-icon name="chat-o" size="25px" />
        </div>
        <div class="main_item">
          <van-icon name="user-o" size="25px" />
        </div>
        <div class="main_item">
          <van-icon name="apps-o" size="25px" />
        </div>
        <div class="main_item">
          <van-icon name="sign" size="25px" />
        </div>
        <div class="main_item last_icon">
          <van-icon name="ellipsis" size="25px" />
        </div>
      </div>
      <div id="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data: () => ({
    tips: "这是一个tips"
  }),
  methods: {
    ...mapMutations(["SETNUMS"]),
    setNums() {
      console.log(this);
    }
  }
};
</script>

<style scoped lang="less">
#box {
  position: relative;
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;
  #inner {
    width: 850px;
    height: 642px;
    background: #fff;
    display: flex;
    #main {
      width: 60px;
      background: rgb(38, 42, 47);
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      .main_item {
        width: 100%;
        text-align: center;
        margin: 16px 0;
      }
      .last_icon {
        margin-top: 280px;
      }
    }
  }
  #content {
    flex: 1;
  }
}
</style>
