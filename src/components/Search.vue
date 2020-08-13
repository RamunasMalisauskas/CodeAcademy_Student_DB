<template>
  <div class="search">
    <div class="field">
      <label class="label">Search...</label>
      <div class="control">
        <input
          class="input"
          v-model="query"
          type="search"
          placeholder="Search..."
          v-on:keyup="searchThis"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      query: "",
    };
  },

  methods: {
    searchThis() {
      this.$emit("search", this.query);
    },
  },
};
</script>

<style scoped>
input {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid rgb(0, 183, 255);
  border-radius: 10px;
  box-sizing: border-box;
  width: 100%;
}
</style>
