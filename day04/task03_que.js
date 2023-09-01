//如何调用 value函数
let dictionary = Object.create(null, {
    toString: { // 定义 toString 属性
      value() { // value 是一个 function
        //Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组
        //数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致
        return Object.keys(this).join();
      }
    }
  });
  
  dictionary.apple = "Apple";
  dictionary.__proto__ = "test";
  
  // apple 和 __proto__ 在循环中
  for(let key in dictionary) {
    console.log(key); // "apple"，然后是 "__proto__"
  }
  
  // 通过 toString 处理获得的以逗号分隔的属性列表
  console.log(dictionary.toString()); // "apple,__proto__"