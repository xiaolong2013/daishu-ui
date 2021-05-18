<template>
  <div>
    <child @test="test"></child>
    THis is parent {{ msg.name }}
    <button @click="change">测试测试</button>
    <button @click="handleClick">触发事件</button>
  </div>
</template>

<script>
import Emitter from "../../mixins/emitter.js";
console.log("**", Emitter);
export default {
  name: "Parent",
  // 给子组件提供 msg
  // 当传入的是一个可响应的对象的话
  // 混入以后 可以直接在实例上调用
  mixins: [Emitter],
  provide() {
    return {
      msg: this.msg,
    };
  },
  components: {
    child: () => import(/* webpackChunkName: "child" */ "./child"),
  },
  data() {
    return {
      msg: {
        name: "hello",
      },
    };
  },
  mounted() {
    this.$on("on-msg", this.showMsg);
  },
  methods: {
    change() {
      this.msg.name = "THis is msg";
    },
    test(val) {
      console.log("vakl===", val);
    },
    handleClick() {
      this.broadcast("Child", "on-message", "this is a test broadcast");
    },
    showMsg(val) {
      alert(val);
    },
  },
};
</script>
