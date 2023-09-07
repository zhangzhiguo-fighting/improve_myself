"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user = { firstName: "Jane", lastName: "User" };
console.log(greeter(user));
