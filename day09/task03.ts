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

let circle: Circle = {
    kind: "circle",
    radius: 1,
}

console.log(getArea(circle));

export{};