1.3 Object（对象）：基础知识
1.3.1 对象
- 对象，用来存储键值对和更复杂的实体，对象的名字很像一个“指针”
- 创建对象示例：
let user = new Object(); // “构造函数” 的语法
let user = {};  // “字面量” 的语法
- 可以随时添加(user.isAdmin = true)、删除(delete 操作符)和读取属性
- 键是一个字符串，属性的值可以是任意类型
- 可以用多字词语来作为属性名，但必须给它们加上引号，例如："likes birds": true
- 列表中的最后一个属性应以逗号结尾，尾随逗号让所有行保持一致，方便属性增、删和移动
- 方括号：
  - 对于多词属性，点操作就不能用，可以使用方括号来设置、访问、删除属性。示例：
let user = {};

// 设置
user["likes birds"] = true;

// 读取
alert(user["likes birds"]); // true

// 删除
delete user["likes birds"];
  - 方括号中的字符串要放在引号中，单引号或双引号都可以
  - 方括号同样提供了一种可以通过任意表达式来获取属性名的方式，示例：
let key = "likes birds";

// 跟 user["likes birds"] = true; 一样
user[key] = true; //变量 key 可以是程序运行时计算得到， . 运算符不能
  - 计算属性，示例：
let fruit = prompt("Which fruit to buy?", "apple");

let bag = {
  [fruit]: 5, // 属性名是从 fruit 变量中得到的
};

alert( bag.apple ); // 5 如果 fruit="apple"
  - 何时用，方括号比点符号更强大，它允许任何属性名和变量，但写起来也更加麻烦。当属性名是已知且简单的时候，就使用点符号
- 属性值简写，使用已存在的变量当作对象属性，简写和正常写可以混用，示例：
function makeUser(name, age) {
  return {
    name: name,
    age: age,
    /*
    //可简写为：
    name,
    age,
    */
  };
}

let user = makeUser("John", 30);
alert(user.name); // John
- 属性命名没有限制。属性名可以是任何字符串或者 symbol，其他类型会被自动地转换为字符串
- 属性存在性测试，in 操作符
  - Js 中，能够被访问任何属性，即使属性不存在也不会报错，读取不存在的属性只会得到 undefined
  - 直接将属性值与 undefined 判断严格等有bug，可能该属性值本来就为 undefined，所以引入 in 操作符
  - in 的左边必须是 属性名，通常是一个带引号的字符串。如果我们省略引号，就意味着左边是一个变量，它应该包含要判断的实际属性名
- for..in 循环
  - 作用：用来遍历对象中的属性
  - 语法：for (let key in object) {}，和 for( ; ; )完全不一样
- 对象中属性的排序规则：
  - 整数属性会被进行排序，其他属性则按照创建的顺序显示
  - 整数属性，“整数属性”指的是一个可以在不做任何更改的情况下与一个整数进行相互转换的字符串
  - 为了解决整数属性自动排序的问题，我们可以在属性 key值前使用 +，来欺骗程序（字符串能转到数，但是数转回来 + 会消失）
- 对象是具有一些特殊特性的关联数组

1.3.2 对象的引用和复制
- 对象与原始类型的根本区别之一是，对象是“通过引用”（被复制对象存储赋值对象在内存中的地址，在内存中只存储了一份对象）存储和复制的，而原始类型：字符串、数字、布尔值等 —— 总是“作为一个整体”复制

- 通过引用来比较，仅当两个对象为同一对象时，两者才相等
- 克隆与合并，Object.assign
  - 语法：Object.assign(dest, [src1, src2, src3...])
    - 第一个参数 dest 是指目标对象
    - 更后面的参数 src1, ..., srcN（可按需传递多个参数）是源对象
    - 该方法将所有源对象的属性拷贝到目标对象 dest 中
    - 调用结果返回 dest
  - 如果被拷贝的属性的属性名已经存在，那么它会被覆盖
  - 可以用 Object.assign 代替 for..in 循环来进行简单克隆

- 深度克隆，若对象中嵌套了其他对象，使用 Object.assign 只会简单的对内存对象以引用的形式拷贝，两个引用指向同一片内存，有现成的深度克隆函数（类比c/c++深浅拷贝理解）
- 使用 const 声明的对象也是可以被修改的，cosnt user = { name: "John"}; user的值是一个常量，它必须始终引用同一个对象，但该对象的属性可以被自由修改，只有当我们尝试将 user=... 作为一个整体进行赋值时，const user 才会报错

1.3.3 垃圾回收
- JavaScript 的内存管理是自动的、无形的
-  可达性（reachability）
  - 内存管理概念，“可达”值是那些以某种方式可访问或可用的值，它们一定是存储在内存中的
- 在 js 引擎中有一个垃圾回收器，监控所有对象的状态，并删除掉那些已经不可达的

1.3.4 对象方法，"this"
- this 的值就是在点之前的这个对象，即调用该方法的对象
- this 不受限制，js 中this 可以用于任何函数，即使它不是对象的方法。this 的值是在调用的时候计算出来的。示例：
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert( this.name );
}

// 在两个对象中使用相同的函数
user.f = sayHi;
admin.f = sayHi;

// 这两个调用有不同的 this 值
// 函数内部的 "this" 是“点符号前面”的那个对象
user.f(); // John（this == user）
admin.f(); // Admin（this == admin）

admin['f'](); // Admin（使用点符号或方括号语法来访问这个方法，都没有关系。）

- this 是属于对象方法的，在没有对象的情况下调用：this == undefined
- 箭头函数没有自己的 “this”

1.3.5 构造器和操作符 “new”
- 构造函数，简称构造器
  - 在技术上是常规函数
  - 命名以大写字母开头，首字母大写
  - 只能由 "new" 操作符来执行
  - 当一个函数被使用 new 操作符执行时，它按照以下步骤：
    - 一个新的空对象被创建并分配给 this
    - 函数体执行。通常它会修改 this，为其添加新的属性
    - 返回 this 的值
    - 示例：
function User(name) {
  // this = {};（隐式创建）

  // 添加属性到 this
  this.name = name;
  this.isAdmin = false;

  // return this;（隐式返回）
}

let user = new User("Jack");

alert(user.name); // Jack
alert(user.isAdmin); // false
  - 任何函数（约定，首字母大写）都可以用作构造器，除了箭头函数，它没有自己的 this 
  - 如果没有参数，可以省略 new 后的括号（坏风格）

1.3.6 可选衔 "?."
- 可选链 ?. 是一种访问嵌套对象属性(优雅，避免报错)的安全的方式。即使中间的属性不存在，也不会出现错误
- 如果可选链 ?. 前面的值为 undefined 或者 null，它会停止运算并返回 undefined
- 语法value?.prop:
  - 如果 value 存在，则结果与 value.prop 相同
  - 否则（当 value 为 undefined/null 时）则返回 undefined
- ?. 语法使其前面的值成为可选值，但不会对其后面的起作用，在 user?.address.street.name 中，?. 允许 user 为 null/undefined（在这种情况下会返回 undefined）也不会报错，但这仅对于 user
- ?. 前的变量必须已声明
- 短路效应，如果 ?. 左边部分不存在，就会立即停止运算
- 其他变体：?.()，?.[]，可选链不是一个运算符，而是一个特殊的语法结构
- 可以使用 ?. 来安全地读取或删除，但不能写入

1.3.6 symbol 类型
- 只有两种原始类型可以作为对象属性键：字符串类型 和 symbol 类型
- symbol 是带有可选描述的“原始唯一值”，示例：
let id1 = Symbol("id");
let id2 = Symbol("id");
//即使描述相同，它们的值也不相同
alert(id1 == id2); // false
- symbol 不会被自动转换为字符串，所以使用 alert(id = Symbol("id"))会报错
- “隐藏属性”，symbol 允许我们创建对象的“隐藏”属性，代码的任何其他部分都不能意外访问或重写这些属性
- 对象字面量中的 symbol，要在对象字面量 {...} 中使用 symbol，则需要使用方括号把它括起来 [id]: 123 // 而不是 "id": 123
- symble 在 for...in 中会被跳过
- Object.assign 会同时复制字符串和 symbol 属性
- 注册表内的 symbol 被称为 全局 symbol，用 Symbol.for(key) 查找或创建，达到使用相同symble的目的。代码示例：
// 从全局注册表中读取
let id = Symbol.for("id"); // 如果该 symbol 不存在，则创建它

// 再次读取（可能是在代码中的另一个位置）
let idAgain = Symbol.for("id");

// 相同的 symbol
alert( id === idAgain ); // true
- Symbol.keyFor 通过全局 symbol 返回一个名字，Symbol.keyFor 内部使用全局 symbol 注册表来查找 symbol 的键。所以它不适用于非全局 symbol。如果 symbol 不是全局的，它将无法找到它并返回 undefined

- 系统 symbol，使用它们来微调对象的各个方面
- 总结：
[Image]

1.3.7 对象 -- 原始值转换
- JavaScript 不允许自定义运算符对对象的处理方式
- 转换规则：
  - 没有转换为布尔值。所有的对象在布尔上下文（context）中均为 true，就这么简单。只有字符串和数字转换
  - 数字转换发生在对象相减或应用数学函数时
  - 至于字符串转换 —— 通常发生在我们像 alert(obj) 这样输出一个对象和类似的上下文中
- 转换可以返回任何原始类型， Symbol.toPrimitive 和 valueOf，toString这些方法必须返回一个原始值，而不是对象
- 总结：
[Image]

1.4 原型， 继承
1.4.1 原型，继承
- 属性 [[Prototype]] 是内部的而且是隐藏的，但是这儿有很多设置它的方式。
其中之一就是使用特殊的名字  __proto__来指定父类
- 原型链的两个限制：
  - 引用不能形成闭环
  - __proto__ 的值可以是对象，也可以是 null。而其他的类型都会被忽略
- 写入不使用原型，原型仅用于读取属性，对于写入/删除操作可以直接在对象上进行
- This 的值，根本不受原型的影响。无论在哪里找到方法：在一个对象还是在原型中。在一个方法调用中，this 始终是点符号 . 前面的对象
- for..in 循环也会迭代继承的属性，如果这不是我们想要的，并且我们想排除继承的属性，那么这儿有一个内建方法 obj.hasOwnProperty(key)，过滤继承的属性
- 几乎所有其他键/值获取方法都忽略继承的属性
- 所有 delete 操作都直接应用于对象本身，不会作用于该对象的原型链
- 总结：
[Image]

1.4.2 F.prototype
- F.prototype 指的是 F（func） 的一个名为 "prototype" 的常规属性，该属性是一个对象
- F.prototype：在 JavaScript 中，每个函数（Function）都有一个特殊的属性叫做 prototype。当你用函数声明创建一个函数时，它会自动获得一个 prototype 属性，这个属性是一个指向一个对象的引用。这个对象（constructor）被称为构造函数的原型（prototype）。在构造函数中添加到 prototype 上的属性和方法将会在实例化对象时被共享
- [[prototype]]：对象在 JavaScript 中通过一个内部属性 [[prototype]]（也可以用__proto__访问）来链接到另一个对象，形成了一个原型链。每个对象都有一个 [[prototype]]，指向它的原型对象。原型链是一系列对象之间的链接，通过原型链，一个对象可以访问其原型对象的属性和方法
- F.prototype 的值要么是一个对象，要么就是 null，其他值都不起作用
- 总结：
[Image]