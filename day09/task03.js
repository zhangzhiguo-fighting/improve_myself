"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getArea(shape) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * Math.pow(shape.radius, 2); //(parameter) shape: Circle
        case "square":
            return Math.pow(shape.sideLength, 2); //(parameter) shape: Square
    }
}
var circle = {
    kind: "circle",
    radius: 1,
};
console.log(getArea(circle));
