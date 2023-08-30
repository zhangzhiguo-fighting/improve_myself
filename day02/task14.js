/*
编写 checkAge 的两个变体：
1.使用问号运算符 ?
2.使用或运算符 ||
function checkAge(age) {
  if (age > 18) {
    return true;
  } else {
    return confirm('Do you have your parents permission to access this page?');
  }
}
*/
function checkAge01(age) {
    return (age > 18) ? true : confirm('Do you have your parents permission to access this page?'); 
}

function checkAge02(age) {
    return (age > 18) || confirm('Do you have your parents permission to access this page?');
}

function min(a, b) {
    return a < b ? a : b;
}

function pow(x, n) {
    return x ** n;
}