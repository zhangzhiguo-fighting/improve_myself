// 为什么两只松鼠都饱了？
let hamster = {
    stomach: [],
  
    eat(food) {
      this.stomach.push(food);
    }
  };
  
  let speedy = {
    __proto__: hamster
  };
  
  let lazy = {
    __proto__: hamster
  };
  
  // 这只仓鼠找到了食物
  speedy.eat("apple");
  alert( speedy.stomach ); // apple
  
  // 这只仓鼠也找到了食物，为什么？请修复它。
  alert( lazy.stomach ); // apple
  
  //speedy 中没有 eat方法，去hamster中找，调用 this(speedy).stomach，speedy中没有stomach，又去原型中找stomach
  //因此两只松鼠共用了一个胃