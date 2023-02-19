//app.js는 express를 사용하기 위한 기본적인 세팅을 해주는 파일이다.
//서버의 실행과 관련된 코드는 bin/www.js에 작성한다.
//mvc란 model, view, controller의 약자이다. 이대로 source를 나눴다
//routes/home/home.ctrl.js는 controller이다. 사용자의 요청을 처리하는 역할을 한다.
//controller는 model을 사용해서 데이터를 가져오고, view에게 전달한다.

"use strict";

//모듈
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

 
//라우팅
const home = require("./src/routes/home"); //index.js를 가져온다.

//앱 세팅
app.set("views", "./src/views");//view 폴더를 지정
app.set("view engine", "ejs");//view engine을 ejs로 설정

app.use(express.static(`${__dirname}/src/public`));
//정적인 파일들을 제공해주는 미들웨어, public 폴더를 제공해준다.
//만약 login.ejs에서 /js/home.js를 불러오면, public/js/home.js를 불러온다.

// app.use(bodyParser.json());
app.use(express.json()); 
//bodyParser.json()은 json 형식의 데이터를 처리해주는 미들웨어
//현재는 express.json()으로 대체되었다.

app.use(express.urlencoded({ extended: true }));
//form 형식의 데이터를 처리해주는 미들웨어
//extended: true는 qs모듈을 사용하겠다는 의미, qs모듈은 내장모듈이 아니라서 따로 설치해야 한다.
//URL을 통해 전달되는 데이터를 처리해주는 미들웨어

app.use("/", home); //미들웨어를 등록해주는 메소드

module.exports = app;