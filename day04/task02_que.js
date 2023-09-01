//在所有函数的原型中添加 defer(ms) 方法，该方法返回一个包装器，将函数调用延迟 ms 毫秒
Function.prototype.defer = function(ms) {
    let f = this;
    return function(...args) {
      setTimeout(() => f.apply(this, args), ms);
    }
  };
  
  // check it
  function f(a, b) {
    alert( a + b );
  }
  
  f.defer(1000)(1, 2); // 1 秒后显示 3