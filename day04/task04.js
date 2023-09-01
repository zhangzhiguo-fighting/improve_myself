function Rabbit(name) {
    this.name = name;
  }

Rabbit.prototype.sayHi = function() {
    alert(this.name);
  };
  
let rabbit = new Rabbit("Rabbit");

//以下调用做的是相同的事儿还是不同的？
//做的是相同的事，但是调用时 函数中的this的值不同，1的this值为rabbit，其他的都为Rabbit.prototype
rabbit.sayHi(); // 1
Rabbit.prototype.sayHi(); // 2
Object.getPrototypeOf(rabbit).sayHi(); // 3
rabbit.__proto__.sayHi();// 4