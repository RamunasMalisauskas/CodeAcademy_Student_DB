<template>
  <div class="header">
    <div class="wrapper">
      <img
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.codeacademykids.com%2Fwp-content%2Fuploads%2F2019%2F12%2FCA_logo-300x205.png&f=1&nofb=1"
        alt="logo"
      />
      <nav>
        <span v-if="loggedIn">
          <router-link to="/Students">Students</router-link>
          <router-link to="/Add">Add Student </router-link>
          <a class="blue" v-on:click="signOut()">Sign Out</a>
        </span>

        <span v-else>
          <router-link to="/register">Register</router-link>
          <router-link class="blue" to="/login">Login</router-link>
        </span>
      </nav>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Header",
  data() {
    return {
      loggedIn: false,
    };
  },

  computed: {
    cartLenght() {
      return JSON.parse(localStorage.getItem("products")).length;
    },
  },

  methods: {
    signOut() {
      firebase.auth().signOut();
    },
  },

  beforeMount() {
    firebase.auth().onAuthStateChanged((user) => (this.loggedIn = !!user));
  },
};
</script>

<style scoped>
.header {
  margin: 20px 0;
}
.wrapper {
  margin: 0 auto;
  background-color: rgb(255, 255, 255);
  width: 968px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

img {
  width: 150px;
}

.blue {
  padding: 10px 30px;
  border: 0;
  border-radius: 10px;
  background-color: rgb(0, 183, 255);
  color: rgb(255, 255, 255);
}

.blue:hover {
  color: rgb(0, 183, 255);
  background-color: rgb(255, 255, 255);
}

a {
  text-decoration: none;
  color: rgb(0, 183, 255);
  margin-right: 20px;
}

a:hover {
  cursor: pointer;
  color: rgb(88, 88, 88);
}

a:last-child {
  margin-right: 0;
}
</style>
