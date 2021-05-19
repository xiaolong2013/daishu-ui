<template>
  <div>
    THis is a demo D
    <button @click="find">查找E</button>
  </div>
</template>

<script>
import { findBrotherComponent } from "../../utils/findComponent.js";
export default {
  name: "D",
  data() {
    return {
      msg: {
        name: "D",
      },
    };
  },
  methods: {
    find() {
      let s = findBrotherComponent(this, "D");
      console.log(s);
    },
  },
};
</script>
