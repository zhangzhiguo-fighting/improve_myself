//在非 async 函数中调用 async 函数
async function wait() {
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    return 10;
  }
  
//   function f() {
//     // ……这里你应该怎么写？
//     // 我们需要调用 async wait() 并等待以拿到结果 10
//     // 记住，我们不能使用 "await"
//   }

//   function f() {
//     wait().then(result => {
//         console.log(result);
//     });
//   }

//result 只是个接收promise链上个结点的解决值的变量，名字可以随意
function f() {
    wait().then(xx => {
        console.log(xx);
    });
  }

  f();