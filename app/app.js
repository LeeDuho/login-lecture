"use strict";

//모듈
const express = require('express');
const app = express();


//라우팅
const home = require("./src/routes/home"); //index.js를 가져온다.

//앱 세팅
app.set("views", "./src/views");//view 폴더를 지정
app.set("view engine", "ejs");//view engine을 ejs로 설정

app.use(express.static("${__dirname}/src/public"));
//정적인 파일들을 제공해주는 미들웨어, public 폴더를 제공해준다.
//만약 login.ejs에서 /js/home.js를 불러오면, public/js/home.js를 불러온다.

app.use("/", home); //미들웨어를 등록해주는 메소드

module.exports = app;