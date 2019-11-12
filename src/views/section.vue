<template>
  <div id="box">
    <div id="left">
      <div id="title">
        <label for="searchInput" id="inputLable">
          <van-icon name="search" size="16px" style="padding: 0 5px" />
          <input type="search" name="searchVal" id="searchInput" placeholder="搜索" />
        </label>
        <button class="add">+</button>
      </div>
    </div>
    <div id="right">
      <div id="content">
        <div id="title">Never Setter</div>
        <div id="inner">
          <div
            v-for="record in recordArr"
            :key="record.id"
            :style="{textAlign: record.username === username?'right':'left'}"
            class="msgWarp"
          >
            <van-tag type="primary" v-if="record.username !== username">{{record.username}}</van-tag>
            <van-tag
              type="success"
              v-if="record.username === username"
              style="float: right"
            >{{record.username}}</van-tag>
            <span style="padding: 0 5px">{{ record.msg}}</span>
          </div>
        </div>
      </div>
      <div id="message">
        <div id="icons">图标</div>
        <div id="textarea">
          <van-field
            v-model="msg"
            rows="2"
            type="textarea"
            maxlength="250"
            placeholder="请输入留言"
            @keydown="onTextareaVal"
            show-word-limit
          />
          <van-button type="primary" class="send" size="small" @click="sendMessage">发送</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    searchVal: "",
    msg: "",
    chatRecord: []
  }),
  methods: {
    sendMessage() {
      if (!this.msg.trim()) {
        console.log(this.msg);
        return;
      }
      this.$socket.emit("sendMsg", {
        username: this.username,
        msg: this.msg
      });
      this.msg = "";
    },
    onTextareaVal(event) {
      if (event.keyCode === 13) {
        this.sendMessage();
      }
    }
  },
  computed: {
    recordArr(data) {
      let arr = data.chatRecord.sort((r1, r2) => {
        if (r1.id > r2.id) {
          return 1;
        } else {
          return -1;
        }
      });
      return arr;
    },
    ...mapState(["username"])
  },
  mounted() {
    // 添加socket事件监听
    this.sockets.subscribe("login", data => {
      this.$notify({
        type: data.code !== 200 ? "danger" : "primary",
        message:
          data.code === 200 ? data.msg : `${data.msg}，3秒后跳转到登录页面`,
        duration: 1500,
        onClose: () => {
          if (data.code !== 200) {
            this.$router.push("login");
          }
        }
      });
    });
    // 监听sendMsg
    this.sockets.subscribe("sendMsg", data => {
      if (data.code !== 200) {
        this.$notify({
          type: "danger",
          message:
            data.code === 200 ? data.msg : `${data.msg}，3秒后跳转到登录页面`,
          duration: 3000,
          onClose: () => {
            if (data.code !== 200) {
              this.$router.push("login");
            }
          }
        });
        return;
      }
      const msg = data;
      delete msg.obj;
      this.chatRecord.push(msg);
    });
  }
};
</script>

<style lang="less" scoped>
#box {
  height: 100%;
  width: 100%;
  display: flex;
  background: #edeae8;
  #left {
    flex: 0.3;
    height: 100%;
    padding: 25px 5px 10px 10px;
    box-sizing: border-box;
    #title {
      display: flex;
      align-items: center;
    }
  }
  #inputLable {
    background: #dad8d8;
    display: flex;
    align-items: center;
    border-radius: 5px;
  }
  #searchInput {
    height: 25px;
    width: 170px;
    border: none;
    background: none;
    font-size: 12px;
  }
  .add {
    height: 25px;
    width: 25px;
    border: none;
    margin: 0 5px;
    border-radius: 5px;
  }
  #right {
    flex: 0.7;
    height: 100%;
    background: #f5f5f5;
    display: flex;
    flex-direction: column;
    #message {
      flex: 0.25;
      display: flex;
      flex-direction: column;
      #icons {
        height: 50px;
        padding: 0 20px;
        line-height: 50px;
      }
      #textarea {
        flex: 1;
        background: #fff;
      }
    }
    #content {
      flex: 0.75;
      display: flex;
      flex-direction: column;
      #title {
        height: 60px;
        line-height: 60px;
        padding-left: 20px;
      }
      #inner {
        overflow-y: scroll;
        height: 400px;
        padding: 10px 20px;
        border: 1px solid #edeae8;
        border-left: none;
        border-right: none;
      }
    }
  }
  .send {
    position: absolute;
    bottom: 8px;
    right: 60px;
  }
  .msgWarp {
    margin: 10px 0;
  }
}
</style>