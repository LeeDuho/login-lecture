"use strict";

const UserStorage = require("../../models/UserStorage");

const output = {  //output이라는 객체를 만들고, home, login이라는 함수를 만든다.
  home: (req, res) => {
    res.render("home/index");
  },
  login: (req, res) => {
    res.render("home/login");
  },
};


const process = {
  login: (req, res) => {
    const id = req.body.id,
      psword = req.body.psword;

    const users = UserStorage.getUsers("id", "psword");
    
    const response = {}; //response라는 객체를 만든다.
    
    if (users.id.includes(id)) { //users.id에 front에서 받아온 id가 포함되어 있으면
      const idx = users.id.indexOf(id); //users.id에서 id의 index를 찾는다. 
      if (users.psword[idx] === psword) { //users.psword의 idx번째의 값과 front에서 받아온 psword가 같으면
        response.success = true; //response객체에 success라는 프로퍼티를 만들고 true를 넣는다.
        return res.json();
      }
    }

    response.success = false; //response객체에 success라는 프로퍼티를 만들고 false를 넣는다.
    response.msg = "로그인에 실패하였습니다."; //response객체에 msg라는 프로퍼티를 만들고 "로그인에 실패하였습니다."를 넣는다.
    return res.json(response);
  },
};

module.exports = {
  output,
  process,
};
