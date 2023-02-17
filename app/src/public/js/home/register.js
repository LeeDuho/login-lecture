"use strict";

const id = document.querySelector("#id"),
  name = document.querySelector("#name"),
  psword = document.querySelector("#psword"),
  comfirmPsword = document.querySelector("#confirm-psword"),
  registerBtn = document.querySelector("#button");

registerBtn.addEventListener("click", register);

function register() {
  const req = {
    id: id.value,
    name: name.value,
    psword: psword.value,
    comfirmPsword: comfirmPsword.value,
  };
  
  //fetch()는 브라우저에서 제공하는 API
  //fetch를 이용해서 서버에 요청을 보낸다.

  fetch("/register", { //첫번째 인자는 요청을 보낼 주소, 두번째 인자는 옵션 객체, register이라는경로 post라는 메소드로 api가 있어야 됨
    method: "POST", //요청 방식, GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD, CONNECT, TRACE,... , body를 보낼 때는 POST를 사용한다.
    headers: {
      "Content-Type": "application/json", //서버에게 보내는 데이터가 JSON임을 알려준다.
    },
    body: JSON.stringify(req) //JSON.stringify()는 자바스크립트 객체를 JSON 문자열로 변환한다. body에는 JSON 문자열을 넣어야 한다. json 형식으로 보내야 한다.
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        location.href = "/";
      } else {
        alert(res.msg);
      }
    }) 
    .catch((err) => {
      // console.error(new Error("로그인 중 에러 발생"));
      console.error("로그인 중 에러 발생");
    });
  //then()은 fetch()가 성공적으로 끝나면 실행되는 콜백함수이다. res.json()은 응답을 json으로 바꿔준다.
  //res.json()은 promise를 리턴한다. 그래서 다시 then()을 사용한다.
  //기본 res의 반환값은 response 객체이다. response 객체는 body 프로퍼티를 가지고 있는데, body 프로퍼티는 응답의 본문을 담고 있다.
} 