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
            :style="{textAlign: record.isMe?'right':'left'}"
          >{{record.message}}</div>
        </div>
      </div>
      <div id="message">
        <div id="icons">图标</div>
        <div id="textarea">
          <van-field
            v-model="message"
            rows="2"
            autosize
            type="textarea"
            maxlength="250"
            placeholder="请输入留言"
            show-word-limit
          />
          <van-button type="primary" class="send" size="small" @click="sendMessage">发送</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    searchVal: "",
    message: "",
    chatRecord: [
      { isMe: true, message: "在吗？", id: 0 },
      { isMe: false, message: "干嘛？", id: 1 },
      { isMe: true, message: "俏丽吗", id: 2 }
    ]
  }),
  methods: {
    sendMessage() {}
  },
  computed: {
    recordArr() {
      return this.chatRecord.sort((r1, r2) => {
        if (r1.id < r2.id) {
          return 1;
        } else {
          return -1;
        }
      });
    }
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
        flex: 1;
        flex-grow: 1;
        padding: 10px 20px;
        border: 1px solid #edeae8;
        border-left: none;
        border-right: none;
      }
    }
  }
  .send {
    position: absolute;
    bottom: 2px;
    right: 2px;
  }
}
</style>