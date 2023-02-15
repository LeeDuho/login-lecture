"use strict";

//모듈
const express = require('express');
const app = express();


//라우팅
const home = require("./src/routes/home"); //index.js를 가져온다.

//앱 세팅
app.set("views", "./src/views");//view 폴더를 지정
app.set("view engine", "ejs");//view engine을 ejs로 설정

app.use("/", home); //미들웨어를 등록해주는 메소드

module.exports = app;