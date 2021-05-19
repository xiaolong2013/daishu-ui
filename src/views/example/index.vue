<template>
  <div>
    <!-- <parent></parent> -->
    <A></A>
    <button @click="find">查找A</button>
  </div>
</template>

<script>
import {
  findComponentsDown,
  // findComponentDown,
} from "../../utils/findComponent.js";
export default {
  name: "index",
  components: {
    // parent: () => import(/* webpackChunkName: "parent" */ "./parent"),
    A: () => import(/* webpackChunkName: "parent" */ "./A"),
  },
  methods: {
    find() {
      const d = findComponentsDown(this, "A");
      console.log(d);
    },
  },
};
</script>
