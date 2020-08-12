<template>
  <div class="editStudent">
    <h2 class="title">Edit Student information</h2>

    <form @submit.prevent="edit">
      <div class="field-body">
        <div class="field">
          <label class="label">Student Name</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="name"
              v-model="name"
              required
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Surname</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="surname"
              v-model="surname"
              required
            />
          </div>
        </div>
        <div class="field">
          <label class="label">D.O.B.</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="birth"
              v-model="birth"
              required
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Phone</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="phone"
              v-model="phone"
              required
            />
          </div>
        </div>
        <div class="field">
          <label class="label">E-mail</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="email"
              v-model="email"
              required
            />
          </div>
        </div>
      </div>

      <button type="submit" class="button" :class="loading && 'is-loading'">
        Edit
      </button>

      <Notification
        class="blue"
        v-if="error"
        v-on:close="error = false"
        type="is-primary"
        :message="errorMessage"
      />
    </form>
  </div>
</template>

<script>
import Notification from "../components/Notification";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export default {
  name: "editStudent",
  components: { Notification },
  data() {
    return {
      id: "",
      name: "",
      surname: "",
      gender: "",
      birth: "",
      phone: "",
      email: "",
      error: false,
      errorMessage: "",
      loading: false,
    };
  },

  methods: {
    edit() {
      firebase
        .firestore()
        .collection("Students")
        .doc(this.id)
        .set({
          name: this.name,
          surname: this.surname,
          gender: this.gender,
          birth: this.birth,
          phone: this.phone,
          email: this.email,
        })
        .then(() => {
          this.loading = false;
          this.error = true;
          this.errorMessage = `you have updated ${this.name} information`;
        });
    },
  },

  // paduoti i url su student id link
  beforeMount() {
    firebase
      .firestore()
      .collection("Students")
      .doc(this.$route.params.id)
      .get()
      .then((doc) => {
        (this.id = doc.id),
          (this.name = doc.data().name),
          (this.surname = doc.data().surname),
          (this.gender = doc.data().gender),
          (this.birth = doc.data().birth),
          (this.phone = doc.data().phone),
          (this.email = doc.data().email);
      });
  },
};
</script>

<style scoped>
h2 {
  color: rgb(80, 80, 80);
  margin: 30px 0;
}

.blue {
  color: rgb(255, 255, 255);
  background-color: rgb(0, 183, 255);
}

table {
  margin-bottom: 180px;
}

input {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid rgb(0, 183, 255);
  border-radius: 10px;
  box-sizing: border-box;
  width: 100%;
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
