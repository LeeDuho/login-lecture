"use strict";

const fs = require("fs").promises; //fs는 파일을 읽고 쓰는 모듈이다. fs.promises는 비동기로 파일을 읽고 쓰는 모듈이다.

class UserStorage{
  static #getUserInfo(data, id) {
    const users = JSON.parse(data); //JSON.parse는 json형태의 문자열을 객체로 바꿔준다.
    const idx = users.id.indexOf(id); //users.id에서 id의 index를 찾는다.
    const userKeys = Object.keys(users); //Object.keys는 객체의 키값을 배열로 반환한다.
    const userInfo = userKeys.reduce((newUser, info) => {
      newUser[info] = users[info][idx];
      return newUser;
    }, {});

    return userInfo;
  }

  static #getUsers(data, isAll, fields) {//...은 배열로 받는다는 뜻이다. ...변수명은 변수명이라는 배열에 id, psword가 들어가게 된다.
    const users = JSON.parse(data); //JSON.parse는 json형태의 문자열을 객체로 바꿔준다. 
    if(isAll) return users; //isAll이 true면 users를 리턴한다. (전체를 리턴
    //reduce는 배열의 매소드, 반복문을 돌면서 순회
    const newUsers = fields.reduce((newUsers, field) => { //newUsers는 빈 배열이고, field는 id, psword가 들어간다.
      if(users.hasOwnProperty(field)){ //users에 id, psword가 있으면
        newUsers[field] = users[field]; //newUsers에 id, psword를 넣어준다.
      } 
      return newUsers; //newUsers를 리턴한다. 다음 반복문을 위해
    }, {});
    return newUsers; //newUsers를 리턴한다.
    // return this.#users;
  }

  static getUsers(isAll, ...fields) { //...은 배열로 받는다는 뜻이다. ...변수명은 변수명이라는 배열에 id, psword가 들어가게 된다.
    return fs
      .readFile("./src/databases/users.json")
      .then((data) => {
        return this.#getUsers(data, isAll, fields); //this는 UserStorage를 가리킨다.은닉화된 메소드를 사용하기 위해 this를 사용한다.
      })
      .catch(console.error);
  }
  static getUserInfo(id) {
    // const users = this.#users;
    return fs
      .readFile("./src/databases/users.json")
      .then((data) => {
        return this.#getUserInfo(data, id); //this는 UserStorage를 가리킨다.은닉화된 메소드를 사용하기 위해 this를 사용한다.
      })
      .catch(console.error);
    //   , (err, data) => {
    //   if(err) throw err;
    //   console.log(data);
    //   return JSON.parse(data);
    // });

  }
  
  static async save(userInfo) {
    const users = await this.getUsers(true);  //true를 넣어주면 users에 id, psword, name이 들어간다.
    if(users.id.includes(userInfo.id)) {
      throw "이미 존재하는 아이디입니다.";
    }
    users.id.push(userInfo.id);
    users.psword.push(userInfo.psword);
    users.name.push(userInfo.name);
    fs.writeFile("./src/databases/users.json", JSON.stringify(users));
    return { success: true };
  }
}

module.exports = UserStorage;
