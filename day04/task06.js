//创建实例时报错
class Animal {

    constructor(name) {
      this.name = name;
    }
  
  }
  
  class Rabbit extends Animal {
    /*constructor(name) {
      this.name = name;
      this.created = Date.now();
    }*/

    //this 属于函数
    constructor(name) {
        super(name);
        this.created = Date.now();
      }
  }
  
  let rabbit = new Rabbit("White Rabbit"); // Error: this is not defined
  console.log(rabbit.name);