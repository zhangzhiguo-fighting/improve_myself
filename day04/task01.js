//在所有函数的原型中添加 defer(ms) 方法，该方法将在 ms 毫秒后运行该函数
Function.prototype.defer = function(ms) {
    setTimeout(this, ms);
};

function f() {
    console.log("Hello!");
  }
  
  f.defer(1000); // 1 秒后显示 "Hello!"