// 链式调用
let ladder = {
    step: 0,
    up() {
      this.step++;
      return this;
    },
    down() {
      this.step--;
      return this;
    },
    showStep: function() { // 显示当前的 step
      alert( this.step );
      return this;
    },
  };

/*
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
ladder.down();
ladder.showStep(); // 0
*/
ladder.up().up().down().showStep().down().showStep(); // 展示 1，然后 0
