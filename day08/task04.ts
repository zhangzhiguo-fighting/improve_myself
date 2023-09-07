function greet(person: string, date: Date) {
    console.log(`Hello ${person}, today is ${date.toDateString()}!`);
  }
   //Date() 与 new Date() 返回的内容一样，只是格式不一样，Date()返回的是字符串，new Date()返回的是 时间对象
  greet("Maddison", new Date());
  
  let message = 'hello world';
  
  export{}