/**
 * Created by yy on 2019/4/16.
 * 公共函数
 * 深拷贝对象
 */
function deepClone(data){
    let type = getType(data);
    let obj;
    if (type === 'array') {
        obj = [];
        for (let i = 0, len = data.length; i < len; i++) {
            obj.push(deepClone(data[i]));
        }
        return obj;
    }
    else if (type === 'object') {
        obj = {};
        for (let key in data) {
            obj[key] = deepClone(data[key]);
        }
        return obj;
    }
    else {
        //不再具有下一层次
        return data;
    }

}

function getType(val){
    if (arguments.length === 0) {
        return '没有传值'
    }
    else if (typeof val === 'number') {
        if (val !== val) {
            //也可以使用isFinite()来判断一个值是否是数字，NaN和Infinity以及其他非数字都为false
            //NaN是唯一一个不全等于自己的值NaN === NaN结果是false
            return 'NaN'
        }
        else if (isFinite(val) === false && val === val) {
            return 'Infinity'
        }
        else if (isFinite(val) === true) {
            return 'number'
        }
    }
    else if (typeof val === 'string') {
        return 'string'
    }
    else if (typeof val === 'boolean') {
        return 'boolean'
    }
    else if (typeof val === 'function') {
        return 'function'
    }
    else if (typeof val === 'undefined') {
        return 'undefined'
    }
    else if (typeof val === 'object') {
        if (val.constructor === Array) {
            //或者Object.prototype.toString.apply(val) === '[object Array]'
            return 'array'
        }
        if (val) {
            //可以用 val && typeof val === 'object'来判断是否是对象
            return 'object'
        }
        else {
            //typeof null是object，但是null是假值
            return 'null'
        }
    }
}

function getModel(type = ''){
    return type + '_'  + Date.now() + '_' + Math.ceil(Math.random() * 99999);
}

export {
    deepClone,
    getType,
    getModel
}