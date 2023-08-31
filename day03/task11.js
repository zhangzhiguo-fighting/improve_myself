// 写在哪里
let animal = {
    eat() {
      this.full = true;
    }
  };
  
  let rabbit = {
    __proto__: animal
  };
  
  rabbit.eat();
  // rabbit
  //首先在原型中找到 rabbit.eat 方法，然后在 this=rabbit 的情况下执行