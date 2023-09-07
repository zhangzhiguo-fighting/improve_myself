//两种类型的内部结构兼容，则它们兼容
interface Person {
    firstName: string;
    lastName: string;
  }
   
  function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
  }
   
  let user = { firstName: "Jane", lastName: "User" };
   
  console.log(greeter(user));
  export{}; //不会导出任何的实际内容，解决不同文件同一变量名报错的问题