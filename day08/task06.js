"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function printName(obj) {
    // ...
    console.log(obj.first.toLocaleUpperCase);
    if (obj.last !== undefined) {
        console.log(obj.last.toLowerCase);
    }
}
// Both OK
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });
