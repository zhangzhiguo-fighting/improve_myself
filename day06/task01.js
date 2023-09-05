//继承 SyntaxError
class FormatError extends SyntaxError {
    constructor(message) {
        super(message);
        //this 指代的是当前类的实例，new 创建的对象
        //constructor 是类的一个方法，它引用类的构造函数
        this.name = this.constructor.name;
    }
}

let err = new FormatError("formatting error");
alert( err.message ); // formatting error
alert( err.name ); // FormatError
alert( err.stack ); // stack

alert( err instanceof FormatError ); // true
alert( err instanceof SyntaxError ); // true（因为它继承自 SyntaxError）