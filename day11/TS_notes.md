TypeScript Documentation
1. Git Started
1.1 面向编程初学者的 TS
- TS：静态类型检查器
  - ypeScript 在执行之前，基于 值的类型 检查程序是否有错误
- TS 是 JS 的超集
  - 语法：JS 语法是合法的 TS
  - 类型：TypeScript 是一个 类型化 的超集，意味着它添加了针对如何使用不同类型的值的规则
  - 运行时行为：TypeScript 保留了 JavaScript 的 运行时行为 ，即使 TypeScript 认为代码有类型错误，也可以 保证 以相同的方式运行
  - 擦出类型：
    - 一旦 TypeScript 的编译器完成了检查代码的工作，它就会 擦除 类型以生成最终的“已编译”代码。这意味着一旦您的代码被编译，生成的普通 JS 代码便没有类型信息
    - TypeScript 不提供任何额外运行时库。你的程序会使用与 JavaScript 程序相同的标准库（或外部库）

1.2 TS for JS Programmers
- TypeScript 与 JavaScript 有着不同寻常的关系。TypeScript 提供了 JavaScript 的所有功能，并在这些功能之上添加了一层： TypeScript 的类型系统
- 类型推断
  - TypeScript 可以识别 JavaScript 语言，在许多情况下可以推断类型
- 定义类型
  - 可以在 JS 中使用各种各样的设计模式，然而，某些设计模式使得类型难以自动推断（例如，使用动态编译模式），为了使类型推断涵盖这些情况，TS 支持扩展了 JS
  - 使用 interface 关键字声明显式地描述对象的内部数据的类型
  - 示例：
interface User {
  name: string;
  id: number;
}
 
class UserAccount {
  name: string;
  id: number;
 
  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}
 
 //指示变量 user 必须是一个 User 类型的值
const user: User = new UserAccount("Murphy", 1);
- 组合类型
  - 使用 TypeScript，可以通过组合简单类型来创建复杂类型，主要方法有联合和泛型
  - 联合
    - 使用联合，可以声明类型可以是许多类型中的一种
    - 变量的类型判断，使用 typeof
This content is only supported in a Feishu Docs
    - 示例：
    例如，使函数根据传递的是字符串还是数组返回不同的值
function wrapInArray(obj: string | string[]) { 
// obj: string 类型注解，obj 期待的类型是 string
  if (typeof obj === "string") {
    return [obj];
            (parameter) obj: string
  }
  return obj;
}
  - 泛型
    - 泛型为类型提供变量
    - 示例：
type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;
- 结构化的类型系统（structural type system）
  - TypeScript 的一个核心原则是类型检查基于对象的属性和行为
  - 在结构化的类型系统当中，如果两个对象具有相同的结构，则认为它们是相同类型，例如：
interface Point {
  x: number;
  y: number;
}
 
function logPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}
 
// 打印 "12, 26"
const point = { x: 12, y: 26 };
logPoint(point);
    - 运行过程：point 变量从未声明为 Point 类型。 但是，在类型检查中，TypeScript 将 point 的结构与 Point的结构进行比较。它们的结构相同，所以代码通过
  - 结构匹配只需要匹配对象字段的子集
    - 示例：
const point3 = { x: 12, y: 26, z: 89 };
logPoint(point3); // 打印 "12, 26"
 
const rect = { x: 33, y: 3, width: 30, height: 80 };
logPoint(rect); // 打印 "33, 3"
 
const color = { hex: "#187ABF" };
logPoint(color); //会报错
  - 类和对象确定结构的方式一样：
interface Point {
  x: number;
  y: number;
}
 
function logPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}
// ---分割线---
class VirtualPoint {
  x: number;
  y: number;
 
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
 
const newVPoint = new VirtualPoint(13, 56);
logPoint(newVPoint); // 打印 "13, 56"
  - 如果对象或类具有所有必需的属性，则 TypeScript 将表示是它们匹配的，而不关注其实现细节

2. TS Handbook
2.1 手册简介
- TypeScript的目标是成为JavaScript程序的静态类型检查器-换句话说，一个在代码运行（静态）之前运行的工具，并确保程序的类型是正确的（类型检查）

2.2 基础知识
- TS 检查错误
  - 静态类型检查
  - 非异常失败，如拼写错误、未调用的函数、或基本逻辑错误
- 类型工具，TS 可以在代码出错时捕获错误，也可以在我们在编译器上键入的时候就检查错误，并提出修改和重改方案
- t s c, TS 编译器
  - 编译 TS 代码，将其转换为 JS 代码
  - --noEmitOnError 是 TypeScript 编译器（tsc）的一个命令行选项，它的作用是在编译 TypeScript 代码时，如果发生编译错误（TypeScript 错误），则不生成任何 JavaScript 输出文件
- 显示类型：
  - 示例：
function greet(person: string, date: Date) {
    console.log(`Hello ${person}, today is ${date.toDateString()}!`);
  }
   //Date() 与 new Date() 返回的内容一样，只是格式不一样，Date()返回的是字符串，new Date()返回的是 时间对象
  greet("Maddison", new Date());
  - 请记住，不必总是编写明确的类型注释。在许多情况下，TypeScript甚至可以为我们推断（或“弄清楚”）类型
- 擦除类型
  - 示例：
"use strict";
function greet(person, date) {
    console.log("Hello ".concat(person, ", today is ").concat(date.toDateString(), "!"));
}
greet("Maddison", new Date());
  - 类型注释永远不会改变程序的运行时行为
- 降级
  - TypeScript能够将代码从较新版本的ECMAScript重写到较旧的版本。这种从较新或“较高”版本的ECMAScript迁移到较旧或“较低”版本的过程有时被称为降级
  - 示例：
`Hello ${person}, today is ${date.toDateString()}!`;
//到
"Hello ".concat(person, ", today is ").concat(date.toDateString(), "!");
  - 默认情况下，TS 针对 ES3，这是ECMAScript的一个极其旧的版本，--target es2015运行将TypeScript更改为目标ECMAScript 2015，这意味着代码应该能够在支持ECMAScript 2015的地方运行
- 严格性
  - tsc 在编译报错的情况下仍然能够正常产出文件，这些默认的配置会确保不对你的开发过程造成阻碍
  - 严格性设置将静态的类型检查从一种切换开关的模式（对于你的代码，要么全部进行检查，要么完全不检查）转换为接近于刻度盘那样的模式。你越是调节它，TypeScript 就会为你检查越多东西（修改配置文件）
  - 启用 noImplicitAny 配置项，在遇到被隐式推断为 any 类型的变量时就会抛出一个错误
  - 默认情况下，null 和 undefined 可以被赋值给其它任意类型。strictNullChecks 配置项让处理 null 和 undefined 的过程更加明显，让我们不用担心自己是否忘记处理 null 和 undefined

2.3 常见类型
- 基本类型：string、number、boolean
- arrays ，如 number[]、string[]等，除此之外还有Array<number>，都可以作为类型注解
- any，当不希望某个特定值导致类型检查错误时使用
- 变量类型注释，当使用 const, var, let 声明变量时，可以可选的添加一个类型注释，去明确指出变量的类型（TS也会自己去推导类型）
- Functions
  - 参数类型注释，当参数有类型注释后，传参时会进行类型检查
  - 返回值类型检查，示例：
function getFavoriteNumber(): number {
  return 26;
}
  - 匿名函数，匿名函数与函数声明不同，TS 会根据函数调用的地方的上下文类型来推导匿名函数参数的类型
- 对象类型
  - 可以使用,或;来分隔属性，无论哪种方式，最后一个分隔符都是可选的
  - 可选属性，添加一个?在属性名称之后，例如：
function printName(obj: { first: string; last?: string }) {
  // ...
}
// Both OK
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });
- Union 类型
  - TypeScript的类型系统允许使用各种运算符从现有类型中构建新类型，union 类型是由两种或多种其他类型形成的类型，表示可能是这些类型中的任何一种的值
  - 定义一个 union 类型，示例：
function printId(id: number | string) {
  console.log("Your ID is: " + id);
}
// OK
printId(101);
// OK
printId("202");
// Error 类型不匹配
printId({ myID: 22342 });
  - Working with union types
    - 使用 union 类型时，不能用某个类型仅有的方法（这些类型有公共方法就可以用），示例：
function printId(id: number | string) {
  console.log(id.toUpperCase());
/*
Property 'toUpperCase' does not exist on type 'string | number'.
Property 'toUpperCase' does not exist on type 'number'.
*/
}
    - 解决方案，是to narrow the union with code，示例：
function printId(id: number | string) {
  if (typeof id === "string") { //或使用函数，如 Array.isarray()
    // In this branch, id is of type 'string'
    console.log(id.toUpperCase());
  } else {
    // Here, id is of type 'number'
    console.log(id);
  }
}
    - 类型组合具有这些类型属性的交集
- 类型别名
  - 语法：
type Point = {
  x: number;
  y: number;
};
 
// 与前面的示例完全相同
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
 
printCoord({ x: 100, y: 100 });
  - 可以使用类型别名为任何类型命名，哪怕是union类型，如type ID = number | string;
- 接口"interface"
  - 语法：
interface Point {
  x: number;
  y: number;
}
 
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
 
printCoord({ x: 100, y: 100 });
  - TypeScript 是一个 结构化类型 的类型系统，在结构化的类型系统当中，如果两个对象具有相同的结构，则认为它们是相同类型
- 类型别名和类型接口之间的区别：
  - 可扩展性：
    - 接口可以通过继承其他接口来扩展，允许合并多个接口的定义。
    - 类型别名不支持继承，一旦定义了，就不能进一步扩展或合并
  - 用途：
    - 类型别名通常用于创建自定义复杂类型，例如联合类型、交叉类型、元组等，以提高代码可读性和维护性
    - 接口通常用于定义对象的形状（属性和方法的结构），可以用于描述类、函数参数、对象结构等
- Type asertions（类型断言）
  - 一种告诉编译器某个值的类型的方式，它类似于类型转换，但在编译时并不会进行类型检查或转换实际的数据。类型断言通常在以下情况下使用：
    - 当你比编译器更了解某个值的确切类型时
    - 当你处理从动态数据源（如 DOM 操作或外部 API 调用）返回的数据
  - 类型断言有两种主要的语法形式：
    - 尖括号语法：
let value: any = "Hello, TypeScript!";
let length: number = (<string>value).length; // 使用尖括号语法进行断言
    - As 语法：
let value: any = "Hello, TypeScript!";
let length: number = (value as string).length; // 使用 as 语法进行断言
  - 类型断言并不会进行运行时的类型检查或转换数据的实际类型。它只是在编译时告诉编译器你的意图，因此在使用类型断言时要确保你了解值的类型，以避免运行时错误。如果类型断言与实际类型不匹配，可能会导致不安全的操作
- Literal Types
  - 字面量类型（Literal Types）是 TypeScript 中的一种类型，它表示一个变量只能接受特定的字面值作为有效的值。字面量类型可以用于限制变量的取值范围，使代码更加安全和可读
  - 在 TypeScript 中，有以下几种字面量类型：
    - 字符串字面量类型，示例：
let color: "red" | "green" | "blue";
color = "red"; // 合法
color = "yellow"; // 错误，只能接受 "red"、"green" 或 "blue"
    - 数字字面量类型，示例：
let diceRoll: 1 | 2 | 3 | 4 | 5 | 6;
diceRoll = 3; // 合法
diceRoll = 7; // 错误，只能接受 1 到 6 之间的数字
    - 布尔字面量类型
let isDone: true | false;
isDone = true; // 合法
isDone = false; // 合法
isDone = 1; // 错误，只能接受 true 或 false
- Literal Inference
  - 字面量类型推断（Literal Inference）是 TypeScript 编译器在某些情况下自动推断出字面量类型的能力。这种类型推断可以在代码中提供更具体的类型信息，从而增强类型安全性
  - 字面量类型推断通常发生在以下情况下：
    - 初始化变量时：当你在声明变量并赋予它一个明确的字面值时，TypeScript 会推断出该变量的字面量类型
    - 函数参数和返回值：当你定义函数并在参数或返回值中使用字面值时，TypeScript 会根据字面值推断参数和返回值的类型
    - 条件表达式：当你使用条件表达式（例如三元运算符）时，TypeScript 可能会根据条件的结果推断出一个字面量类型
- Non-null Assertion Operator
  - 空断言操作符（Non-null Assertion Operator），通常表示为 !（后缀感叹号），是 TypeScript 中的一种特殊语法，用于告诉编译器某个表达式的值一定不为 null 或 undefined，即使编译器认为可能存在空值。这个操作符主要用于处理可能为 null 或 undefined 的值，以避免编译器的空值检查，但需要谨慎使用，因为它会绕过 TypeScript 的类型检查，如果滥用可能导致运行时错误
  - 语法，示例：
let someValue: string | null = getSomeValue(); // 假设 getSomeValue() 可能返回 null

let length: number = someValue.length; // 错误，编译器认为 someValue 可能为 null

let length2: number = someValue!.length; // 合法，使用非空断言操作符告诉编译器 someValue 不会为 null
- 枚举（Enums）
  - 一种用于定义一组具名的常量值集合的数据类型。枚举可以帮助你在代码中创建更具可读性的常量，并使代码更加清晰和易于维护
  - 示例：
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

let playerDirection: Direction = Direction.Up;
  - 代码解析：每个成员都有一个关联的数字值，默认从0开始递增，但你也可以显式为枚举成员指定值，可以通过Direction[num]来访问属性名

2.4 Narrowing（类型收窄）
- 在 TypeScript 中，类型缩小（Narrowing）是指在特定上下文中缩小变量或表达式的类型范围，以使 TypeScript 编译器能够更准确地推断出变量的类型
- 类型守卫（Type Guards）是一种用于执行类型缩小的技术，它们是一些条件表达式或函数，用于告诉编译器某个变量的类型更具体
  - Narrowing 和 type guards 示例：
function padLeft(padding: number | string, input: string) {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input;
                        //(parameter) padding: number
  }
  return padding + input;
           //(parameter) padding: string
}
- Typeof type guards
  - "string"
  - "number"
  - "bigint"
  - "boolean"
  - "symbol"
  - "undefined"
  - "object"
  - "function"
- 在 JS 和 TS 中哪些类型被当作对象；
  1. Object 类型：在 JavaScript 中，对象是一种基本数据类型，可以用来存储键值对的集合。这包括普通对象（例如 {}）、数组（例如 []）、函数（例如 function(){}）、Date 对象等。
  2. 自定义对象：创建自定义对象，使用类（class）或构造函数（constructor function）来定义对象的结构和行为。
  3. 函数：在 JavaScript 中，函数也被视为对象，因为它们可以具有属性和方法。
  4. 包装对象：JavaScript 中的基本数据类型（例如数字、字符串、布尔值）在某些情况下会被自动包装成对应的包装对象（Number、String、Boolean）。
  5. DOM 对象：在前端开发中，浏览器提供了一系列 DOM（文档对象模型）对象，用于表示和操作网页文档的各个部分。这些 DOM 对象也可以被视为对象类型。
  6. 内置对象：JavaScript 和 TypeScript 提供了许多内置对象，例如 Math、JSON、RegExp 等，它们也可以被视为对象类型
- Truthiness narrowing
  - 示例：
function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === "object") { //检查了strs的真实性
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  }
}
- Equality narrowing（等值收窄）
  - TS 也使用 equality checks like ===, !==, ==, and != to narrow types。
    - 示例1：
function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // We can now call any 'string' method on 'x' or 'y'.
    x.toUpperCase();
          //(method) String.toUpperCase(): string
    y.toLowerCase();
          //(method) String.toLowerCase(): string
  } else {
    console.log(x);
               //(parameter) x: string | number
    console.log(y);
               //(parameter) y: string | boolean
  }
}
    - 示例2:
interface Container {
  value: number | null | undefined;
}
 
function multiplyValue(container: Container, factor: number) {
  // Remove both 'null' and 'undefined' from the type.
  if (container.value != null) {
    console.log(container.value);
                           (property) Container.value: number
 
    // Now we can safely multiply 'container.value'.
    container.value *= factor;
  }
}
    - 解析：为什么container.value != null能排除掉 undefined？TypeScript 针对不同的比较操作符（例如 != 和 !==）进行了特殊处理，以帮助进行类型缩小，在检查值是否为 null 时，会去排除潜在的undefined
- The in operator narrowing
  - 利用 in 操作符来缩小类型，示例：
type Fish = { swim: () => void };
type Bird = { fly: () => void };
 
function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
  }
 
  return animal.fly();
}
  - 可选属性存在在缩小的两侧，示例：
type Fish = { swim: () => void };
type Bird = { fly: () => void };
type Human = { swim?: () => void; fly?: () => void };
 
function move(animal: Fish | Bird | Human) {
  if ("swim" in animal) {
    animal;
      //(parameter) animal: Fish | Human
  } else {
    animal;
      //(parameter) animal: Bird | Human
  }
}
- Instanceof narrowing
  - 使用 instanceof 操作符来缩小类型
function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString());
               //(parameter) x: Date
  } else {
    console.log(x.toUpperCase());
               //(parameter) x: string
  }
}
- Assignments
  - 当给any变量赋值时，TS 会根据赋值号的右侧去缩小左侧的类型，示例：
let x = Math.random() < 0.5 ? 10 : "hello world!";
   //let x: string | number
x = 1;
 
console.log(x);
           //let x: number
x = "goodbye!";
 
console.log(x);
           //let x: string
  - 解析：x最初被推导的类型为 string | number，所以后面x可以被赋值为number和string
- Control flow analysis()
  - 示例：
function example() {
    let x: string | number | boolean;
   
    x = Math.random() < 0.5;
   
    console.log(x);     //let x: boolean
   
    if (Math.random() < 0.5) {
      x = "hello";
      console.log(x);            //let x: string
    
    } else {
      x = 100;
      console.log(x);          //let x: number
    
    }

//通过控制流，分析出 x 的类型
    return x; //let x: string | number  
  }
- Using type predicates（使用类型谓词）
  - 示例：
//自定义判断类型函数
function isFish(pet: Fish | Bird): pet is Fish { //返回值类型为 pet is Fish
  return (pet as Fish).swim !== undefined; //使用了类型断言 as（类似强转但没转）
}
  - 解析：使用了类型谓词（Type Predicates），它是一种用于在 TypeScript 中明确告诉编译器某个变量的类型的方法。在这个例子中，isFish 函数用于判断一个动物是不是鱼（Fish）。这个函数的返回类型是 pet is Fish，它表示如果返回值为 true，则表示参数 pet 是鱼，编译器会相应地缩小 pet 的类型为 Fish
  - Class 可以使用 this is Type来缩小它们的类型
- Assertion Functions
  - 一类特别的函数，当有未预料的事发生，它们将抛出错误，如assert，示例：
assert(someValue === 42);
//如果 someValue 不等于 42 将抛出错误AssertionError
- DIscriminated unions（可识别联合类型）
  - 3 个要点：可辨识、联合类型和类型守卫。
    - 可辨识要求联合类型中的每个元素(可能是对象)都含有一个单例类型属性
  - 示例：
/*
interface Shape {
  kind: "circle" | "square";
  radius?: number;
  sideLength?: number;
}
*/

//把kind分开写，方便缩小类型
interface Circle {
    kind: "circle";
    radius: number;
  }
   
interface Square {
    kind: "square";
    sideLength: number;
}

type Shape = Circle | Square;
  
function getArea(shape: Shape) {
    switch (shape.kind) {
      case "circle":
        return Math.PI * shape.radius ** 2; //(parameter) shape: Circle
      case "square":
        return shape.sideLength ** 2; //(parameter) shape: Square
    }
}

//实现Circle接口
let circle: Circle = {
    kind: "circle",
    radius: 1,
}

console.log(getArea(circle));
- The never type
[Image]
  - 申明为 void 类型的变量，只能赋予 undefined 和 null
  - never 类型表示永远不会有值的一种类型
  - 返回never的函数必须存在无法达到的终点。never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型，示例：
// 因为总是抛出异常，所以 error 将不会有返回值 
function error(message: string): never { 
    throw new Error(message); 
} 

// 因为存在死循环，所以 infiniteLoop 将不会有返回值 
function infiniteLoop(): never { 
    while (true) { 
        //...
    } 
}
  - 永远不存在的的情况
const foo = 123;if (foo !== 123) {
    const bar = foo;    // bar: never
}
- Exhaustiveness checking（穷尽检查）
  - never 类型可以赋值给任何类型，然而，没有类型可以赋值给 never （除了 never 自身）。这就意味着你可以在 switch 语句中使用 never 来做一个穷尽检查 ，示例：
interface Triangle {
  kind: "triangle";
  sideLength: number;
}
type Shape = Circle | Square | Triangle;

function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle": // Circle类型
      return Math.PI * shape.radius ** 2;
    case "square": // Circle类型
      return shape.sideLength ** 2;
    default:
      const _exhaustiveCheck: never = shape; // error 不能将类型“Triangle”分配给类型“never”
      return _exhaustiveCheck;
  }
}
    - 解析：因为 TypeScript 的收窄特性，执行到 default 的时候，类型被收窄为 Triangle，但因为任何类型都不能赋值给 never 类型，这就会产生一个编译错误。通过这种方式，你就可以确保 getArea 函数总是穷尽了所有 shape 的可能性

2.5 more on functions
- 函数类型表达式（Function Type Expressions）
  - 最简单描述一个函数的方式是使用函数类型表达式，它的写法有点类似于箭头函数：
function greeter(fn: (a: string) => void) {
  fn("Hello, World");
}
function printToConsole(s: string) {
  console.log(s);
}
greeter(printToConsole);
    - 解析：语法 (a: string) => void 表示一个函数有一个名为 a ，类型是字符串的参数，这个函数并没有返回任何值。
    - 如果一个函数参数的类型并没有明确给出，它会被隐式设置为 any
    - 注意函数参数的名字是必须的，这种函数类型描述 (string) => void，表示的其实是一个函数有一个类型是 any，名为 string 的参数
    - 也可以使用类型别名（type alias）定义一个函数类型，示例：
type GreetFunction = (a: string) => void;
function greeter(fn: GreetFunction) { //fn变量，
  // ...
}
- 调用签名（call signatures）
  - 在 JavaScript 中，函数除了可以被调用，自己也是可以有属性值的，示例：
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};
function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}
  - 解析：注意这个语法跟函数类型表达式稍有不同，在参数列表和返回的类型之间用的是 : 而不是 =>
- 构造签名（Construct signatures）
  - JavaScript 函数也可以使用 new 操作符调用，当被调用的时候，TypeScript 会认为这是一个构造函数(constructors)，因为他们会产生一个新对象，示例：
type SomeConstructor = {
  new (s: string): SomeObject;
};
function fn(ctor: SomeConstructor) {
  return new ctor("hello");
}
  - 可以将调用签名和构造签名合并在一起：
interface CallOrConstruct {
  new (s: string): Date; //参数 s 为 string 类型，返回值为Date类型
  (n?: number): number;
}
- 泛型函数（Generic functions）
  - 函数的输出类型依赖函数的输入类型，或者两个输入的类型以某种形式相互关联
  - 示例1：
//返回数组第一个值
function firstElement(arr: any[]) {
  return arr[0]; //返回类型是 any
}
  - TS 中，泛型就是被用来描述两个值之间的对应关系，在函数签名里声明一个类型参数（type parameter），示例2:
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}
    - 解析：给函数添加一个类型参数 Type，在函数输入（即数组）和函数输出（即返回值）之间创建了一个关联，现在调用该函数一个更具体的类型就会被推断出来:
// s is of type 'string'
const s = firstElement(["a", "b", "c"]);
// n is of type 'number'
const n = firstElement([1, 2, 3]);
// u is of type undefined
const u = firstElement([]);
- 推断（inference）
  - TS 会自动推断一些类型，示例：
function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
  return arr.map(func);
}
// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(["1", "2", "3"], (n) => parseInt(n));
- 约束（constraints）
  - 有的时候，我们想关联两个值，但只能操作值的一些固定字段，这种情况，我们可以使用 约束（constraint）对类型参数进行限制，示例：
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}
    - 解析：
    extends 关键字用于定义泛型类型参数 Type 的约束（constraint）。通过 extends，可以指定 Type 必须符合某种类型结构或拥有特定的属性或方法。
  - 易错点：函数理应返回与传入参数相同类型的对象，而不仅仅是符合约束的对象
    
- 声明类型参数（Specifying type arguments）
  - TypeScript 通常能自动推断泛型调用中传入的类型参数，但也并不能总是推断出，示例：
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}

//会报错
const arr = combine([1, 2, 3], ["hello"]);
// Type 'string' is not assignable to type 'number'.

//使用类型断言执意调用
const arr = combine<string | number>([1, 2, 3], ["hello"]);


  - 写一个好的泛型函数的一些建议
    - 类型参数下移（push type parameters down）
      - 示例：
function firstElement1<Type>(arr: Type[]) {
  return arr[0];
}
function firstElement2<Type extends any[]>(arr: Type) {
  return arr[0];
}
// a: number (good)
const a = firstElement1([1, 2, 3]);
// b: any (bad)
const b = firstElement2([1, 2, 3]);
      - 如果可能的话，直接使用类型参数而不是约束它 ，约束后会以约束的类型来进行推导
    - 使用更少的类型参数（use fewer type parameters）
    - 类型参数应该出现两次（type parameters should appear twice）
      - 记住：类型参数是用来关联多个值之间的类型。如果一个类型参数只在函数签名里出现了一次，那它就没有跟任何东西产生关联。示例：
//类型参数只出现了一次
function greet<Str extends string>(s: Str) {
  console.log("Hello, " + s);
}
greet("world");

//更合理的写法
function greet(s: string) {
  console.log("Hello, " + s);
}
- 可选参数（optional parameters）
  - 语法，使用 ? 表示这个参数是可选的，示例：
function f(x?: number) {
  // ...
}
f(); // OK
f(10); // OK
    - 解析：尽管这个参数被声明为 number类型，x 实际上的类型为 number | undefiend，这是因为在 JavaScript 中未指定的函数参数就会被赋值 undefined
  - 注意当一个参数是可选的，调用的时候还是可以传入 undefined
  - 回调中的可选参数（optional parameters in callbacks）
    - 在 JavaScript 中，如果你调用一个函数的时候，传入了比需要更多的参数，额外的参数就会被忽略。TypeScript 也是同样的做法
    - 当你写一个回调函数的类型时,不要写一个可选参数, 除非你真的打算调用函数的时候不传入实参
- 函数重载（Function Overloads）
  - 函数在调用的时候可以传入不同数量和类型的参数，在 TypeScript 中，可以通过写重载签名 (overlaod signatures) 说明一个函数的不同调用方法，通常，函数重载包括一组重载签名和一个实现签名，示例：
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
const d3 = makeDate(1, 3);
// No overload expects 2 arguments, but overloads do exist that expect either 1 or 3 arguments.
  - 重载签名和实现签名（Overload Signatures and the Implementation Signature）
    - 示例：
function functionName(arg1: type1): returnType1;
function functionName(arg1: type1, arg2: type2): returnType2;
// 更多重载签名...

function functionName(arg1: type1, arg2?: type2): returnType {
  // 实现签名，根据传入参数类型进行处理
}
    - 写实现签名对外界来说是不可见的
    - 实现签名必须和重载签名必须兼容（compatible）
  - 写一个好的函数重载的一些建议：尽可能的使用联合类型替代重载  
  - 在函数中声明 this （Declaring this in a function）
    - TypeScript 会通过代码流分析函数中的 this 会是什么类型。
    - 在 JavaScript 中，this 是保留字，所以不能当做参数使用。但 TypeScript 可以允许你在函数体内声明 this 的类型
      - 示例：
const user = {
  id: 123,
  admin: false,
  becomeAdmin: function () {
    this.admin = true;
  },
};

interface DB {
  filterUsers(filter: (this: User) => boolean): User[];
}

const db = getDB();
const admins = db.filterUsers(function (this: User) {
  return this.admin;
});
- 其他需要知道的类型（Other Types to Know About）
  - void
    - 表示一个函数并不会返回任何值，当函数并没有任何返回值，或者返回不了明确的值
    - 在 JavaScript 中，一个函数并不会返回任何值，会隐式返回 undefined，但是 void 和 undefined 在 TypeScript 中并不一样
  - object
    - 这个特殊的类型 object 可以表示任何不是原始类型（primitive）的值 (string、number、bigint、boolean、symbol、null、undefined)。object 不同于空对象类型 { }，也不同于全局类型 Object
    - 在 js 和 ts 中函数也被认为是object
  - unknown
    - unknown 类型可以表示任何值。有点类似于 any，但是更安全，因为对 unknown 类型的值做任何事情都是不合法的
  - never
    - 表示一个值不会再被观察到 (observed)
  - Function
    - 在 JavaScript，全局类型 Function 描述了 bind、call、apply 等属性，以及其他所有的函数值。它也有一个特殊的性质，就是 Function 类型的值总是可以被调用，结果会返回 any 类型:
function doSomething(f: Function) { //避免使用，无类型函数调用
    f(1, 2, 3);
}
  - 剩余参数（rest arguments）
    - 可以借助一个使用 … 语法的数组，为函数提供不定数量的实参，示例：
//语法：
function functionName(param1: type1, param2: type2, ...restParams: type[]): returnType {
  // 使用 restParams 数组处理剩余参数
}

//实例：
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
arr1.push(…arr2)
- 参数解构
  - 使用参数解构方便的将作为参数提供的对象解构为函数体内一个或者多个局部变量
  - 示例：
function sum({ a, b, c }) {
    console.log(a + b + c);
}

//解构形式1（加类型注解）
function sum({ a, b, c }: { a: number; b: number; c: number }) {
    console.log(a + b + c);
}

//结构形式2
type ABC = { a: number; b: number; c: number };
function sum({ a, b, c }: ABC) {
    console.log(a + b + c);
}
- 函数的可赋值性（assignability of functions）
  - 返回 void，函数有一个 void 返回类型，会产生一些意料之外，情理之中的行为
  - 当基于上下文的类型推导（Contextual Typing）推导出返回类型为 void 的时候，并不会强制函数一定不能返回内容，若有返回值，返回值会被忽略掉

2.6 Object Types
- 对象类型（Obeject types）
  - 在 JavaScript 中，最基本的将数据成组和分发的方式就是通过对象。在 TypeScript 中，通过对象类型（object types）来描述对象
  - 对象类型可以是匿名的、使用接口进行定义（interface）、或者通过类型别名（type）
- 属性修饰符（Property Modifiers）
  - 对象类型中的每个属性可以说明它的类型、属性是否可选、属性是否只读等信息
  - 可以在属性名后面加一个 ? 标记表示这个属性是可选
    - 尝试读取可选属性，如果在strictNullChecks模式下，TS会提示我们，属性值可能是undefined
    - 在 TS 中，如果一个属性值没有被设置，获取会得到 undefined 。所以可以针对 undefined 特殊处理一下：
function paintShape(opts: PaintOptions) {
    let xPos = opts.xPos === undefined ? 0 : opts.xPos;
    // let xPos: number
    let yPos = opts.yPos === undefined ? 0 : opts.yPos;
    // let yPos: number
}
      - 这种判断在 TS 中很常见，以至于提供了专门的语法糖：
function paintShape({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
    console.log("x coordinate at", xPos); // (parameter) xPos: number
    console.log("y coordinate at", yPos); // (parameter) yPos: number
    // ...
}
      - 解析：上述代码使用了结构语法以及为 xPos 和 yPos 提供了默认值。现在 xPos 和 yPos 的值在 paintShape 函数内部一定存在，但对于 paintShape 的调用者来说，却是可选的
      - 注意现在并没有在解构语法里放置类型注解的方式
  - readonly 属性（readonly Properties）
    - 在 TypeScript 中，属性可以被标记为 readonly，这不会改变任何运行时的行为，但在类型检查的时候，一个标记为 readonly的属性是不能被写入的
    - 在 TypeScript 中，使用 readonly 修饰属性可以确保该属性的值只能在对象创建时被赋值，之后不能被修改。这意味着一旦属性被初始化，它将保持不变，无法再次赋予新的值。
    - 在 TypeScript 中，如果一个对象的属性被标记为 readonly，但对象的属性本身没有被标记为 readonly，那么你仍然可以修改对象中的属性值。readonly 修饰符只影响对象属性的可分配性（assignability），而不影响属性的可变性（mutability）
  - 索引签名（Index Signatures）
    - 批量描述key的一种方式：
type MyObject = { // 描述 key
  [key: string]: string;
};

const obj1: MyObject = { // 批量
  name: "John",
  age: "30",
  email: "john@example.com"
};
    - 索引签名在需要处理动态属性名或多类型属性的情况下非常有用，但要谨慎使用，以确保代码的类型安全性（会放宽类型检查）
    - 示例：
interface StringArray {
    [index: number]: string;
}
const myArray: StringArray = getStringArray();
const secondItem = myArray[1]; // const secondItem: string
      - 解析：使用 number 类型的值进行索引的时候，会返回一个 string类型的值
    - 一个索引签名的属性类型必须是 string 或者是 number
    - 会强制要求所有的属性要匹配索引签名的返回类型
// ok
interface Foo {
  [key: string]: number;
  x: number;
  y: number;
}
 
// Error
interface Bar {
  [key: string]: number;
  x: number;
  y: string; // Error: y 属性必须为 number 类型
}
    - 如果一个索引签名是属性类型的联合，那各种类型的属性就可以接受：
interface NumberOrStringDictionary {
    [index: string]: number | string;
    length: number; // ok, length is a number
    name: string; // ok, name is a string
}
    - 也可以设置索引标签名为 readonly
    - 在 TypeScript 中，当你使用索引签名定义一个对象的属性时，你可以使用该签名来给对象添加新属性或更新现有属性的值。索引签名允许你使用动态的属性名来进行赋值：
interface Dictionary {
  [key: string]: number;
}

const data: Dictionary = {
  age: 30,
};

// 添加新属性
data["height"] = 175;

// 更新现有属性的值
data["age"] = 31;

console.log(data); // 输出：{ age: 31, height: 175 }
    - 虽然索引签名允许这种动态赋值，但它也有一定的灵活性，这可能会导致一些类型安全性的问题。因此，在使用索引签名时，要特别小心确保对象属性的类型与索引签名的类型兼容，以避免潜在的错误。如果可能的话，最好在代码中添加适当的类型检查来确保类型安全
- 属性继承（extending types）
  - 对接口使用 extends关键字允许我们有效的从其他声明过的类型中拷贝成员，并且随意添加新成员
  - 接口也可以继承多个类型：
interface Colorful {
    color: string;
}

interface Circle {
    radius: number;
}

interface ColorfulCircle extends Colorful, Circle {}

const cc: ColorfulCircle = {
    color: "red",
    radius: 42,
};
- 交叉类型（intersection types）
  - TypeScript 也提供了名为交叉类型（Intersection types）的方法，用于合并已经存在的对象类型
  - 语法，交叉类型的定义需要用到 & 操作符：
interface Colorful {
    color: string;
}

interface Circle {
    radius: number;
}

type ColorfulCircle = Colorful & Circle;
    - 解析：连结 Colorful 和 Circle 产生了一个新的类型，新类型拥有 Colorful 和 Circle 的所有成员
- 接口继承与交叉类型（interfaces vs intersections）
  - 这两种方式在合并类型上看起来很相似，但实际上还是有很大的不同。最原则性的不同就是在于冲突怎么处理，这也是你决定选择那种方式的主要原因
    - 继承示例：
interface Colorful {
    color: string;
}

interface ColorfulSub extends Colorful {
    color: number
}

// Interface 'ColorfulSub' incorrectly extends interface 'Colorful'.
// Types of property 'color' are incompatible.
// Type 'number' is not assignable to type 'string'.
    - 交叉类型示例：
interface Colorful {
    color: string;
}

type ColorfulSub = Colorful & {
    color: number
}
    - 使用继承的方式，如果重写类型会导致编译错误，但交叉类型不会。虽然不会报错，那 color 属性的类型是什么呢，答案是 never，取得是 string 和 number 的交集
- 泛型对象类型（generic object types）
  - 创建一个泛型 Box ，它声明了一个类型参数 (type parameter)：
interface Box<Type> {
    contents: Type;
}   
    - 解析：可以这样理解：Box 的 Type 就是 contents 拥有的类型 Type，当引用 Box 的时候，我们需要给予一个类型实参替换掉 Type：
let box: Box<string>;
      - 把 Box 想象成一个实际类型的模板，Type 就是一个占位符，可以被替代为具体的类型
    - 可以利用泛型函数避免使用函数重载
    - 类型干别名也可以使用泛型：
type Box<Type> = {
    contents: Type;
};
    - 类型别名不同于接口，可以描述的不止是对象类型，所以我们也可以用类型别名写一些其他种类的泛型帮助类型：
type OrNull<Type> = Type | null;
 
type OneOrMany<Type> = Type | Type[];
 
type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;
           
type OneOrManyOrNull<Type> = OneOrMany<Type> | null
 
type OneOrManyOrNullStrings = OneOrManyOrNull<string>;
               
type OneOrManyOrNullStrings = OneOrMany<string> | null
- Array 类型（The Array Type）
  - number[]或者string[]是Array<number>和Array<string>的简写形式
  - Array 本身就是一个泛型：
interface Array<Type> {
  /**
   * Gets or sets the length of the array.
   */
  length: number;
 
  /**
   * Removes the last element from an array and returns it.
   */
  pop(): Type | undefined;
 
  /**
   * Appends new elements to an array, and returns the new length of the array.
   */
  push(...items: Type[]): number;
 
  // ...
}
- ReadonlyArray 类型（The ReadonlyArray Type）
  - ReadonlyArray 是一个特殊类型，它可以描述数组不能被改变：
function doStuff(values: ReadonlyArray<string>) {
  // We can read from 'values'...
  const copy = values.slice();
  console.log(`The first value is ${values[0]}`);
 
  // ...but we can't mutate 'values'.
  values.push("hello!");
  // Property 'push' does not exist on type 'readonly string[]'.
}
  - ReadonlyArray 主要是用来做意图声明。当我们看到一个函数返回 ReadonlyArray，就是在告诉我们不能去更改其中的内容，当我们看到一个函数支持传入 ReadonlyArray ，这是在告诉我们我们可以放心的传入数组到函数中，而不用担心会改变数组的内容
  - 不像 Array，ReadonlyArray 并不是一个可以用的构造器函数，它仅仅指一种类型
  - 可以直接把一个常规数组赋值给 ReadonlyArray：
const roArray: ReadonlyArray<string> = ["red", "green", "blue"];
  - TypeScript 也针对 ReadonlyArray<Type> 提供了更简短的写法 readonly Type[]：
function doStuff(values: readonly string[]) {
  // We can read from 'values'...
  const copy = values.slice();
  console.log(`The first value is ${values[0]}`);
 
  // ...but we can't mutate 'values'.
  values.push("hello!");
  // Property 'push' does not exist on type 'readonly string[]'.
}
    - 解析：没有任何参数的 slice 执行一个简单的浅拷贝
  - Arrays 和 ReadonlyArray 并不能双向的赋值：
let x: readonly string[] = [];
let y: string[] = [];
 
x = y; // ok
y = x; // The type 'readonly string[]' is 'readonly' and cannot be assigned to the mutable type 'string[]'.

- 元组类型（Tuple Types）
  - 元组类型是另外一种 Array 类型，当你明确知道数组包含多少个元素，并且每个位置元素的类型都明确知道的时候，就适合使用元组类型：
type StringNumberPair = [string, number];
    - 上述例子中，StringNumberPair 就是 string 和 number 的元组类型，描述了一个数组，索引 0 的值的类型是 string，索引 1 的值的类型是 number
  - 若要获取元素数量之外的元素，TS会提示错误
  - 可以使用 JavaScript 的数组解构语法解构元组：
function doSomething(stringHash: [string, number]) {
  const [inputString, hash] = stringHash;
  console.log(inputString); // const inputString: string
  console.log(hash); // const hash: number
}
    - 解析：元组类型在重度依赖约定的 API 中很有用，因为它会让每个元素的意义都很明显。当解构的时候，元组给了我们命名变量的自由度
  - 除了长度检查，简单的元组类型跟声明了 length 属性和具体的索引属性的 Array 是一样的：
interface StringNumberPair {
  // specialized properties
  length: 2;
  0: string;
  1: number;
 
  // Other 'Array<string | number>' members...
  slice(start?: number, end?: number): Array<string | number>;
}
  - 在元组类型中，你也可以写一个可选属性，但可选元素必须在最后面，而且也会影响类型的 length ：
type Either2dOr3d = [number, number, number?];
 
function setCoordinate(coord: Either2dOr3d) {
  const [x, y, z] = coord;            
   //  const z: number | undefined
 
  console.log(`Provided coordinates had ${coord.length} dimensions`);
  // (property) length: 2 | 3
}
  - Tuples 也可以使用剩余元素语法，但必须是 array/tuple 类型：
type StringNumberBooleans = [string, number, ...boolean[]];
type StringBooleansNumber = [string, ...boolean[], number];
type BooleansStringNumber = [...boolean[], string, number];
  - 有剩余元素的元组并不会设置 length，因为它只知道在不同位置上的已知元素信息
  - 可选元素和剩余元素的存在，使得 TypeScript 可以在参数列表里使用元组：
function readButtonInput(...args: [string, number, ...boolean[]]) {
  const [name, version, ...input] = args; //数组结构语法
  // ...
}
    - 基本等同于：
function readButtonInput(name: string, version: number, ...input: boolean[]) {
  // ...
}
- Readonly 元组类型（readonly Tuple Types）
  - 元组类型也是可以设置 readonly：（不允许写入）
function doSomething(pair: readonly [string, number]) {
  // ...
}
    - 解析：在大部分的代码中，元组只是被创建，使用完后也不会被修改，所以尽可能的将元组设置为 readonly 是一个好习惯
    - 如果给一个数组字面量 const 断言，也会被推断为 readonly 元组类型：
let point = [3, 4] as const;
function distanceFromOrigin([x, y]: [number, number]) {
    return Math.sqrt(x ** 2 + y ** 2);
}

distanceFromOrigin(point);

// Argument of type 'readonly [3, 4]' is not assignable to parameter of type '[number, number]'.
// The type 'readonly [3, 4]' is 'readonly' and cannot be assigned to the mutable type '[number, number]'.

2.7 Type Manipulation
2.7.1 泛型（Generics）
- Generics 初探（Hello World of Generics）
  - 需要一种可以捕获参数类型的方式，用一个类型变量（type variable），一种用在类型而非值上的特殊的变量：
//恒等函数
function identity<Type>(arg: Type): Type {
  return arg;
}
  - 两种方式调用泛型恒等函数：
//第一种调用方式
let output = identity<string>("myString"); // let output: string

//第二种调用方式
/*类型参数推断（type argument inference）
希望编译器能基于我们传入的参数自动推断和设置 Type 的值*/
let output = identity("myString"); // let output: string
- 使用泛型类型变量（Working with Generic Type Variables）
  - 示例：
function loggingIdentity<Type>(arg: Type[]): Type[] {
  console.log(arg.length);
  return arg;
}
    - 解析：可以这样理解 loggingIdentity 的类型：泛型函数 loggingIdentity 接受一个 Type 类型参数和一个实参 arg，实参 arg 是一个 Type 类型的数组。而该函数返回一个 Type 类型的数组
    - 使用类型变量 Type，是作为我们使用的类型的一部分，而不是之前的一整个类型，这会给我们更大的自由度，上述代码效果等同于：
function loggingIdentity<Type>(arg: Array<Type>): Array<Type> {
  console.log(arg.length); // Array has a .length, so no more error
  return arg;
}
- 泛型类型（Generic Types）
  - 泛型函数的形式就跟其他非泛型函数的一样，都需要先列一个类型参数列表，这有点像函数声明：
function identity<Type>(arg: Type): Type {
  return arg;
}
 
let myIdentity: <Type>(arg: Type) => Type = identity;
  - 解析：<Type>(arg: Type) => Type 表示一个泛型函数类型，然后使用let myIdentity: <Type>(arg: Type) => Type = identity; 将这个函数分配给变量 myIdentity，并指定了函数类型。这意味着 myIdentity 变量可以接受与 identity 函数具有相同签名的函数，并且可以根据需要使用不同的类型
  - 泛型的类型参数可以使用不同的名字，只要数量和使用方式上一致即可：
function identity<Type>(arg: Type): Type {
  return arg;
}
 
let myIdentity: <Input>(arg: Input) => Input = identity;
  - 也可以以对象类型的调用签名的形式，书写这个泛型类型：
function identity<Type>(arg: Type): Type {
  return arg;
}
 
let myIdentity: { <Type>(arg: Type): Type } = identity;

//改写，将调用签名放在一个接口中
interface GenericIdentityFn<Type> {
  <Type>(arg: Type): Type;
}
 
function identity<Type>(arg: Type): Type {
  return arg;
}
 
let myIdentity: GenericIdentityFn<Type> = identity; // 该Type写具体类型
  - 调用签名：在 TypeScript 中，调用签名是一种用于定义函数类型的签名，它描述了函数的参数列表和返回值类型。调用签名通常用于定义函数类型，以便你可以创建具有相同签名的函数实例或对象
  - 注意，不可能创建泛型枚举类型和泛型命名空间
- 泛类型（Generic Classes）
  - 泛型类写法：
class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}
 
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};
  - 解析：add: (x: NumType, y: NumType) => NumType;是一个函数类型的定义，也可以称为函数类型签名。它描述了一个函数
- 泛型约束（Generic Constraints）
  - 使用接口和 extends 关键词实现约束：
interface Lengthwise {
  length: number;
}
 
function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length); // Now we know it has a .length property, so no more error
  return arg;
}
    - 实现了对函数 loggingIdentity 的参数 arg 进行约束，要求它必须符合 Lengthwise 接口的结构
- 在泛型约束中使用类型参数（Using Type Parameters in Generic Constraints）
  - 声明一个类型参数，这个类型参数被其他类型参数约束
  - 举个例子，我们希望获取一个对象给定属性名的值，为此，我们需要确保我们不会获取 obj 上不存在的属性。所以我们在两个类型之间建立一个约束：
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}
 
let x = { a: 1, b: 2, c: 3, d: 4 };
 
getProperty(x, "a");
getProperty(x, "m");

// Argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'.
- 在泛型中使用类类型（Using Class Types in Generics）
  - 在 TypeScript 中，当使用工厂模式创建实例的时候，有必要通过他们的构造函数推断出类的类型，举个例子：
function create<Type>(c: { new (): Type }): Type {
  return new c();
}
    - 解析：
      - function create<Type>: 这是一个泛型函数声明，它使用了一个泛型类型参数 Type，这使得函数能够接受不同类型的参数，并返回相应的类型
      - (c: { new (): Type }): 这是函数的参数列表。它接受一个参数 c，类型为一个对象字面量，该对象字面量必须具有一个没有参数的构造函数（new () => Type）
      - return new c();这一行的作用是使用传递进来的构造函数 c 来创建一个新的实例，并将该实例作为返回值返回
      - 这个函数的目的是通过传递一个构造函数（c）来创建该构造函数所对应的类型的实例，并将实例作为返回值返回

2.7.2 keyof 类型操作符
- Keyof 类型操作符
  - 对一个对象类型使用 keyof 操作符，会返回该对象属性名组成的一个字符串或者数字字面量的联合：
type Point = { x: number; y: number };
type P = keyof Point;

// 类型 P 就等同于 "x" | "y"
  - 但如果这个类型有一个 string 或者 number 类型的索引签名，keyof 则会直接返回这些类型的联合类型：
type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;// type A = number

type Mapish = { [k: string]: boolean };
type M = keyof Mapish;// type M = string | number
    - 注意在这个例子中，M 是 string | number，这是因为 JavaScript 对象的属性名会被强制转为一个字符串，所以 obj[0] 和 obj["0"] 是一样的
- 数字字面量联合类型
  - keyof 也可能返回一个数字字面量的联合类型，那什么时候会返回数字字面量联合类型呢？
const NumericObject = {
  [1]: "zhang",
  [2]: "zhi",
  [3]: "guo"
};

type result = keyof typeof NumericObject

// typeof NumbericObject 的结果为：
// {
//   1: string;
//   2: string;
//   3: string;
// }
// 所以最终的结果为：
// type result = 1 | 2 | 3
  - Symbol
    - TypeScript 也可以支持 symbol 类型的属性名：
const sym1 = Symbol();
const sym2 = Symbol();
const sym3 = Symbol();

const symbolToNumberMap = {
  [sym1]: 1,
  [sym2]: 2,
  [sym3]: 3,
};

type KS = keyof typeof symbolToNumberMap; // typeof sym1 | typeof sym2 | typeof sym3
  - 类和接口
    - 对类使用 keyof：
// 例子一
class Person {
  name: "string"
}

type result = keyof Person;
// type result = "name"

// 例子二
class Person {
  [1]: string = "string";
}

type result = keyof Person;
// type result = 1
      - 解析：
type Mapish = { [k: string]: boolean };
type M = keyof Mapish;// type M = string | number
/******/
class Person {
  [1]: string = "string"; // type result = 1
}

//第二段代码为什么会为 1 ？
/*注意中括号的位置，表示符不允许数字开头，为了非法的使用数字作为标识符，
所以加了中括号，中括号后的string是类型注释
*/
    - 对接口使用 keyof：
interface Person {
  name: "string";
}

type result = keyof Person;
// type result = "name"

2.7.3 Typeof Type Operator
- typeof 类型操作符（The typeof type operator）
  - TS 中的typeof，在类型上下文（type context）中使用，用于获取一个变量或者属性的类型
  - 如果仅仅用来判断基本的类型，自然是没什么太大用，和其他的类型操作符搭配使用才能发挥它的作用：
/*函数类型 + 泛型函数*/
type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>;
// type K = boolean

/*弄清楚值和类型*/
/*错误示范*/
function f() {
  return { x: 10, y: 3 };
}
type P = ReturnType<f>;
// 'f' refers to a value, but is being used as a type here. Did you mean 'typeof f'?

/*正确示范*/
function f() {
  return { x: 10, y: 3 };
}
type P = ReturnType<typeof f>;
                    
// type P = {
//    x: number;
//    y: number;
// }
- 限制（Limitations）
  - TypeScript 有意的限制了可以使用 typeof 的表达式的种类。只有对标识符（比如变量名）或者他们的属性使用 typeof 才是合法的
  - 获取函数返回值：
// 错误示范
let shouldContinue: typeof msgbox("Are you sure you want to continue?");

//正确示范
ReturnType<typeof msgbox>; //ReturnType<Type> 是TS提供的函数
- 对对象使用 typeof
const person = { name: "kevin", age: "18" }
type Kevin = typeof person;

// type Kevin = {
//    name: string;
//    age: string;
// }
//结果为对对象的规范，TS中的对象更多的是在描述对象的结构
- 对函数使用 typeof
function identity<Type>(arg: Type): Type {
  return arg;
}

type result = typeof identity;
// type result = <Type>(arg: Type) => Type
//结果为函数类型
- 对 enum 使用 typeof
enum UserResponse {
  No = 0,
  Yes = 1,
}

type result = typeof UserResponse;

// ok
const a: result = {
      "No": 2,
      "Yes": 3
}

//result 类型类似于：
// {
//    "No": number,
//    "YES": number
// }
  - 解析：对一个 enum 类型只使用 typeof 一般没什么用，通常还会搭配 keyof 操作符用于获取属性名的联合字符串

2.7.4 索引访问类型（Indexed Access Types）
- 使用 索引访问类型（indexed access type） 查找另外一个类型上的特定属性：
type Person = { age: number; name: string; alive: boolean };
type Age = Person["age"];
// type Age = number
- 因为索引名本身就是一个类型，所以我们也可以使用联合、keyof 或者其他类型：
type I1 = Person["age" | "name"];  
// type I1 = string | number
 
type I2 = Person[keyof Person];
// type I2 = string | number | boolean
 
type AliveOrName = "alive" | "name";
type I3 = Person[AliveOrName];  
// type I3 = string | boolean
- 若尝试查找一个不存在的属性，TS会报错：
type I1 = Person["alve"];
// Property 'alve' does not exist on type 'Person'.
- 接下来是另外一个示例，使用 number 来获取数组元素的类型。结合 typeof 可以方便的捕获数组字面量的元素类型：
const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
];
 
type Person = typeof MyArray[number];
       
// type Person = {
//    name: string;
//    age: number;
// }

type Age = typeof MyArray[number]["age"];  
// type Age = number

// Or
type Age2 = Person["age"];   
// type Age2 = number
- 作为索引的只能是类型，这意味着你不能使用 const 创建一个变量引用：
const key = "age";
type Age = Person[key];
// Type 'key' cannot be used as an index type.
// 'key' refers to a value, but is being used as a type here. Did you mean 'typeof key'?
- 可以使用类型别名实现类似的重构：
type key = "age";
type Age = Person[key];
- 实战案例
  - 假设有这样一个业务场景，一个页面要用在不同的 APP 里，比如淘宝、天猫、支付宝，根据所在 APP 的不同，调用的底层 API 会不同，我们可能会这样写：
const APP = ['TaoBao', 'Tmall', 'Alipay'] as const;
type app = typeof APP[number]; // number为占位符，指合法的数组下标
// type app = "TaoBao" | "Tmall" | "Alipay"

function getPhoto(app: app) {
  // ...
}
  
getPhoto('TaoBao'); // ok
getPhoto('whatever'); // not ok

2.7.5 条件类型（Conditional Types）
- 条件类型（Conditional Types）
  - 大多时候，我们需要根据输入的值和类型，决定我们输出的值和类型。条件类型（Conditional types）就是用来帮助我们描述输入类型和输出类型之间的关系
  - 语法类似JS中的条件表达式：
interface Animal {
  live(): void;
}

interface Dog extends Animal {
  woof(): void;
}
 
type Example1 = Dog extends Animal ? number : string;     
// type Example1 = number
 
type Example2 = RegExp extends Animal ? number : string;     
// type Example2 = string
  - 利用条件类型 + 泛型可以减少函数重载
    - 普通函数重载：
interface IdLabel {
  id: number /* some fields */;
}
interface NameLabel {
  name: string /* other fields */;
}
 
function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
  throw "unimplemented";
}
    - 利用条件变量简化：
function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
     //Todo:实现NameOrId<T>
}
 
let a = createLabel("typescript");
// let a: NameLabel
 
let b = createLabel(2.8);
// let b: IdLabel
 
let c = createLabel(Math.random() ? "hello" : 42);
// let c: NameLabel | IdLabel
- 条件类型约束（Conditional Type Constraints）
  - 条件类型的 true 分支也会进一步约束泛型，举个例子：
type MessageOf<T> = T["message"];
// Type '"message"' cannot be used to index type 'T'.
  - TypeScript 报错是因为 T 不知道有一个名为 message 的属性。我们可以约束 T，这样 TypeScript 就不会再报错：
type MessageOf<T extends { message: unknown }> = T["message"];
 
interface Email {
  message: string;
}
 
type EmailMessageContents = MessageOf<Email>;
// type EmailMessageContents = string
  - 解析：具体来说，泛型约束 { message: unknown } 表示：
    - T 必须是一个对象类型
    - T 必须包含一个名为 message 的属性
    - message 属性的值可以是任何类型，因为它被定义为 unknown，表示未知类型
  - 使用条件类型改写上述代码：
type MessageOf<T> = T extends { message: unknown } ? T["message"] : never;
 
interface Email {
  message: string;
}
 
interface Dog {
  bark(): void;
}
 
type EmailMessageContents = MessageOf<Email>;           
// type EmailMessageContents = string
 
type DogMessageContents = MessageOf<Dog>;          
// type DogMessageContents = never
  - 在 true 分支里，TypeScript 会知道 T 有一个 message属性
  - 例子，写一个 Flatten 类型，用于获取数组元素的类型，当传入的不是数组，则直接返回传入的类型：
type Flatten<T> = T extends any[] ? T[number] : T;
 
// Extracts out the element type.
type Str = Flatten<string[]>;  
// type Str = string
 
// Leaves the type alone.
type Num = Flatten<number>;  
// type Num = number
  - 解析：利用索引访问类型，返回 T[number]，也就是数组 T 的元素类型
- 在条件类型里推断（Inferring Within conditional Types）
  - 条件类型提供了 infer 关键词，可以从正在比较的类型中推断类型，然后在 true 分支里引用该推断结果：
type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;
  - 解析：使用 infer 关键字声明了一个新的类型变量 Item，帮助我们从感兴趣的类型结构中挖出需要的结构类型
  - 使用 infer 关键字写一些有用的 类型帮助别名（helper type aliases），举例，获取一个函数返回的类型：
type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
  ? Return
  : never;
 
type Num = GetReturnType<() => number>;
// type Num = number
 
type Str = GetReturnType<(x: string) => string>;
// type Str = string
 
type Bools = GetReturnType<(a: boolean, b: boolean) => boolean[]>;   
// type Bools = boolean[]
  - 当从多重调用签名（就比如重载函数）中推断类型的时候，会按照最后的签名进行推断，因为一般这个签名是用来处理所有情况的签名：
declare function stringOrNum(x: string): number;
declare function stringOrNum(x: number): string;
declare function stringOrNum(x: string | number): string | number;
 
type T1 = ReturnType<typeof stringOrNum>;                     
// type T1 = string | number
- 分发条件类型（Distributive Conditional Types）
  - 当在泛型中使用条件类型的时候，如果传入一个联合类型，就会变成 分发的（distributive）：
type ToArray<Type> = Type extends any ? Type[] : never;
 
type StrArrOrNumArr = ToArray<string | number>;        
// type StrArrOrNumArr = string[] | number[]
  - 解析：如果我们在 ToArray 传入一个联合类型，这个条件类型会被应用到联合类型的每个成员
  - 通常这是我们期望的行为，如果你要避免这种行为，你可以用方括号包裹 extends 关键字的每一部分：
type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;
 
// 'StrArrOrNumArr' is no longer a union.
type StrArrOrNumArr = ToArrayNonDist<string | number>;
// type StrArrOrNumArr = (string | number)[]
2.7.6 映射类型（Mapped types）
- 映射类型
  - 根据现有类型的属性创建一个新的类型，其中属性名称保持不变，但属性类型改变
  - 映射类型建立在索引签名的语法上，就是使用 PropertyKeys 联合类型的泛型，其中 PropertyKeys 多是通过 keyof 创建，然后循环遍历键名创建一个类型：
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

type FeatureFlags = {
  darkMode: () => void;
  newUserProfile: () => void;
};
 
type FeatureOptions = OptionsFlags<FeatureFlags>;
// type FeatureOptions = {
//    darkMode: boolean;
//    newUserProfile: boolean;
// }
    - 解析：
      - OptionsFlags<Type> 这个类型是通过映射类型（Mapped Types）来遍历 Type 中的属性的。映射类型允许你在定义一个新类型时，根据现有类型的属性来创建新的属性
      - [Property in keyof Type] 是一个映射类型的键。它使用了两个 TypeScript 的关键概念：
        - keyof Type：这是索引类型查询（Index Type Query）的一部分，它返回了类型 Type 的所有属性名称的联合类型
        - [Property in ...]：这部分定义了映射类型的结构，其中 Property 是一个变量名，表示正在遍历的属性名称
      - boolean 是映射类型中新属性的类型
      - 整个 OptionsFlags<Type> 类型的目的是遍历 Type 类型的属性，并将每个属性映射为布尔值类型
- 映射修饰符（Mapping Modifiers）
  - 在使用映射类型时，有两个额外的修饰符可能会用到，一个是 readonly，用于设置属性只读，一个是 ? ，用于设置属性可选
  - 可以通过前缀 - 或者 + 删除或者添加这些修饰符，如果没有写前缀，相当于使用了 + 前缀：
    - 删除属性中的只读性
// 删除属性中的只读性
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};
 
type LockedAccount = {
  readonly id: string;
  readonly name: string;
};
 
type UnlockedAccount = CreateMutable<LockedAccount>;

// type UnlockedAccount = {
//    id: string;
//    name: string;
// }
    - 删除属性中的可选性
// 删除属性中的可选性
type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};
 
type MaybeUser = {
  id: string;
  name?: string;
  age?: number;
};
 
type User = Concrete<MaybeUser>;
// type User = {
//    id: string;
//    name: string;
//    age: number;
// }
- 通过 as 实现键名重新映射（Key Remapping via as）
  - 在 TypeScript 4.1 及以后，你可以在映射类型中使用 as 语句实现键名重新映射：
type MappedTypeWithNewProperties<Type> = {
    [Properties in keyof Type as NewKeyType]: Type[Properties]
}
  - 举例，利用模板字面量类型，基于之前的属性名创建一个新属性名：
type Getters<Type> = {
    [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property]
};
 
interface Person {
    name: string;
    age: number;
    location: string;
}
 
type LazyPerson = Getters<Person>;

// type LazyPerson = {
//    getName: () => string;
//    getAge: () => number;
//    getLocation: () => string;
// }
    - 解析：
      - Capitalize<string & Property> 是一个表达式，它将属性名称首字母大写。Property 是属性名称，string & Property 表示将属性名称视为字符串类型，然后 Capitalize 函数将字符串的首字母大写
  - 还可以遍历任何联合类型，不仅仅是 string | number | symbol 这种联合类型，可以是任何类型的联合：
type EventConfig<Events extends { kind: string }> = {
    [E in Events as E["kind"]]: (event: E) => void;
}
 
type SquareEvent = { kind: "square", x: number, y: number };
type CircleEvent = { kind: "circle", radius: number };
 
type Config = EventConfig<SquareEvent | CircleEvent>
// type Config = {
//    square: (event: SquareEvent) => void;
//    circle: (event: CircleEvent) => void;
// }
- 深入探索（Further Exploration）
  - 映射类型也可以跟其他的功能搭配使用，举个例子，这是一个使用条件类型的映射类型，会根据对象是否有 pii 属性返回 true 或者 false :
type ExtractPII<Type> = {
  [Property in keyof Type]: Type[Property] extends { pii: boolean } ? true : false;
};

type DBFields = {
  id: { format: "incrementing" };
  name: { type: string; pii: true };
  comment: { type: string; pii: false };
};
 
type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;
// type ObjectsNeedingGDPRDeletion = {
//    id: false;
//    name: true;
//    comment: true;
// }
2.7.6 模板字面量类型（Template Literal Types）
- 模板字面量类型
  - 模板字面量类型以字符串字面量类型为基础，可以通过联合类型扩展成多个字符串。它们跟 JavaScript 的模板字符串是相同的语法，但是只能用在类型操作中
  - 当使用模板字面量类型时，它会替换模板中的变量，返回一个新的字符串字面量：
    - JavaScript中的模板字符串：
type World = "o.o";
 
type Greeting = `hello ${World}`;
// type Greeting = "hello o.o"
    - 当模板中的变量是一个联合类型时，每一个可能的字符串字面量都会被表示：
type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";
 
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
// type AllLocaleIDs = "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id"
    - 如果模板字面量里的多个变量都是联合类型，结果会交叉相乘，比如下面的例子就有 2 * 2 * 3 一共 12 种（组合）结果：
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
type Lang = "en" | "ja" | "pt";
type LocaleMessageIDs = `${Lang}_${AllLocaleIDs}`;
// type LocaleMessageIDs = "en_welcome_email_id" | "en_email_heading_id" | "en_footer_title_id" | "en_footer_sendoff_id" | "ja_welcome_email_id" | "ja_email_heading_id" | "ja_footer_title_id" | "ja_footer_sendoff_id" | "pt_welcome_email_id" | "pt_email_heading_id" | "pt_footer_title_id" | "pt_footer_sendoff_id"
- 类型中的字符串联合类型（String Unions in Types）
  - 模板字面量最有用的地方在于你可以基于一个类型内部的信息，定义一个新的字符串。
- 模板字面量的推断（Inference with Template Literals）
  - 类型中的字符串联合类型和模板字面量的推断的示例，给一个传入对象加上一个on方法：（难理解）
type PropEventSource<Type> = {
    on<Key extends string & keyof Type>
        (eventName: `${Key}Changed`, callback: (newValue: Type[Key]) => void ): void;
};
 
declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;

const person = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26
});
 
person.on("firstNameChanged", newName => {                             
                                                                                                                  // (parameter) newName: string
    console.log(`new name is ${newName.toUpperCase()}`);
});
 
person.on("ageChanged", newAge => {
                        // (parameter) newAge: number
    if (newAge < 0) {
        console.warn("warning! negative age");
    }
})
  - 内置字符操作类型（Intrinsic String Manipulation Types）
    - TypeScript 的一些类型可以用于字符操作，这些类型出于性能的考虑被内置在编译器中：
      - Uppercase：把每个字符转为大写形式
type Greeting = "Hello, world"
type ShoutyGreeting = Uppercase<Greeting>        
// type ShoutyGreeting = "HELLO, WORLD"
 
type ASCIICacheKey<Str extends string> = `ID-${Uppercase<Str>}`
type MainID = ASCIICacheKey<"my_app">
// type MainID = "ID-MY_APP"
      - Lowercase：把每个字符转为小写形式
type LowercaseGreeting = "hello, world";
type Greeting = Capitalize<LowercaseGreeting>;
// type Greeting = "Hello, world"
      - Capitalize：把字符串的第一个字符转为大写形式
type LowercaseGreeting = "hello, world";
type Greeting = Capitalize<LowercaseGreeting>;
// type Greeting = "Hello, world"
      - Uncapitalize：把字符串的第一个字符转换为小写形式
type UppercaseGreeting = "HELLO WORLD";
type UncomfortableGreeting = Uncapitalize<UppercaseGreeting>;           
// type UncomfortableGreeting = "hELLO WORLD"

2.8 类（Class）
- 类成员
  - 字段（Fields）
    - 一个字段声明会创建一个公共（public）可写入（writeable）的属性
    - 注意：类型注解是可选的，如果没有指定，会隐式的设置为 any
    - 字段可以设置初始值（initializers），一个类属性的初始值会被用于推断它的类型
    - strictPropertyInitialization 选项控制了类字段是否需要在构造函数里初始化
    - readonly
      - 字段可以添加一个 readonly 前缀修饰符，这会阻止在构造函数之外的赋值
  - 构造函数（Constructors）
    - 类的构造函数跟函数非常类似，可以使用带类型注解的参数、默认值、重载等。
    - 类构造函数签名与函数签名之间也有一些区别：
      - 构造函数不能有类型参数
      - 构造函数不能有返回类型注解，因为总是返回类实例类型
    - Super 调用（Super Calls）
      - 如果你有一个基类，你需要在使用任何 this. 成员之前，先在构造函数里调用 super()
  - 方法（Methods）
    - 类中的函数属性被称为方法
    - 注意在一个方法体内，可以通过 this. 访问字段和其他的方法。方法体内一个未限定的名称（unqualified name，没有明确限定作用域的名称）若被使用，需要根据作用域链区查找到底指的谁：
let x: number = 0;
 
class C {
  x: string = "hello";
 
  m() {
    // This is trying to modify 'x' from line 1, not the class property
    x = "world";
                // Type 'string' is not assignable to type 'number'.
  }
}
    - 解析：没有this修饰，当在m方法中没找到x时，会直接跳到类外作用域
  - Getter/Setter
    - 类可以有存取器（accessors）：
class C {
  _length = 0;
  get length() {
    return this._length;
  }
  set length(value) {
    this._length = value;
  }
}
    - TypeScript 对存取器有一些特殊的推断规则：
      - 如果 get 存在而 set 不存在，属性会被自动设置为 readonly
      - 如果 setter 参数的类型没有指定，它会被推断为 getter 的返回类型
      - getters 和 setters 必须有相同的成员可见性
    - 从 TypeScript 4.3 起，存取器在读取和设置的时候可以使用不同的类型：
class Thing {
  _size = 0;
 
  // 注意这里返回的是 number 类型
  get size(): number {
    return this._size;
  }
 
  // 注意这里允许传入的是 string | number | boolean 类型
  set size(value: string | number | boolean) {
    let num = Number(value);
 
    // Don't allow NaN, Infinity, etc
    if (!Number.isFinite(num)) {
      this._size = 0;
      return;
    }
 
    this._size = num;
  }
}
- 索引签名（Index Signatures）
  - 类可以声明索引签名，它和对象类型的索引签名是一样的：
class MyClass {
  [s: string]: boolean | ((s: string) => boolean);
 
  check(s: string) {
    return this[s] as boolean;
  }
}
- 类继承（Class Heritage）
  - implements 语句（implements Clauses）
    - 可以使用 implements 语句检查一个类是否满足一个特定的 interface。如果一个类没有正确的实现(implement)它，TypeScript 会报错：
interface Pingable {
  ping(): void;
}
 
class Sonar implements Pingable {
  ping() {
    console.log("ping!");
  }
}
 
class Ball implements Pingable {
  // Class 'Ball' incorrectly implements interface 'Pingable'.
  // Property 'ping' is missing in type 'Ball' but required in type 'Pingable'.
  pong() {
    console.log("pong!");
  }
}
    - 类也可以实现多个接口，比如class C implements A, B {}
    - 注意：implements 语句仅仅检查类是否按照接口类型实现，但并不会影响类的内部是如何检查或者类型推断的：
interface Checkable {
  check(name: string): boolean;
}
 
class NameChecker implements Checkable {
  check(s) {
     // Parameter 's' implicitly has an 'any' type.
    // Notice no error here
    return s.toLowercse() === "ok";
                                    // any
}
    - 实现一个有可选属性的接口，并不会创建这个属性：
interface A {
  x: number;
  y?: number;
}
class C implements A {
  x = 0;
}
const c = new C();
c.y = 10;

// Property 'y' does not exist on type 'C'.
  - extends 语句（extends Clause）
    - 类可以 extend 一个基类。一个派生类有基类所有的属性和方法，还可以定义额外的成员
    - 覆写属性（Overriding Methods）
      - 个派生类可以覆写一个基类的字段或属性。你可以使用 super 语法访问基类的方法：
class Base {
  greet() {
    console.log("Hello, world!");
  }
}
 
 //合法的写法
class Derived extends Base {
  greet(name?: string) {
    if (name === undefined) {
      super.greet();
    } else {
      console.log(`Hello, ${name.toUpperCase()}`);
    }
  }
}
 
const d = new Derived();
d.greet();
d.greet("reader");
      - 派生类要基于它的积累实现，重写基类方法时要注意：
        方法重写要求：
          1. 子父类的函数名与形参列表必须一致
          2. 子类的权限修饰符必须要大于或者等于父类的权限修饰符
          3. 子类的返回值类型必须小于或者等于父类 的返回值类型
          4. 子类抛出的异常类型必须小于或者等于父类抛出的异常类型
  - 初始化顺序
    - 基类字段初始化
    - 基类构造函数运行
    - 派生类字段初始化
    - 派生类构造函数运行
class Base {
  name = "base";
  constructor() {
    console.log("My name is " + this.name);
  }
}
 
class Derived extends Base {
  name = "derived";
}
 
// Prints "base", not "derived"
const d = new Derived();
    这意味着基类构造函数只能看到它自己的 name 的值，因为此时派生类字段初始化还没有运行
  - 继承内置类型
    - 在 ES2015 中，当调用 super(...) 的时候，如果构造函数返回了一个对象，会隐式替换 this 的值。所以捕获 super() 可能的返回值并用 this 替换它是非常有必要的
    - 推荐，手动的在 super(...) 调用后调整原型：
class MsgError extends Error {
  constructor(m: string) {
    super(m);
 
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, MsgError.prototype);
  }
 
  sayHello() {
    return "hello " + this.message;
  }
}
- 成员可见性
  可以使用 TypeScript 控制某个方法或者属性是否对类以外的代码可见
  - public
    - 类成员默认的可见性为 public，一个 public 的成员可以在任何地方被获取。因为 public 是默认的可见性修饰符，所以你不需要写它，除非出于格式或者可读性的原因
  - Protected
    - protected 成员仅仅对派生类内部可见：
class Greeter {
  public greet() {
    console.log("Hello, " + this.getName());
  }
  protected getName() {
    return "hi";
  }
}
 
class SpecialGreeter extends Greeter {
  public howdy() {
    // OK to access protected member here
    console.log("Howdy, " + this.getName());
  }
}
const g = new SpecialGreeter();
g.greet(); // OK
g.getName();

// Property 'getName' is protected and only accessible within class 'Greeter' and its subclasses.
    - 受保护成员的公开
      - 派生类需要遵循基类的实现，但是依然可以选择公开拥有更多能力的基类子类型，这就包括让一个 protected 成员变成 public：
class Base {
  protected m = 10;
}
class Derived extends Base {
  // No modifier, so default is 'public'
  m = 15;
}
const d = new Derived();
console.log(d.m); // OK
  - private
    - 只有成员所在的这个类内部可见
  - 警告（Caveats）
    - private和 protected 仅仅在类型检查的时候才会强制生效。这意味着在 JavaScript 运行时，像 in 或者简单的属性查找，依然可以获取 private 或者 protected 成员：
class MySafe {
  private secretKey = 12345;
}
 
const s = new MySafe();
 
// Not allowed during type checking
console.log(s.secretKey);
// Property 'secretKey' is private and only accessible within class 'MySafe'.
 
// OK
console.log(s["secretKey"]); //若私有
    - JavaScript 的私有字段（#）即便是编译后依然保留私有性，并且不会提供像上面这种方括号获取的方法，这让它们变得强私有（hard private）
  - 
- 静态成员
  - 类可以有静态成员，静态成员跟类实例没有关系，可以通过类本身访问到：
class MyClass {
  static x = 0;
  static printX() {
    console.log(MyClass.x);
  }
}
console.log(MyClass.x);
MyClass.printX();
  - 静态成员同样可以使用 public protected 和 private 这些可见性修饰符：
class MyClass {
  private static x = 0;
}
console.log(MyClass.x);
// Property 'x' is private and only accessible within class 'MyClass'.
  - 静态成员也可以被继承：
class Base {
  static getGreeting() {
    return "Hello world";
  }
}
class Derived extends Base {
  myGreeting = Derived.getGreeting();
}
  - 特殊静态名称
    - 类本身是函数，而覆写 Function 原型上的属性通常认为是不安全的，因此不能使用一些固定的静态名称，函数属性像 name、length、call 不能被用来定义 static 成员
  - TypeScript（和 JavaScript） 并没有名为静态类（static class）的结构
  - 类静态块
    - 态块允许你写一系列有自己作用域的语句，也可以获取类里的私有字段
class Foo {
    static #count = 0;
 
    get count() {
        return Foo.#count;
    }
 
    static {
        try {
            const lastInstances = loadLastInstances();
            Foo.#count += lastInstances.length;
        }
        catch {}
    }
}
- 泛型类（Generic Classes）
  - 类跟接口一样，也可以写泛型。当使用 new 实例化一个泛型类，它的类型参数的推断跟函数调用是同样的方式：
class Box<Type> {
  contents: Type;
  constructor(value: Type) {
    this.contents = value;
  }
}
 
const b = new Box("hello!");
// const b: Box<string>
    - 类跟接口一样也可以使用泛型约束以及默认值
  - 静态成员中的类型参数
//error
class Box<Type> {
  static defaultValue: Type;
        // Static members cannot reference class type parameters.
}
    - 解析：类型会被完全抹除，运行时，只有一个 Box.defaultValue 属性槽。这也意味着如果设置 Box<string>.defaultValue 是可以的话，这也会改变 Box<number>.defaultValue，而这样是不好的。
    - 泛型类的静态成员不应该引用类的类型参数
- 类运行时的 this
class MyClass {
  name = "MyClass";
  getName() {
    return this.name;
  }
}
const c = new MyClass();
const obj = {
  name: "obj",
  getName: c.getName,
};
 
// Prints "obj", not "MyClass"
console.log(obj.getName());
  - 解析：认情况下，函数中 this 的值取决于函数是如何被调用的。在这个例子中，因为函数通过 obj 被调用，所以 this 的值是 obj
  - 箭头函数
    - 防止函数调用时丢失上下文
class MyClass {
  name = "MyClass";
  getName = () => {
    return this.name;
  };
}
const c = new MyClass();
const g = c.getName;
// Prints "MyClass" instead of crashing
console.log(g());
  - This 参数
    - 在 TypeScript 方法或者函数的定义中，第一个参数且名字为 this 有特殊的含义。该参数会在编译的时候被抹除：
// TypeScript input with 'this' parameter
function fn(this: SomeType, x: number) {
  /* ... */
}

// JavaScript output
function fn(x) {
  /* ... */
}
    - TypeScript 会检查一个有 this 参数的函数在调用时是否有一个正确的上下文
class MyClass {
  name = "MyClass";
  getName(this: MyClass) {
    return this.name;
  }
}
const c = new MyClass();
// OK
c.getName();
 
// Error, would crash
const g = c.getName;
console.log(g());
// The 'this' context of type 'void' is not assignable to method's 'this' of type 'MyClass'.
  - 
- This 类型
  - 在类中，有一个特殊的名为 this 的类型，会动态的引用当前类的类型，用法：
class Box {
  contents: string = "";
  set(value: string) {
        // (method) Box.set(value: string): this
    this.contents = value;
    return this;
  }
}
  - 可以在参数类型注解中使用this：
class Box {
  content: string = "";
  sameAs(other: this) {
    return other.content === this.content;
  }
}
  - 基于 this 的类型保护
  - 使用 this is Type 。当搭配使用类型收窄 (举个例子，if 语句)，目标对象的类型会被收窄为更具体的 Type：（难理解）
class FileSystemObject {
  isFile(): this is FileRep {
    return this instanceof FileRep;
  }
  isDirectory(): this is Directory {
    return this instanceof Directory;
  }
  isNetworked(): this is Networked & this {
    return this.networked;
  }
  constructor(public path: string, private networked: boolean) {}
}
 
class FileRep extends FileSystemObject {
  constructor(path: string, public content: string) {
    super(path, false);
  }
}
 
class Directory extends FileSystemObject {
  children: FileSystemObject[];
}
 
interface Networked {
  host: string;
}
 
const fso: FileSystemObject = new FileRep("foo/bar.txt", "foo");
 
if (fso.isFile()) {
  fso.content;
  // const fso: FileRep
} else if (fso.isDirectory()) {
  fso.children;
  // const fso: Directory
} else if (fso.isNetworked()) {
  fso.host;
  // const fso: Networked & FileSystemObject
}
- 参考属性
  - TypeScript 提供了特殊的语法，可以把一个构造函数参数转成一个同名同值的类属性。以通过在构造函数参数前添加一个可见性修饰符 public private protected 或者 readonly 来创建参数属性，最后这些类属性字段也会得到这些修饰符：
class Params {
  constructor(
    public readonly x: number,
    protected y: number,
    private z: number
  ) {
    // No body necessary
  }
}
const a = new Params(1, 2, 3);
console.log(a.x);
// (property) Params.x: number

console.log(a.z);
// Property 'z' is private and only accessible within class 'Params'.
- 类表达式（Class Expressions）
  - 类表达式跟类声明非常类似，唯一不同的是类表达式不需要一个名字
const someClass = class<Type> {
  content: Type;
  constructor(value: Type) {
    this.content = value;
  }
};
 
const m = new someClass("Hello, world");  
// const m: someClass<string>
- 抽象类和成员（abstract Class and Members）
  - TypeScript 中，类、方法、字段都可以是抽象的（abstract）
  - 抽象方法或者抽象字段是不提供实现的。这些成员必须存在在一个抽象类中，这个抽象类也不能直接被实例化
  - 抽象类的作用是作为子类的基类，让子类实现所有的抽象成员。当一个类没有任何抽象成员，他就会被认为是具体的（concrete）
- 抽象构造签名（Abstract Construct Signatures）
abstract class Base {
  abstract getName(): string;
 
  printName() {
    console.log("Hello, " + this.getName());
  }
}
 
class Derived extends Base {
  getName() {
    return "world";
  }
}

//error
function greet(ctor: typeof Base) {
  const instance = new ctor();
        // Cannot create an instance of an abstract class.
  instance.printName();
}

//改
function greet(ctor: new () => Base) {
  const instance = new ctor();
  instance.printName();
}
greet(Derived);
greet(Base);

// Argument of type 'typeof Base' is not assignable to parameter of type 'new () => Base'.
// Cannot assign an abstract constructor type to a non-abstract constructor type.
  - 解析：现在 TypeScript 会正确的告诉你，哪一个类构造函数可以被调用，Derived 可以，因为它是具体的，而 Base 是不能的
- 类之间的关系
  - 两个类结构相等，可以用来替换彼此：
class Point1 {
  x = 0;
  y = 0;
}
 
class Point2 {
  x = 0;
  y = 0;
}
 
// OK
const p: Point1 = new Point2();
  - 类的子类型之间可以建立关系，即使没有明显的继承：
class Person {
  name: string;
  age: number;
}
 
class Employee {
  name: string;
  age: number;
  salary: number;
}
 
// OK
const p: Person = new Employee();
  - 空类没有任何成员。在一个结构化类型系统中，没有成员的类型通常是任何其他类型的父类型
2.9 模块（Modul）
- 模块
  - 任何包含了一个顶层 import 或者 export 的文件会被认为是一个模块
  - 模块会在它自己的作用域，而不是在全局作用域里执行，因此模块内的代码对模块外是不可见的，除非显式导出
- 非模块
  - 任何没有 export 或者顶层 await 的 JavaScript 文件都应该被认为是一个脚本，而非一个模块
  - 在一个脚本文件中，变量和类型会被声明在共享的全局作用域
  - 如果你有一个文件，现在没有任何 import 或者 export，但是你希望它被作为模块处理，添加这行代码：
export {}; //可解决vs code变量检查重复的问题
- TypeScript 中的模块
  - 在 TypeScript 中，当写一个基于模块的代码时，有三个主要的事情需要考虑：
    - 语法：我想导出或者导入该用什么语法？
    - 模块解析：模块名字（或路径）和硬盘文件之间的关系是什么样的？
    - 模块导出目标：导出的 JavaScript 模块长什么样？
  - ES 模块语法（ES Module Syntax）
    - 一个文件可以通过 export default 声明一个主要的导出：
// @filename: hello.ts
export default function helloWorld() {
  console.log("Hello, world!");
}
    - 然后用这种方式导入：
import hello from "./hello.js";
hello();
    - 也可直接使用 export 语法导出不止一个变量和函数，这些可以在其他文件通过 import 语法引入
  - 附加导入语法
    - 一个导入也可以使用类似于 import {old as new} 的格式被重命名：
import { pi as π } from "./maths.js";
 
console.log(π);
// (alias) var π: number
// import π
    - 可以接受所有的导出对象，然后使用 * as name 把它们放入一个单独的命名空间：
// @filename: app.ts
import * as math from "./maths.js";
 
console.log(math.pi);
const positivePhi = math.absolute(math.phi);

// const positivePhi: number
  - TS 具体的 ES 模块语法
    - 类型可以像 JavaScript 值那样，使用相同的语法被导出和导入：
// @filename: animal.ts
export type Cat = { breed: string; yearOfBirth: number };
 
export interface Dog {
  breeds: string[];
  yearOfBirth: number;
}
 
// @filename: app.ts
import { Cat, Dog } from "./animal.js";
type Animals = Cat | Dog;
    - TS 在两个方面拓展了 import 语法，方便类型导入：
      - 导入类型
// @filename: animal.ts
export type Cat = { breed: string; yearOfBirth: number };
// 'createCatName' cannot be used as a value because it was imported using 'import type'.
export type Dog = { breeds: string[]; yearOfBirth: number };
export const createCatName = () => "fluffy";
 
// @filename: valid.ts
import type { Cat, Dog } from "./animal.js";
export type Animals = Cat | Dog;
 
// @filename: app.ts
import type { createCatName } from "./animal.js";
const name = createCatName();
      - 内置类型导入
        - 需要使用 type 前缀 ，表明被导入的是一个类型：
// @filename: app.ts
import { createCatName, type Cat, type Dog } from "./animal.js";
 
export type Animals = Cat | Dog;
const name = createCatName();
      - 导入类型和内置类型导入的区别在于一个是导入语法，一个是仅仅导入类型
      - 
  - CommonJS语法
    CommonJS 是 npm 大部分模块的格式
    - 导出
      - 通过设置全局 module 的 exports 属性，导出标识符：
function absolute(num: number) {
  if (num < 0) return num * -1;
  return num;
}
 
module.exports = {
  pi: 3.14,
  squareTwo: 1.41,
  phi: 1.61,
  absolute,
};
      - 这些文件可以通过一个 require 语句导入：
const maths = require("maths");
maths.pi;
// any
  - CommonJS 和 ES 模块互操作
    - 因为默认导出和模块声明空间对象导出的差异，CommonJS 和 ES 模块不是很合适一起使用。TypeScript 有一个 esModuleInterop 编译选项可以减少两种规范之间的冲突
  - TS 模块解析选项
    - 模块解析是从 import 或者 require 语句中取出字符串，然后决定字符指向的是哪个文件的过程
    - TypeScript 包含两个解析策略，Classic 和 Node：
      - Classic，当编译选项 module 不是 commonjs 时的默认选择，包含了向后兼容
      - Node 策略则复制了 CommonJS 模式下 Nodejs 的运行方式，会对 .ts 和 .d.ts 有额外的检查
  - TS 模块输出选项
    有两个选项可以影响 JavaScript 输出的文件：
      - target ，决定了哪些 JS 特性会被降级（被转换成可以在更老的 JavaScript 运行环境使用），哪些则完整保留。使用哪个 target 取决于你期望代码运行的环境
      - module ，决定了转换后代码采用的模块规范。决定了模块之间通信使用哪一种规范。在运行时，模块加载器会在执行模块之前，查找并执行这个模块所有的依赖
  - TS 命名空间
    - TS自己的模块格式，名为 namespace，虽然没有被弃用，但是由于 ES 模块已经拥有了命名空间的大部分特性，因此更推荐使用 ES 模块，这样才能与 JavaScript 的（发展）方向保持一致
  
