"use strict";
function greet(person: any, date: any) {
    console.log("Hello ".concat(person, ", today is ").concat(date.toDateString(), "!"));
}
greet("Maddison", new Date());
let test = undefined;
export{};