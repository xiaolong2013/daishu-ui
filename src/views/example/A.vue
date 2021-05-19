<template>
  <div>
    THis is a demo
    <B></B>

    <button @click="find">查找D</button>
  </div>
</template>

<script>
import B from "./B.vue";
// import { findComponentsDown } from "../../utils/findComponent.js";
export default {
  name: "A",
  // 给子组件提供 msg
  // 当传入的是一个可响应的对象的话
  // 混入以后 可以直接在实例上调用
  components: {
    B,
  },
  data() {
    return {
      msg: {
        name: "hello",
      },
    };
  },
  methods: {
    find() {
      //   const d = findComponentsDown(this, "D");
      //   console.log(d.msg);
    },
  },
};
</script>
