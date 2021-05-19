<template>
  <div>
    THis is a demo C
    <D></D>
    <E></E>
  </div>
</template>

<script>
import { findComponentsUp } from "../../utils/findComponent.js";
import D from "./D.vue";
import E from "./E.vue";
export default {
  name: "C",
  components: {
    D,
    E,
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
      let s = findComponentsUp(this, "A");
      console.log(s);
    },
  },
};
</script>
