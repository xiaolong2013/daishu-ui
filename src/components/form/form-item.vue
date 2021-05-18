
<template>
  <div>
    <label :class="{ 'i-form-item-label-required': isRequired }" v-if="label">{{
      label
    }}</label>
    <div>
      <slot></slot>
      <div v-if="validateState == 'error'" class="error">
        {{ validateMessage }}
      </div>
    </div>
  </div>
</template>

<script>
// 组件挂载到dom 上的时候 把form-item 的实例 发送到 form
// 供form统一调用
// 整个校验工作其实是在 form item 中操作的
import Emitter from "../../mixins/emitter";
import AsyncValidator from "async-validator";
export default {
  name: "DsFormItem",
  mixins: [Emitter],
  inject: ["form"],
  props: {
    label: {
      type: String,
      default: "",
    },
    prop: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      isRequired: false,
      // 校验状态
      validateState: "",
      // 校验提示语  失败后的
      validateMessage: "",
    };
  },
  computed: {
    filedValue() {
      return this.form.model[this.prop];
    },
  },
  mounted() {
    this.dispatch("DsForm", "on-form-item-add", this);
    this.initValue = this.filedValue;
    this.setRules();
  },

  beforeDestroy() {
    this.dispatch("DsForm", "on-form-item-remove", this);
  },

  methods: {
    setRules() {
      const rules = this.getRules();
      rules.every((item) => {
        this.isRequired = item.required;
      });
      // 内容变化的时候 需要校验
      this.$on("on-form-change", this.handleChange);
      this.$on("on-form-blur", this.handleLbur);
    },
    validate(trigger, callback = function () {}) {
      //找到所有的规则
      const rules = this.getFilteredRule(trigger);
      if (rules.length == 0) {
        return true;
      }

      // 初始化 校验状态
      this.validateState = "validating";
      let descriptor = {};
      descriptor[this.prop] = rules;
      const validate = new AsyncValidator(descriptor);
      let model = {};
      model[this.prop] = this.filedValue;
      validate.validate(model, { firstFields: true }, (error) => {
        console.log("***", this);
        this.validateState = !error ? "success" : "error";
        this.validateMessage = error ? error[0].message : "";
        callback(this.validateMessage);
      });
    },

    getRules() {
      // 找到当前 prop 对应的规则
      let rules = this.form.rules;
      let rule = rules[this.prop] || [];
      return rule;
    },
    // 过滤出 change 和 blur 所对应的规则
    getFilteredRule(trigger) {
      const rules = this.getRules();
      return rules.filter(
        (rule) => !rule.trigger || rule.trigger.indexOf(trigger) != -1
      );
    },
    handleChange() {
      this.validate("change");
    },
    handleLbur() {
      this.validate("blur");
    },

    resetField() {
      this.validateState = "";
      this.validateMessage = "";
      this.form.model[this.prop] = this.initValue;
    },
  },
};
</script>
<style scoped>
.error {
  color: red;
}
.i-form-item-label-required:before {
  content: "*";
  color: red;
}
</style>
