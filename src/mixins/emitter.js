
// 定义两个方法  dispatch (向上传递数据) 和 broadcast (向下传递数据)
function broadcast(componentName, eventName, params) {
    this.$children.forEach(child => {
        // 拿到组件的name
        const name = child.$options.name;
        if (name == componentName) {
            child.$emit.apply(child, [eventName, params])
        } else {
            // 递归查找
            broadcast.apply(child, [componentName, eventName, params])
        }
    });
}

export default {
    methods: {
        dispatch(componentName, eventName, params) {
            let parent = this.$parent || this.$root;
            let name = parent.$options.name;
            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent;
                if (parent) {
                    name = parent.$options.name;
                }
            }
            if (parent) {
                // 如果找到父级 再父级上触发
                parent.$emit.apply(parent, [eventName, params]);
            }
        },
        broadcast(componentName, eventName, params) {
            // 如果找到子级 在子级上触发
            broadcast.call(this, componentName, eventName, params)
        }
    }
}

