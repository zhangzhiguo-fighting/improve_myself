//你好，对象
let user = {};
user.name = "John";
user.surname = "Smith";
alert(user.name);
user.name = "Pete";
alert(user.name);
delete user.name;
alert(user.name);