<template>
  <div class="register">
    <h2 class="title">Register</h2>

    <form name="iki" v-on:submit.prevent="register">
      <label for="email">Email</label>
      <input
        type="email"
        v-model="email"
        id="email"
        name="email"
        placeholder="youremail@email.lt"
        required
      />

      <label for="Password">Password</label>
      <input
        type="password"
        v-model="password"
        id="password"
        name="password"
        placeholder="type your password here ->"
        required
      />

      <button type="submit" class="button" :class="loading && 'is-loading'">
        Login
      </button>

      <Notification
        v-if="error"
        v-on:close="error = false"
        type="is-warning"
        :message="errorMessage"
      />
    </form>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import Notification from "../../components/Notification";

export default {
  name: "Register",
  components: { Notification },
  data() {
    return {
      email: "",
      password: "",
      error: false,
      errorMessage: "",
      loading: false,
    };
  },

  methods: {
    register() {
      this.loading = true;
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          () => this.$router.push("/students"),

          (error) => {
            this.loading = false;
            this.error = true;
            this.errorMessage = error.message;
          }
        );
    },
  },
};
</script>

<style scoped>
h2 {
  color: rgb(80, 80, 80);
  margin: 60px 0;
}

label {
  color: rgb(80, 80, 80);
  display: block;
  min-width: 100%;
  padding-bottom: 5px;
}

input {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid rgb(0, 183, 255);
  border-radius: 10px;
  box-sizing: border-box;
  width: 66%;
}

button {
  display: block;
  padding: 10px 30px;
  border: 0;
  border-radius: 10px;
  background-color: rgb(0, 183, 255);
  color: rgb(255, 255, 255);
}

button:hover {
  cursor: pointer;
  color: rgb(0, 183, 255);
  background-color: rgb(255, 255, 255);
}
</style>
