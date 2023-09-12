var MySafe = /** @class */ (function () {
    function MySafe() {
        this.secretKey = 12345;
    }
    return MySafe;
}());
var s = new MySafe();
// Not allowed during type checking
//console.log(s.secretKey);
// Property 'secretKey' is private and only accessible within class 'MySafe'.
// OK
console.log(s["secretKey"]);
