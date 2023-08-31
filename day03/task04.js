//将数值属性值都乘以 2

// 在调用之前
let menu = {
    width: 200,
    height: 300,
    title: "My menu"
  };
  

function multiplyNumeric(obj) {
    for (let key in obj) {
        if (typeof(obj[key]) == 'number') {
            obj[key] *= 2;
            alert(obj[key]);
        }
    }
}

multiplyNumeric(menu);