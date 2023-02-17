"use strict"; // ECMAScript 5 strict mode, ES5 strict를 준수하겠다는 의미

const express = require('express'); // express 모듈을 가져온다.
const router = express.Router(); // express의 Router()를 가져온다.

const ctrl = require('./home.ctrl'); // home.ctrl.js를 가져온다.

router.get('/', ctrl.output.home);
router.get('/login', ctrl.output.login); // get 방식으로 /login 경로로 요청이 들어오면, ctrl.login()을 실행한다. login기능을 처리해주는 함수
router.get('/register', ctrl.output.register);

router.post('/login', ctrl.process.login);  // post 방식으로 /login 경로로 요청이 들어오면, ctrl.login()을 실행한다. login기능을 처리해주는 함수
router.post('/register', ctrl.process.register);

module.exports = router; // router를 모듈화 시킨다 (외부에서 사용할 수 있게), 이 모듈을 다른 곳에서 require()로 가져다 쓸 수 있다.