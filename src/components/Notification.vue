<template>
  <div class="notification" v-bind:class="type">
    {{ message }}
    <button class="delete" @click="close"></button>
  </div>
</template>

<script>
export default {
  name: "Notification",
  props: {
    type: String,
    message: String,
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.notification {
  margin: 30px 0;
}
</style>
