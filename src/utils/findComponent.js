/**
 *  查找组件的5个方法
 */

// 向上查找指定的组件
function findComponentUp(context, componentName) {
    let parent = context.$parent;
    let name = parent.$options.name;
    while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
            name = parent.$options.name;
        }
    }
    return parent;
}

// 向上找到所有的指定的组件
function findComponentsUp(context, componentName) {
    let arr = [];
    let parent = context.$parent;
    // 如果有父级的话 继续往下进行 没有父级的话 直接返回空数组
    if (parent) {
        // 如果有父级 并且 name 一致的话
        let name = parent.$options.name;
        if (name == componentName) {
            arr.push(parent);
        }
        // 递归解法
        return arr.concat(findComponentsUp(parent, componentName))
    } else {
        return [];
    }
}

// 向下查找指定的组件
function findComponentDown(context, componentName) {
    let childrens = context.$children;
    let children;
    if (childrens.length) {
        for (let child of childrens) {
            let name = child.$options.name;
            if (name == componentName) {
                children = child;
                break;
            } else {
                children = findComponentDown(child, componentName)
                if (children) {
                    break;
                }
            }
        }
    }
    return children;
}


// 向下查找所有的指定组件
function findComponentsDown(context, componentName) {
    let childrens = context.$children;
    let arr = [];
    if (childrens.length) {
        for (let child of childrens) {
            let name = child.$options.name;
            console.log('name', name, componentName);
            if (name == componentName) {
                arr.push(child)
            }
            return arr.concat(findComponentsDown(child, componentName))
        }
    }
    return arr;
}


// 找到指定组件的兄弟组件
function findBrotherComponent(context, componentName, exceptMe = true) {

    const res = context.$parent.$children.filter(item => {
        return item.$options.name == componentName;
    })

    const index = res.findIndex(item => item._uid == context._uid)
    if (exceptMe) {
        res.splice(index, 1)
    }
    return res;
}





export { findComponentUp, findComponentsUp, findComponentDown, findComponentsDown, findBrotherComponent }
