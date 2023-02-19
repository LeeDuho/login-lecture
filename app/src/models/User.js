"use strict";

const UserStorage = require("./UserStorage");

class User {
  constructor(body) {
    this.body = body;
  }

  async login() { 
    const client = this.body;
    try{  //에러가 발생할 수 있는 부분을 try로 감싸준다.
      const {id, psword} = await UserStorage.getUserInfo(client.id);  //이 함수는 getuserinfo가 promise를 리턴하기 때문에 await을 사용한다.
      
      if( id ){
        if(id === client.id && psword === client.psword){
          return { success: true };
        }
        return { success: false, msg: "비밀번호가 틀렸습니다." };
      }
      return { success: false, msg: "존재하지 않는 아이디입니다." };
    
    } catch(err){
      return { success: false, msg: err };
    }
  }

  async register() {
    const client = this.body;
    
    try {
      const response = await UserStorage.save(client);
      return response;
    } catch (err) {
      return { success: false, msg: err };
    }
  }
}

module.exports = User;