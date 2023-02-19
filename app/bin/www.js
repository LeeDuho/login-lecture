"use strict";

const app = require('../app');
const PORT = process.env.PORT || 3000;

//listen 명령어를 통해 3000번 포트를 열어준다.
app.listen(PORT, () => {
  console.log('서버 가동');
});