//对象属性求和
let salaries = {
    John: 100,
    Ann: 160,
    Pete: 130
  };

function doSum(obj) {
    let sum = 0
    for (let key in obj) {
        sum += obj[key];
    }
    return sum;
}

let sum = doSum(salaries);
alert(sum);