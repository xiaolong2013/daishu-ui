
<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: "DsForm",
  props: {
    rules: {
      type: Object,
    },
    model: {
      type: Object,
    },
  },
  // 把自己提供出去
  provide() {
    return {
      form: this,
    };
  },
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.$on("on-form-item-add", this.add);
    this.$on("on-form-item-remove", this.remove);
  },

  methods: {
    add(formItem) {
      this.list.push(formItem);
    },
    remove(formItem) {
      // prop 用于校验 及获取数据
      if (formItem.prop) {
        // 数组 indexOf 可以查看某个元素的索引 也可以判断某个元素是否存在
        this.list.splice(this.list.indexOf(formItem), 1);
      }
    },
    validate(callback) {
      return new Promise((resolve) => {
        let valid = true;
        let count = 0;
        this.list.forEach((item) => {
          item.validate("", (erros) => {
            // 如果erros 存在的话 则说明有错误
            if (erros) {
              valid = false;
            }
            if (++count == this.list.length) {
              resolve(valid);
              if (typeof callback == "function") {
                callback(valid);
              }
            }
          });
        });
      });
    },
    resetField() {
      this.list.forEach((item) => {
        item.resetField();
      });
    },
  },
};
</script>
