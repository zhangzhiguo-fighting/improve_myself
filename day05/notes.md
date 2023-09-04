1. The Modern JavaScript Tutorial
1.1 简介
- JavaScript 和 Java 有很大的区别，脚本被以纯文本的形式提供和执行，不需要特殊的准备或编译即可运行
- 引擎工作原理：（理解：引擎类似编译器，还可以优化流程、监视脚本运行、分析脚本的数据）
  1. 引擎（如果是浏览器，则引擎被嵌入在其中）读取（“解析”）脚本
  2. 引擎将脚本转化（“编译”）为机器语言
  3. 机器代码快速地执行
- JS的能力很大程度取决于它运行的环境，如node.js 和 浏览器
- 有很多其他的语言可以被“编译”成 JavaScript，这些语言还提供了更多的功能，如TS相较于JS添加了“严格的数据类型”以方便更好地支持复杂系统开发
- 浏览器提供的开发者工具允许我们查看错误、执行命令、检查变量等

1.2 JavaScript 基础知识
- Node.js 是一个基于 Chrome V8引擎的 JavaScript 后端运行环境 ，使用了一个事件驱动的模型，使其轻量高效，非阻塞 I/O，带来高并发的优点
- npm(全称Node PackageManager，即node包管理器)是Node.js默认的、使用npm来分享和使用代码
- 可以使用一个 <script> 标签将 JavaScript 代码添加到页面中
- 使用 script 标签的 src 特性使用外部脚本的注意事项：
  - 如果使用了 src 特性， script标签内容将会被忽略
  - 一般来说，只有最简单的脚本才嵌入到 HTML 中，更复杂的脚本存放在单独的文件中
  - 使用独立文件的好处是浏览器会下载它，然后将它保存到浏览器的缓存中。之后，其他页面想要相同的脚本就会从缓存中获取，而不是下载它。所以文件实际上只会下载一次。这可以节省流量，并使得页面（加载）更快

1.2.1 代码结构
- 分号可以用来分割语句，若存在换行符不要分号也可，把换行符理解为“隐式”的分号；不加分号容易出错，最好加上
- 注释的快捷键，单行 Ctrl+/ 多行Ctrl + Shift + /，mac Ctrl换cmd，Shift换opt

1.2.2 现代模式，"use strict"
- "use strict";启用严格模式的指令，必须放整个脚本文件的开头，整个脚本都以现代模式工作，没办法取消"use strict";
- 浏览器中的开发者控制台是默认不启动use strict，现代 JavaScript 支持 “class” 和 “module” —— 高级语言结构，它们会自动启用 use strict，使用它们则无需添加 "use strict" 指令

1.2.3 变量
- js中使用let创建（也可称为声明或者定义）变量
- 变量命名：
  - 变量名称必须仅包含字母、数字、符号 $ 和 _
  - 首字符必须非数字
  - 驼峰命名法，单词一个接一个，除了第一个单词，其他的每个单词都以大写字母开头
  - 区分大小写，允许非英文字母（不推荐）
- 使用const创建一个常量，使用大写字母和下划线来命名这些常量，常量一个普遍的用法是给已知的难记住的值取别名，通常用大写字母表示“硬编码（hard-coded）”的常量。或者，换句话说就是，当值在执行之前或在被写入代码的时候，我们就知道值是什么了

1.2.4 数据类型
- 可以将任何类型的值存入变量。例如，一个变量可以在前一刻是个字符串，下一刻就存储一个数字；允许这种操作的编程语言，例如 JavaScript，被称为“动态类型”（dynamically typed）的编程语言，意思是虽然编程语言中有不同的数据类型，但是你定义的变量并不会在定义后，被限制为某一数据类型
- Number 类型：
  - number 类型代表整数和浮点数，数字可进行运算
  - “number” 类型无法安全地表示大于 (2^53-1)（即 9007199254740991），或小于 -(2^53-1) 的整数
  - 除了常规的数字，还包括所谓的“特殊数值（“special numeric values”）”也属于这种类型：Infinity、-Infinity 和 NaN
    - NaN 代表一个计算错误。它是一个不正确的或者一个未定义的数学操作所得到的结果
    - NaN 是粘性的。任何对 NaN 的进一步数学运算都会返回 NaN
  - js 中数学运算是安全的：
    - 可以做任何事：除以 0，将非数字字符串视为数字，等等
    - 脚本永远不会因为一个致命的错误（“死亡”）而停止。最坏的情况下，会得到 NaN 的结果
- BIgInt 类型
  - 用于表示任意长度的整数，可以通过将 n 附加到整数字段的末尾来创建 BigInt 值。例如：
// 尾部的 "n" 表示这是一个 BigInt 类型
const bigInt = 1234567890123456789012345678901234567890n;
- String 类型
  - 反引号是功能扩展引号，允许我们通过将变量和表达式包装在 ${…}中，来将它们嵌入到字符串中。例如：
let name = "John";

// 嵌入一个变量
alert( `Hello, ${name}!` ); // Hello, John!

// 嵌入一个表达式
alert( `the result is ${1 + 2}` ); // the result is 3
  - ${…} 内的表达式会被计算，计算结果会成为字符串的一部分；${…} 内放置任何东西
  - 没有char类型，一个 string 字符串类型可以包含零个（为空）、一个或多个字符
- Boolean 类型
  - boolean 类型仅包含两个值：true 和 false
- null 值
  - null 是一种独立的类型，js 中的 null 仅仅是一个代表“无”、“空”或“值未知”的特殊值
- Undefine 值
  - 通常，使用 null 将一个“空”或者“未知”的值写入变量中，而 undefined 则保留作为未进行初始化的事物的默认初始值
- Object 类型和 Symbol 类型
  - 其他所有的数据类型都被称为“原始类型”，因为它们的值只包含一个单独的内容（字符串、数字或者其他）。相反，object 则用于储存数据集合和更复杂的实体
  - symbol 类型用于创建对象的唯一标识符
- Typeof 运算符
  - typeof 运算符返回参数的类型。例如：
typeof alert // "function"
typeof Symbol("id") // "symbol"
typeof 10n // "bigint"
  - Typeof 是一个操作符，不是一个函数，typeof(x)与typeof x相同，括号为数学运算分组的括号

1.2.5 交互：alert、prompt 和 confirm
- alert, prompt, confirm是浏览器和用户交互的函数
- alert:
  - 弹出的这个带有信息的小窗口被称为 模态窗。“modal” 意味着用户不能与页面的其他部分进行交互，直到他们处理完窗口。例如：
alert("Hello");
- prompt:
  - 浏览器会显示一个带有文本消息的模态窗口，还有 input 框和确定/取消按钮
result = prompt(title, [default]);
//tile 现实给用户的文本
//default 可选的第二个参数，指定 input 框的初始值
//[]表示可选参数
  - prompt 将返回用户在 input 框内输入的文本，如果用户取消了输入，则返回 null。
- Confirm
  - confirm 函数显示一个带有 question 以及确定和取消两个按钮的模态窗口，点击确定返回 true，点击取消返回 false。
result = confirm(question);
1.2.6 类型转换
- 字符串转换
  - alert 会将变量变换成字符型并输出
  - 使用string(X)将其他变量显式转化为所期待的字符串类型
- 数字型转换
  - 算术函数和表达式中，会自动进行 number 类型转换。例如：
alert( "6" / "2" ); // 3, string 类型的值被自动转换成 number 类型后进行计算
  - number(x) 显式转换规则：
值
变成...
undefined
NaN
null
0
true 和 false
1 and 0
string
去掉首尾空白字符（空格、换行符 \n、制表符 \t等）后的纯数字字符串中含有的数字。如果剩余字符串为空，则转换结果为 0。否则，将会从剩余字符串中“读取”数字。当类型转换出现 error 时返回 NaN
  注意：null 和 undefined 在这有点不同：null 变成数字 0，undefined 变成 NaN
- 布尔型转换
  - 逻辑运算中发生转换
  - 转换规则：
    - 直观上为“空”的值（如 0、空字符串、null、undefined 和 NaN）将变为 false
    - 其他值变成 true

1.2.7 基础运算符，数学运算
- 数学运算
  - 求幂 **，例如：求幂运算 a ** b 表示将 a 提升至 a 的 b 次幂，幂运算也适用于非整数
- 使用二元运算符 + 连接字符串
  - 只要任意一个运算元是字符串，那么另一个运算元也将被转化为字符串
  - 运算符是按顺序工作的：
alert(2 + 2 + '1' ); // "41"，不是 "221"

alert('1' + 2 + 2); // "122"，不是 "14"
- 数字转化，一元运算符 +
  - 加号 + 应用于单个值，对数字没有任何作用。但是如果运算元不是数字，加号 + 则会将其转化为数字，效果和number差不多，但是更加简短
- 运算符优先级，单目 >  双目 > 赋值号
- 赋值运算符 = 
  - 在 JavaScript 中，所有运算符都会返回一个值，例如：语句 x = value 将值 value 写入 x 然后返回 value
  - 链式赋值，a = b = c = 2 + 2; 为了可读性，拆开写
- 原地修改，例如：n += 5等操作
- 自增/自减
- 位运算：
位运算符把运算元当做 32 位整数，并在它们的二进制表现形式上操作。
- 按位与 ( & )
- 按位或 ( | )
- 按位异或 ( ^ )
- 按位非 ( ~ )
- 左移 ( << )
- 右移 ( >> )
- 无符号右移 ( >>> )
- 逗号运算符，逗号运算符能让我们处理多个表达式，使用 , 将它们分开。每个表达式都运行了，但是只有最后一个的结果会被返回。例如：
let a = (1 + 2, 3 + 4);

alert( a ); // 7（3 + 4 的结果）

1.2.8 值比较
- 所有比较运算符均返回布尔值
- 字符串比较，按字典序逐字进行比较
- 不同类型间的比较，当对不同类型的值进行比较时，JavaScript 会首先将其转化为数字（number）再判定大小
- 严格相等
  - 普通的相等性检查 == 存在一个问题，它不能区分出 0 和 false，也同样无法区分空字符串和 false（不同类型比较，会被转换为number）
  - 严格相等运算符 === 在进行比较时不会做任何的类型转换，与“不相等”符号 != 类似，“严格不相等”表示为 !==
- 对 null 和 undefined 进行比较：
  - 当使用严格相等 === 比较二者时，结果为 false
  - 当使用非严格相等 == 比较二者时，结果为true
  - 当使用数学式或其他比较方法 < > <= >= 时，null/undefined 会被转化为数字：null 被转化为 0，undefined被转化为 NaN
- null vs 0:
  - 相等性检查 == 和普通比较符 > < >= <= 的代码逻辑是相互独立的
  - null只和undefined相等
alert( null > 0 );  // (1) false 进行值比较时，null会被转化为数字0
alert( null == 0 ); // (2) false null只和undefined相等
alert( null >= 0 ); // (3) true
- 特立独行的 undefined，undefined不应该与其他值进行比较，进行值比较时会被转化为 NaN
- 避免问题
  - 除了严格相等 === 外，其他但凡是有 undefined/null 参与的比较，都需要格外小心
  - 除非你非常清楚自己在做什么，否则永远不要使用 >= > < <= 去比较一个可能为null/undefined 的变量。对于取值可能是 null/undefined 的变量，请按需要分别检查它的取值情况

1.2.9 条件分支：if 和 '?'
- 建议每次使用 if 语句都用大括号 {} 来包装代码块，即使只有一条语句
- '?' 支持三元运算符
- 多个 `?`，例如：
let age = prompt('age?', 18);

let message = (age < 3) ? 'Hi, baby!' :
  (age < 18) ? 'Hello!' :
  (age < 100) ? 'Greetings!' :
  'What an unusual age!';

alert( message );
//注意代码的书写格式，增加可读性

1.2.10 逻辑运算符
- avaScript 中有四个逻辑运算符：||（或），&&（与），!（非），??（空值合并运算符）
- 或运算符
  - 一个或运算 || 的链，将返回第一个真值，如果不存在真值，就返回该链的最后一个值
    - 获取变量列表或者表达式中的第一个真值
    - 短路求值（Short-circuit evaluation）
- 与运算符
  - 与运算寻求第一个假值，与运算返回第一个假值，如果没有假值就返回最后一个值
  - 与运算 && 的优先级比或运算 || 要高
- 非运算符
  - 将操作数转化为布尔类型：true/false
  - 返回相反的值
  - 两个非运算 !! 有时候用来将某个值转化为布尔类型
  - 非运算符 ! 的优先级在所有逻辑运算符里面最高

1.2.11 空值合并运算符 ??
- 当一个值既不是 null 也不是 undefined 时，我们将其称为“已定义的（defined）”
- a ?? b一种获得两者中的第一个“已定义的”值的不错的语法
- ?? 与 ||的区别：
  - || 返回第一个 真 值，不能区分 false、0、空字符串和null/underfined
  - ?? 返回第一个 已定义的 值
- ?? 运算符的优先级与 || 相同
- 出于安全原因，JavaScript 禁止将 ?? 运算符与 && 和 || 运算符一起使用，除非使用括号明确指定了优先级

1.2.11 循环：while 和 for
- 循环体的单次执行叫作 一次迭代
- for 循环的任何语句段都可以被省略
- for 的两个 ; 必须存在，否则会出现语法错误
- Continue 指令利于减少嵌套
- 注意：非表达式的语法结构不能与三元运算符 ? 一起使用，禁止 break/continue 在?的右边
- break/continue 标签
  - 用来解决问题，需要一次从多层嵌套的循环中跳出来
  - 标签 是在循环之前带有冒号的标识符，使用 continue/break + 标签 可以跳转到标签处，标签必须位于跳转代码之前

1.2.12 "switch" 语句
- switch 语句可以替代多个 if 判断
- switch 语句为多分支选择的情况提供了一个更具描述性的方式
- switch 语句有至少一个 case 代码块和一个可选的 default 代码块
- 如果没有 break，程序将不经过任何检查就会继续执行下一个 case
- 任何表达式都可以成为 switch/case 的参数
- 匹配时的相等时严格相等===，类型很关键

1.2.13 函数
- 函数声明，function 关键字首先出现，然后是 函数名，然后是括号之间的 参数 列表，最后是花括号之间的代码（即“函数体”）
- 如果在函数内部声明了同名变量，那么函数会 遮蔽 外部变量（就近原则）
- 参数的默认值：
  - 一个函数被调用，但有参数（argument）未被提供，那么相应的值就会变成 undefined
  - 可以使用 = 为函数声明中的参数指定所谓的“默认”（如果对应参数的值未被传递则使用）值
  - 示例：
function showMessage(from, text = anotherFunction()) {
  // anotherFunction() 仅在没有给定 text 时执行
  // 其运行结果将成为 text 的值
}
- 可以通过参数与undefined严格相等，逻辑与，空值合并运算，来检查参数
- 返回值：
  - 只使用 return 但没有返回值也是可行的，但这会导致函数立即退出
  - 注意：空值的 return 或没有 return 的函数返回值为 undefined
  - return(长表达式)，不能将 return 和 长表达式 分开写成两行，因为 js 会默认给 return 后补上分号
- 函数命名：
  - 函数名应该清楚地描述函数的功能
  - 一个函数是一个行为，所以函数名通常是动词
  - 目前有许多优秀的函数名前缀，如 create…、show…、get…、check… 等等

1.2.14 函数表达式
- 函数表达式，示例：
let sayHi = function() {alert( "Hello" );}; //注意函数体末尾大括号的分号，因为函数表达式在赋值语句中
//functin后面没有函数名，函数表达式允许省略函数名
- 无论函数是如何创建的，函数都是一个值，可以复制函数到其他变量
- 回调函数：
  - 将函数作为参数传递，例如：
// 根据用户的回答，调用不同的函数
function ask(question, yes, no) {
    if (confirm(question)) yes()
    else no();
}

function showOk() {
  alert( "You agreed." );
}

function showCancel() {
  alert( "You canceled the execution." );
}

// 用法：函数 showOk 和 showCancel 被作为参数传入到 ask
ask("Do you agree?", showOk, showCancel);
- 一个函数是表示“行为”的值，可以在变量之间传递
- 严格模式下，当一个函数声明在一个代码块内时，它在该代码块内的任何位置都是可见的。但在代码块外不可见
- 函数声明在声明它的代码块内任意位置都可用
- 函数声明和函数表达式的区别：
  - 如果函数在主代码流中被声明为单独的语句，则称为“函数声明”
  - 如果该函数是作为表达式的一部分创建的，则称其“函数表达式”
  - 在执行代码块之前，内部算法会先处理函数声明。所以函数声明在其被声明的代码块内的任何位置都是可见的
  - 函数表达式在执行流程到达时创建

1.2.15 箭头函数，基础知识
- 单行箭头函数，从 => 的左侧获取参数，计算并返回右侧表达式的计算结果，(...args) => expression示例：
let sum = (a, b) => a + b;

/* 这个箭头函数是下面这个函数的更短的版本：
let sum = function(a, b) {
  return a + b;
};*/
alert( sum(1, 2) ); // 3
- 多行的箭头函数，需要显示添加 return , (...args) => { body }示例：
let sum = (a, b) => {  // 花括号表示开始一个多行函数
  let result = a + b;
  return result; // 如果我们使用了花括号，那么我们需要一个显式的 “return”
};

alert( sum(1, 2) ); // 3

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
- 使用 const 声明的对象也是可以被修改的，cosnt user = { name: "John"}; user的值是一个常量，它必须始终引用同一个对象，但该对象的属性可以被自由修改，只有当我们尝试将 user=... 作为一个整体进行赋值时，const user 才会报错（类比 c++ 中的指针常量和常量指针）

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

- Js 中除了箭头函数其他函数都有 this 的，在没有对象的情况下调用：this == undefined
- 箭头函数没有自己的 “this”

- this 的补充：
  - 全局对象
    - 指代词之前必须要有一个名词的主语，当test（）没头没有脑突然返回一个this.x时，这时候this指是默认的全局对象window（非严格摸一下，严格模式下 this 的值没有设置，会保持为 undefined），代码示例如下：
var x = 1;
function test() {
   console.log(this);
   return this;
}
console.log(test()===window); //true
console.log(x===window.x); //true
  - 变量赋值
    - 代码示例如下：
var x = 1;
function test() {
    console.log(this)
   console.log(this.x);
   }
var obj = {};
obj.x = 2;
obj.m = test;
fun=obj.m
console.log(fun())//这个this是哪个，this.x会显示1还是2呢？ 1
    - 解释：this指向“调用”函数的对象，因为赋值行为是fun变量指向obj.m这个内存块，没有调用这个函数，而fun()这个语句才是调用这个函数，所以以此语句this为准（在非严格模式下全局环境下的函数的this指向window）
  - 构造函数
    - 代码示例：
var x= 2;
function Test() {
　this.x = 1;
}

var obj = new Test();
    - 解释：当使用new时，对象的构造函数就会被调用，所以在赋值时test（）已经被调用了，此时this是新对象的this,新对象有一个属性x=1 故为this.x=1.
  - 事件调用
    - 代码示例：
btn.onclick = function() {
console.log(this);//this指向是buttn对象
    - 解释：赋值的时候并未调用函数，调用是当事件发生时，即onclick这个动作调用这个函数，onclick的定语是谁？所以这个答案就很清晰了：btn.，以此类推所有事件调用的函数，其this都指向事件的对象
  - 箭头函数中的 this
    - 箭头函数没有自己的this, 它的this是继承而来; 默认指向在定义它时所处的对象(宿主对象)
  - This 隐式丢失的五种情况
    - 隐式丢失就是指被隐式绑定的函数丢失了绑定对象，从而默认绑定到window
    - 1 因为将函数重新赋值导致的
      - 代码示例如下：
var a = 10;
function fn(){
        console.log(this.a);
}
var obj = {
        a:1,
        foo:fn
}
obj.foo();//this.a为1
var fn2 = obj.foo;
fn2();//this.a 为10
//这里也可以理解为
window.fn2();//赋值之后的调用对象变成了window，那么this的指向自然发生了改变
    - 2 因为参数传递造成的丢失
      - 代码示例如下：
var a = 0;
function foo(){
        console.log(this.a);
}
function bar(fn){
        fn();
}
var obj = {
        a:10,
        foo:foo
}
bar(obj.foo);//this.a = 0;
      - 解释：传参的时候未被调用，在bar中被调用，调用时fn()是作为一个独立的函数调用的，并没有绑定特定的上下文，fn()内部的 this 将指向全局对象 window 对象
    - 3 内置函数的调用
      - 代码示例：
var a = 10;
function foo(){
        console.log(this.a);//this.a = 10;
}
var obj = {
        a:0,
        foo:foo
}
settimeout(obj.foo,1000)
//内置函数的默认指向window
    - 4 间接调用
      - 代码示例：
var a = 10;
/* function foo(){
        console.log(this.a);
} */
var foo  = function(){
        console.log(this.a);
}
var obj = {
        a:0,
        foo:foo
}
var obj2 = {a:3}
obj.foo();//0
/* 立即调用执行 将函数直接赋值给了 obj2.foo并立即执行this指向改变 */
(obj2.foo = obj.foo)();//10
/* 赋值对象再次调用的时候。obj2.foo()this的指向指向了obj2 */
obj2.foo = obj.foo;
obj2.foo();//3
      - 解释：(obj2.foo = obj.foo)();立即调用的函数表达式使得函数作为一个独立函数调用，而不是作为 obj2 的方法调用。因此，在该函数内部，this 的指向是全局对象
    - 5 其他情况一般在框架中出现，一般写代码时不会出现
      - 代码示例：
var a = 10;
var obj = {
        a:0,
        foo:foo
}
function foo(){
        console.log(this.a);
}
/* 一般在框架里出现 */
(obj.foo = obj.foo)() //10
(false || obj.foo)()//10
(1,obj.foo)()//10
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

1.3.6 可选链 "?."
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
- 属性 [[Prototype]] 是内部的而且是隐藏的，但是有很多设置它的方式。其中之一就是使用特殊的名字  __proto__来指定父类
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
- F.prototype 指的是 F（func） 的一个名为 "prototype" 的常规属性，该属性是一个指向对象的引用
- F.prototype：在 JavaScript 中，每个函数（Function）都有一个特殊的属性叫做 prototype。当你用函数声明创建一个函数时，它会自动获得一个 prototype 属性，这个属性是一个指向一个对象的引用。这个对象（constructor）被称为构造函数的原型（prototype）。在构造函数中添加到 prototype 上的属性和方法将会在实例化对象时被共享
- [[prototype]]：对象在 JavaScript 中通过一个内部属性 [[prototype]]（也可以用__proto__访问）来链接到另一个对象，形成了一个原型链。每个对象都有一个 [[prototype]]，指向它的原型对象。原型链是一系列对象之间的链接，通过原型链，一个对象可以访问其原型对象的属性和方法
- F.prototype 的值要么是一个对象，要么就是 null，其他值都不起作用
- 总结：
[Image]

1.4.3 原生的原型
- Object.prototype，prototype为一个对象的引用，使用new + Object 创建的对象将以prototype指向的对象为原型（改变子对象的 [[prototype]] 属性），结构理解图：
[Image]

- 其他内建对象
  - 一切都从对象继承而来
  - 完整的示意图（3个内建对象），如下：
[Image]

- 基本数据类型
  - 字符串、数字和布尔值，它们并不是对象。但是如果我们试图访问它们的属性，那么临时包装器对象将会通过内建的构造器 String、Number 和 Boolean 被创建。它们提供给我们操作字符串、数字和布尔值的方法然后消失
  - 值 null 和 undefined 没有对象包装器

- 更改原生原型
  - 原生的原型是可以被修改的，可以向原生原型中添加方法，但是原型是全局的，所以很容易造成冲突
  - 在现代编程中，只有一种情况下允许修改原生原型。那就是 polyfilling

- 从原型中借用（引用或直接继承）
  - 从一个对象获取一个方法，并将其复制到另一个对象。一些原生原型的方法通常会被借用
  - 一个对象只能有一个父亲，当去继承另一个父类时，会覆盖原继承
- 总结：
[Image]

1.4.4 原型方法，没有__proto__的对象
- 使用 obj.__proto__ 设置或读取原型被认为已经过时且不推荐使用
- 现代的获取/设置原型的方法有：
  - Object.getPrototypeOf(obj) —— 返回对象 obj 的 [[Prototype]]
  - Object.setPrototypeOf(obj, proto) —— 将对象 obj 的 [[Prototype]] 设置为 proto
  - Object.create(proto, [descriptors]) —— 利用给定的 proto 作为 [[Prototype]] 和可选的属性描述来创建一个空对象
- Object.create 提供了一种简单的方式来浅拷贝对象及其所有属性描述符
  - 示例：
let clone = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
);
- 如果速度很重要，就请不要修改已存在的对象的 [[Prototype]]，如果修改会破坏 js 引擎对对象属性访问操作的内部优化

- “Very plain” objects
  - 使用 Object.create(null) 或 {__proto__: null} 创建的无原型的对象

- 总结：
[Image]

1.5 Class
1.5.1 类的基本语法
- class 语法
  - new 会自动调用 constructor() 方法，因此我们可以在 constructor() 中初始化对象
  - 类的方法之间没有逗号
  - 示例：
class User {

  constructor(name) {
    this.name = name;
  }

  sayHi() {
    alert(this.name);
  }

}

// 用法：
let user = new User("John");
user.sayHi();

// class 是一个函数
alert(typeof User); // function

//当 new User("John") 被调用
//1.一个新对象被创建
//2.constructor 使用给定的参数运行，并将其赋值给this.name,
// 然后可以调用对象的方法

- 什么是 class？
  - class User {...} 构造实际上做了如下的事：
    - 创建一个名为 User 的函数，该函数成为类声明的结果。该函数的代码来自于 constructor 方法（如果不编写这种方法，那么它就被假定为空）
    - 存储类中的方法，例如 User.prototype 中的 sayHi
    - 示图：
[Image]

- 不仅仅是语法糖
  - 以下定义的结果与使用类得到的结果基本相同：
// 用纯函数重写 class User

// 1. 创建构造器函数
function User(name) {
  this.name = name;
}
// 函数的原型（prototype）默认具有 "constructor" 属性，
// 所以，我们不需要创建它

// 2. 将方法添加到原型
User.prototype.sayHi = function() {
  alert(this.name);
};

// 用法：
let user = new User("John");
user.sayHi();
  - 但是上述代码与使用 class 有着重大差异
    - 通过 class 创建的函数具有特殊的内部属性标记 [[IsClassConstructor]]: true编程语言会在许多地方检查该属性
    - 大多数 JavaScript 引擎中的类构造器的字符串表示形式都以 “class…” 开头(普通对象是 [object Object])
    - 类方法不可枚举。 类定义将 "prototype" 中的所有方法的 enumerable 标志设置为 false,因为如果我们对一个对象调用 for..in 方法，我们通常不希望 class 方法出现
    - 类总是使用 use strict。 在类构造中的所有代码都将自动进入严格模式

- 类表达式
  - 就像函数一样，类可以在另外一个表达式中被定义，被传递，被返回，被赋值等
  - 如果类表达式有名字，那么该名字仅在类内部可见
  - 代码示例：
function makeClass(phrase) {
  // 声明一个类并返回它
  return class {
    sayHi() {
      alert(phrase);
    }
  };
}

// 创建一个新的类
let User = makeClass("Hello");

new User().sayHi(); // Hello

- getters/setters
  - 示例：
class User {

  constructor(name) {
    // 调用 setter
    this.name = name;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

}

let user = new User("John");
alert(user.name); // John

user = new User(""); // Name is too short.
  - 在构造函数中，通过 this.name = name; 来调用了 name 属性的 setter 方法。这是因为在构造函数内部，this.name 会被解释为调用 setter 方法，而不是直接访问属性

- 计算属性名称[...]
  - 示例：
class User {

  ['say' + 'Hi']() {
    alert("Hello");
  }

}

new User().sayHi();

- Class 字段
  - “类字段”是一种允许添加任何属性的语法
  - 类字段重要的不同之处在于，它们会在每个独立对象中被设好，而不是设在 User.prototype，类的方法是在prototype中
  - JavaScript 中的函数具有动态的 this。它取决于调用上下文

- 使用类字段制作绑定方法
  - 代码示例（this 丢失）：
class Button {
    constructor(value) {
      this.value = value;
    }
  
    click() {
      alert(this.value);
    }
    
    //改
    click = () => {
        alert(this.value);
    }
}
  let button = new Button("hello");
  
  setTimeout(button.click, 1000); // undefined
    - 解释：
      - 当调用 setTimeout(button.click, 1000) 时，button.click 被传递给了 setTimeout，并被作为一个独立函数调用。这导致了问题，因为类的方法在作为独立函数调用时，其内部 this 的指向会丢失。
      - 使用箭头函数解决该问题，箭头函数不会绑定自己的 this 值，而会继承外层作用域的 this 值。将 click() 方法改为箭头函数的方式，可以确保 this 在 click() 方法内部仍然指向 button 对象
  - 类字段 click = () => {...} 是基于每一个对象被创建的，在这里对于每一个 Button 对象都有一个独立的方法，在内部都有一个指向此对象的 this。我们可以把 button.click 传递到任何地方，而且 this 的值总是正确的

- 总结：
[Image]

1.5.2 类继承
- 扩展另一个类的语法是：class Child extends Parent
- 关键字 extends 使用了很好的旧的原型机制进行工作。它将 Rabbit.prototype.[[Prototype]] 设置为 Animal.prototype。所以，如果在 Rabbit.prototype 中找不到一个方法，JavaScript 就会从 Animal.prototype 中获取该方法
  - 示意图：
[Image]
- 在 extends 后允许任意表达式，示例：
function f(phrase) {
  return class {
    sayHi() { alert(phrase); }
  };
}

class User extends f("Hello") {}

new User().sayHi(); // Hello

- 方法重写
  - Class 提供了 "super" 关键字，解决重写父类方法后又想使用父类方法的情况
    - 执行 super.method(...) 来调用一个父类方法
    - 执行 super(...) 来调用一个父类 constructor（只能在我们的 constructor 中）
  - 箭头函数没有 super

- 重写 constructor
  - Js 中继承类的构造函数与其他函数之间是有区别的，派生构造器具有特殊的内部属性 [[ConstructorKind]]:"derived"，该标签会影响new的行为
    - 当通过 new 执行一个常规函数时，它将创建一个空对象，并将这个空对象赋值给 this
    - 但是当继承的 constructor 执行时，它不会执行此操作。它期望父类的 constructor 来完成这项工作（super调用，将参数全部传递给父类的构造函数）
    - 示例：
class Animal {

  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  // ...
}

class Rabbit extends Animal {

  constructor(name, earLength) {
    //不能直接，上来就this
    /*
    this.speed = 0;
    this.name = name;
    */
    super(name); //写在 constructor 中
    this.earLength = earLength;
  }

  // ...
}

// 现在可以了
let rabbit = new Rabbit("White Rabbit", 10);
alert(rabbit.name); // White Rabbit
alert(rabbit.earLength); // 10

- 重写类字段：一个棘手的注意要点
  - 当父类构造器在派生的类中被调用时，它会使用被重写的方法（就近原则）
  - 类字段是这样初始化的：
    - 对于基类（还未继承任何东西的那种），在子类构造函数调用前初始化
    - 对于派生类，在 super() 后立刻初始化

- 总结：
  1. 想要扩展一个类：class Child extends Parent：
    - 这意味着 Child.prototype.__proto__ 将是 Parent.prototype，所以方法会被继承。
  2. 重写一个 constructor：
    - 在使用 this 之前，我们必须在 Child 的 constructor 中将父 constructor 调用为 super()。
  3. 重写一个方法：
    - 我们可以在一个 Child 方法中使用 super.method() 来调用 Parent方法。
  4. 内部：（进阶）
    - 方法在内部的 [[HomeObject]] 属性中记住了它们的类/对象。这就是 super 如何解析父方法的。
    - 因此，将一个带有 super 的方法从一个对象复制到另一个对象是不安全的。
  补充：
  - 箭头函数没有自己的 this 或 super，所以它们能融入到就近的上下文中，像透明似的。
  - this 属于函数
  - 子类的构造函数中必须首先调用父类的构造函数以初始化父类的属性

1.5.3 静态属性和静态方法
- 静态方法
  - 静态方法用于实现属于整个类，但不属于该类任何特定对象的函数。
  - 在 User.staticMethod() 调用中的 this 的值是类构造器 User 自身（“点符号前面的对象”规则）
  - 静态方法不适用于单个对象，静态方法可以在类上调用，而不是在单个对象上
- 静态属性
  - 静态的属性，它们看起来就像常规的类属性，但前面加有 static
- 继承静态属性和方法，继承对常规方法和静态方法都有效
  - 代码验证：
class Animal {}
class Rabbit extends Animal {}

// 对于静态的
alert(Rabbit.__proto__ === Animal); // true

// 对于常规方法
alert(Rabbit.prototype.__proto__ === Animal.prototype); // true
  - 图示：
[Image]


- Class Rabbit  和 class Rabbit extends Object 的区别
  - “extends” 语法会设置两个原型：
    1. 在构造函数的 "prototype" 之间设置原型（为了获取实例方法）。
    2. 在构造函数之间会设置原型（为了获取静态方法）
[Image]

- 总结
  - 静态方法被用于实现属于整个类的功能。它与具体的类实例无关
  - 静态属性被用于想要存储类级别的数据时，而不是绑定到实例
  - 从技术上讲，静态声明变量与直接给类本身赋值相同

1.5.4 私有的和受保护的属性和方法
- 内部接口和外部接口
  在面向对象的编程中，属性和方法分为两组：
  - 内部接口 —— 可以通过该类的其他方法访问，但不能从外部访问的方法和属性。
  - 外部接口 —— 也可以从类的外部访问的方法和属性
  在 JavaScript 中，有两种类型的对象字段（属性和方法）：
  - 公共的：可从任何地方访问。它们构成了外部接口。到目前为止，我们只使用了公共的属性和方法
  - 私有的：只能从类的内部访问。这些用于内部接口
  - 受保护的字段不是在语言级别的 Javascript 中实现的，但实际上它们非常方便，因为它们是在 Javascript 中模拟的类定义语法

- 受保护的
  - 受保护的属性通常以下划线 _ 作为前缀，不是语言强制实施，只是程序员之间的约定
  - 若某个属性只读，则只设置getter；只写，则只设置setter
  - 受保护的字段是可以被继承的

- 私有的
  - 私有属性和方法应该以 # 开头。它们只在类的内部可被访问
  - 在语言级别，# 是该字段为私有的特殊标志。我们无法从外部或从继承的类中访问它。
  - 私有字段与公共字段不会发生冲突。可以同时拥有私有的 #waterAmount 和公共的 waterAmount 字段（waterAmount作为方法名去获取私有属性#waterAmount）
  - 私有字段不能通过 this[name] 访问
  - 子类不会继承父类的私有成员，而且子类也不能直接访问父类的私有成员

1.5.5 扩展内建类
- 内建的类，例如 Array，Map 等也都是可以扩展的
- 继承内建的类后，内建类的方法会调用 constructor 来构建返回的对象（返回扩展后的内建类），所以可以链式调用扩展后的方法。可以通过 Symbol.species 让方法返回常规内建类
- 内建类没有静态方法继承，通常，当一个类扩展另一个类时，静态方法和非静态方法都会被继承。但内建类却是一个例外。它们相互间不继承静态方法

1.5.6 类检查："instanceof"
- Instanceof  操作符
  - instanceof 操作符用于检查一个对象是否属于某个特定的 class。同时，它还考虑了继承
  - 语法：obj instanceof Class，如果 obj 隶属于 Class 类（或 Class 类的衍生类），则返回 true
  - 通常，instanceof 在检查中会将原型链考虑在内
- 总结：
  - 类型检查方法。如图：
[Image]
  - 从技术上讲，{}.toString 是一种“更高级的” typeof
  - 当使用类的层次结构（hierarchy），并想要对该类进行检查，同时还要考虑继承时，使用 instanceof 操作符
  - 根据 instanceof 的逻辑，真正决定类型的是 prototype，而不是构造函数
  - 代码示例：
function A() {}
function B() {}

A.prototype = B.prototype = {};

let a = new A();

alert( a instanceof B ); // true

1.5.7 Mixin 模式
- 解决 js 中单继承不能解决的问题，引用概念Mixin
- mixin 是一个包含可被其他类使用而无需继承的方法的类，换句话说，mixin 提供了实现特定行为的方法，但是我们不单独使用它，而是使用它来将这些行为添加到其他类中
- 一个 mixin 实例：
  - 在 JavaScript 中构造一个 mixin 最简单的方式就是构造一个拥有实用方法的对象，以便我们可以轻松地将这些实用的方法合并到任何类的原型中
  - Mixin 可以在自己内部使用继承
  - 代码示例：
let sayMixin = {
  say(phrase) {
    alert(phrase);
  }
};

let sayHiMixin = {
  __proto__: sayMixin, // (或者，我们可以在这儿使用 Object.setPrototypeOf 来设置原型)

  sayHi() {
    // 调用父类方法
    super.say(`Hello ${this.name}`); // (*)
  },
  sayBye() {
    super.say(`Bye ${this.name}`); // (*)
  }
};

class User {
  constructor(name) {
    this.name = name;
  }
}

// 拷贝方法
Object.assign(User.prototype, sayHiMixin);

// 现在 User 可以打招呼了
new User("Dude").sayHi(); // Hello Dude!
    - 请注意，在 sayHiMixin 内部对父类方法 super.say() 的调用（在标有 (*) 的行）会在 mixin 的原型中查找方法，而不是在 class 中查找

1.6 错误处理
1.6.1 "try...catch"
- 通常，如果发生错误，脚本就会“死亡”（立即停止），并在控制台将错误打印出来。但是有一种语法结构 try...catch，它使我们可以“捕获（catch）”错误，因此脚本可以执行更合理的操作，而不是死掉
- 语法：
  - try...catch 结构由两部分组成：try 和 catch：
try {

  // 代码...

} catch (err) {

  // 错误捕获

}
  - try {...} 块内的 error 不会杀死脚本 —— 我们有机会在 catch 中处理它
- try...catch 仅对运行时的 error 有效
  - 针对运行时错误或异常
  - 要使得 try...catch 能工作，代码必须是可执行的
- try...catch 同步执行
  - 如果在“计划的（scheduled）”代码中发生异常，例如在 setTimeout 中，则 try...catch 不会捕获到异常
    - 代码示例：
//错误示范：
try {
  setTimeout(function() {
    noSuchVariable; // 脚本将在这里停止运行
  }, 1000);
} catch (err) {
  alert( "不工作" );
}

//正确示范：
setTimeout(function() {
  try {
    noSuchVariable; // try...catch 处理 error 了！
  } catch {
    alert( "error 被在这里捕获了！" );
  }
}, 1000);
    - 原因：try...catch 包裹了计划要执行的函数，该函数本身要稍后才执行，这时引擎已经离开了 try...catch 结构
    - 解决方案：为了捕获到计划的（scheduled）函数中的异常，那么 try...catch 必须在这个函数内
- Error 对象
  - 发生错误时，JavaScript 会生成一个包含有关此 error 详细信息的对象。然后将该对象作为参数传递给 catch，代码示例：
try {
  // ...
} catch (err) { // <-- “error 对象”，也可以用其他参数名代替 err
  // ...
}
    - 如果不需要 error 的详细信息，catch 也可以忽略它（ catch 后不跟(err) 直接大括号）
  - 对于所有内建的 error，error 对象具有两个主要属性：
    - name：error名称
    - message：关于 error 的详细文字描述
    - stack：当前的调用栈，用于调试目的的一个字符串，其中包含有关导致 error 的嵌套调用序列的信息
- 抛出自定义的 error
  - "throw" 操作符
    - throw 操作符会生成一个 error 对象
    - 语法：throw <error object>
    - JavaScript 中有很多内建的标准 error 的构造器：Error，SyntaxError，ReferenceError，TypeError 等。可以使用它们来创建 error 对象，示例：
let error = new Error(message);
// 或
let error = new SyntaxError(message);
let error = new ReferenceError(message);
// ...
      - 对于内建的 error，name 属性刚好就是构造器的名字，message 则来自于参数（argument）
  - 再次抛出（Rethrowing）
    - 使用 try...catch 来处理不正确的数据。但是在 try {...} 块中是否可能发生 另一个预料之外的 error？为了避免此类问题，我们可以采用“重新抛出”技术。规则很简单：
      - catch 应该只处理它知道的 error，并“抛出”所有其他 error
    - 再次抛出（rethrowing）”技术可以被更详细地解释为：
      1. Catch 捕获所有 error。
      2. 在 catch (err) {...} 块中，我们对 error 对象 err 进行分析。
      3. 如果我们不知道如何处理它，那我们就 throw err
    - catch 块实际上只处理它知道该如何处理的 error，并“跳过”所有其他的 error（抛给外部其他结构捕获和处理），如果内层的 error 被抛到最外层仍没处理掉，那么脚本就会被杀死
  - try...catch...finally
    - 语法示例：
try {
   ... 尝试执行的代码 ...
} catch (err) {
   ... 处理 error ...
} finally {
   ... 总是会执行的代码 ...//（就算执行了 return 也会执行）
}
    - finally 子句适用于 try...catch 的 任何 出口。这包括显式的 return
    - try...finally，代码示例：
function func() {
  // 开始执行需要被完成的操作（比如测量）
  try {
    // ...
  } finally {
    // 完成前面我们需要完成的那件事，即使 try 中的执行失败了
  }
}
      - 代码运行过程：由于没有 catch，所以 try 中的 error 总是会使代码执行跳转至函数 func() 外。但是，在跳出之前需要执行 finally 中的代码
  - 全局catch
    - 代码的执行环境一般会提供这种机制，会用来处理未被捕获的 error，给用户反馈信息
- 总结：
  - try...catch 语法
try {
  // 执行此处代码
} catch (err) {
  // 如果发生 error，跳转至此处
  // err 是一个 error 对象
} finally {
  // 无论怎样都会在 try/catch 之后执行
}
  - Error 对象包含下列属性：
    - message --人类可读的 error 信息
    - name--具有 error 名称的字符串（Error 构造器的名称）
    - stack（没有标准，但得到了很好的支持）-- Error 发生时的调用栈