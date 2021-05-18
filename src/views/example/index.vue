<template>
  <div>
    <parent></parent>
  </div>
</template>

<script>
export default {
  name: "index",
  components: {
    parent: () => import(/* webpackChunkName: "parent" */ "./parent"),
  },
};
</script>
