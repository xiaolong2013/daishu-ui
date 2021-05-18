<template>
  <div>
    <input :value="val" @input="handleInput" @blur="handleBlur" />
  </div>
</template>

<script>
import Emitter from "../../mixins/emitter";
export default {
  name: "DsInput",
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  watch: {
    value(val) {
      this.val = val;
    },
  },
  mixins: [Emitter],
  data() {
    return {
      val: this.value,
    };
  },
  methods: {
    handleInput(e) {
      let val = e.target.value;
      this.val = val;
      this.$emit("input", val);
      this.dispatch("DsFormItem", "on-form-change", val);
    },
    handleBlur() {
      this.dispatch("DsFormItem", "on-form-blur", this.val);
    },
  },
};
</script>