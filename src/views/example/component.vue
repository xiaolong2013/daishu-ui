
<template>
  <!-- 基本用法就这样 -->
  <div>
    <dsForm ref="form" :rules="rules" :model="form">
      <ds-form-item label="姓名" prop="name">
        <ds-input v-model="form.name"></ds-input>
      </ds-form-item>
      <ds-form-item label="邮箱" prop="email">
        <ds-input v-model="form.email"></ds-input>
      </ds-form-item>
    </dsForm>
    <button @click="handleSubmit">提交</button>
    <button @click="handleReset">重置</button>
  </div>
</template>

<script>
import dsForm from "../../components/form/form.vue";
import dsFormItem from "../../components/form/form-item.vue";
import dsInput from "../../components/input/input.vue";
export default {
  name: "ComTest",
  components: {
    dsForm,
    dsFormItem,
    dsInput,
  },
  data() {
    return {
      form: {
        name: "xx",
        email: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur",
          },
          {
            type: "email",
            message: "邮箱格式有误",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          alert("提交成功");
        } else {
          alert("提交失败");
        }
      });
    },
    handleReset() {
      this.$refs.form.resetField();
    },
  },
};
</script>
