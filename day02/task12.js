//switch结构 转 if结构
let browser;
if (browser == "Edge") {
    console.log("You've got the Edge!");
} else if (browser == 'Chrome' || browser == 'Firefox' ||
            browser == 'Safari' || browser == 'Opera') {
                console.log("Okay Okay we support these browsers too");
            } else {
                console.log("We hope that this page looks ok!");
            }