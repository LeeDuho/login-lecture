"use strict";

const output = {  //output이라는 객체를 만들고, home, login이라는 함수를 만든다.
  home: (req, res) => {
    res.render("home/index");
  },
  login: (req, res) => {
    res.render("home/login");
  },
};

const users = {
  id: ["이두호", "이두진", "이두영"],
  psword: ["1234", "1234", "123456"],
};

const process = {
  login: (req, res) => {
    const id = req.body.id,
      psword = req.body.psword;

    if (users.id.includes(id)) { //users.id에 front에서 받아온 id가 포함되어 있으면
      const idx = users.id.indexOf(id); //users.id에서 id의 index를 찾는다. 
      if (users.psword[idx] === psword) { //users.psword의 idx번째의 값과 front에서 받아온 psword가 같으면
        return res.json({ //프론트엔드로 json형식으로 {success: true}를 보낸다.
          success: true,
        });
      }
    }
    return res.json({ //프론트엔드로 json형식으로 {success: false}를 보낸다.
      success: false,
      msg: "로그인에 실패하였습니다.",
    });
  },
};

module.exports = {
  output,
  process,
};
