function printName(obj: { first: string; last?: string }) {
    // ...
    console.log(obj.first.toLocaleUpperCase);
    if (obj.last !== undefined) {
        console.log(obj.last.toLowerCase);
    }
  }
  // Both OK
  printName({ first: "Bob" });
  printName({ first: "Alice", last: "Alisson" });
  export{};