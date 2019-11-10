// let app = require('express')();
// let http = require('http').createServer(app);
// let io = require('socket.io');

// app.get('/', (req, res) => {
//     res.send('Hello World');
// })

// http.listen(3333, () => {
//     console.log('http://localhost:3333');
// })
var app = require("express")();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var users = [
  { username: "admin", password: "admin", isLogin: false, socketId: null }
];
var msgArr = [];

var PORT = 8888;
server.listen(PORT);

/**
 * 监听客户端链接
 * io是定义的服务端socket
 * 回调函数是客户端的socket
 * io.sockets.connected[socket.id] >> 指定id发送休息
 */
io.on("connection", socket => {
  // 监听客户端的登录事件
  console.log("当前socket id：", socket.id);
  console.log("链接总人数：", io.eio.clientsCount);
  socket.on("login", obj => {
    const { username, password, isLogin } = obj;
    if (!username) {
      socket.emit("login", {
        msg: "请登录",
        type: "systemMsg",
        code: 205
      });
      return;
    }
    console.log("用户登录：", username);
    let user = users.find(item => item.username === username);
    // 用户不存在
    if (!user) {
      users.push({
        username,
        password,
        isLogin: true,
        socketId: socket.id
      });
      socket.emit("login", {
        msg: "用户注册成功",
        code: 200
      });
      // 全局消息
      io.sockets.emit("login", {
        msg: `欢迎${obj.username}进入群聊`,
        type: "systemMsg",
        code: 200
      });
    } else if (password !== user.password) {
      socket.emit("login", {
        msg: "密码错误，登录失败",
        code: 202
      });
    } else if (!isLogin) {
      socket.emit("login", {
        msg: "该用户已登录",
        code: 203
      });
    } else {
      io.sockets.emit("login", {
        msg: `欢迎${obj.username}进入群聊`,
        type: "systemMsg",
        code: 200
      });
    }
    console.log("所有用户", users);
  });
  // 发送消息
  socket.on("sendMsg", obj => {
    if (!obj.username) {
      socket.emit("sendMsg", {
        msg: "请登录",
        type: "systemMsg",
        code: 205
      });
      return;
    }
    let msg = Object.assign(obj, {
      id: msgArr.length + 1,
      socketId: socket.id
    });
    msgArr.push(msg);
    console.log("当前信息条数：", msgArr.length);
    io.sockets.emit("sendMsg", Object.assign(msg, { code: 200 }));
  });
  // 用户退出
  socket.on("disconnect", () => {
    socket.broadcast.emit("login", {
      msg: `${users.find(item => item.socketId === socket.id) &&
        users.find(item => item.socketId === socket.id)
          .username}已经离开聊天室`,
      type: "systemMsg",
      code: 200
    });
  });
});

console.log(`服务启动成功，http://localhost:${PORT}`);

/**
 * 200 正确的相应
 * 201
 */
