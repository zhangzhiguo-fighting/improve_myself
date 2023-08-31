// 对象判空
function isEmpty(obj) {
    for (let key in obj) {
        return false;
    }
    return true;
}