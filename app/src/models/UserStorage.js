"use strict";

class UserStorage{
  static #users = { //class안에 변수는 const가 필요없다. 여기서 static으로 선언해주면 클래스 자체에 연결되어있기 때문에, new UserStorage()를 하지 않아도 사용할 수 있다. # 표시를 사용하면 private 변수가 된다.
    id: ["이1", "이2", "이3"],
    psword: ["1234", "1234", "123456"],
    name: ["이두호", "이두진", "이두영"],
  };

  static getUsers(...fields) {//...은 배열로 받는다는 뜻이다. ...변수명은 변수명이라는 배열에 id, psword가 들어가게 된다.
    const users = this.#users; //this는 UserStorage를 가리킨다.
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

  static getUserInfo(id) {
    const users = this.#users;
    const idx = users.id.indexOf(id);
    const userKeys = Object.keys(users); //Object.keys는 객체의 키값을 배열로 반환한다.
    const userInfo = userKeys.reduce((newUser, info) => {
      newUser[info] = users[info][idx];
      return newUser;
    }, {});

    return userInfo;
  }

  static save(userInfo) {
    const users = this.#users;
    users.id.push(userInfo.id);
    users.psword.push(userInfo.psword);
    users.name.push(userInfo.name);
    return { success: true };
  }

}

module.exports = UserStorage;
