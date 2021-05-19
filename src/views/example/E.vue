<template>
  <div>
    THis is a demo D
    <button @click="find">查找</button>
  </div>
</template>

<script>
import { findComponentsUp } from "../../utils/findComponent.js";
export default {
  name: "D",
  data() {
    return {
      msg: {
        name: "E",
      },
    };
  },
  methods: {
    find() {
      let s = findComponentsUp(this, "A");
      console.log(s);
    },
  },
};
</script>
