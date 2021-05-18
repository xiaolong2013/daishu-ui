<template>
  <div>
    {{ msg.name }}
    <button @click="add">点击</button>
  </div>
</template>

<script>
import Emitter from "../../mixins/emitter.js";
export default {
  name: "Child",
  // 子组件直接注入
  inject: ["msg"],
  mixins: [Emitter],
  methods: {
    add() {
      // 自己触发自定义事件
      this.$emit("test", "this is a test");
    },
    showMessage(msg) {
      window.alert(msg);
    },
  },
  mounted() {
    // 自己监听自己的触发的自定义事件
    // 因为不确定啥时候触发所以在mounted中监听
    this.$on("test", (text) => {
      window.alert(text);
    });

    this.dispatch("Parent", "on-msg", "hahahah");

    this.$on("on-message", this.showMessage);
  },
};
</script>
