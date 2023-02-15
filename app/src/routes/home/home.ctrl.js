"use strict";

const hello = function(req, res){
  res.render("home/index");
};

const login = function(req, res){
  res.render("home/login");
};


module.exports = {
  hello,
  login,
};
