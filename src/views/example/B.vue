<template>
  <div>
    THis is a demo
    <c></c>
  </div>
</template>

<script>
import C from "./C.vue";
export default {
  name: "A",
  // 给子组件提供 msg
  // 当传入的是一个可响应的对象的话
  // 混入以后 可以直接在实例上调用
  components: {
    C,
  },
  data() {
    return {
      msg: {
        name: "C",
      },
    };
  },
};
</script>
