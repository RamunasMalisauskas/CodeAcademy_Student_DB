<template>
  <div class="about">
    <h2 class="subtitle">Add Student</h2>

    <form @submit.prevent="add">
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input
            class="input"
            type="text"
            name="name"
            v-model="name"
            placeholder="your name"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">Surname</label>
        <div class="control">
          <input
            class="input"
            type="text"
            name="surname"
            v-model="surname"
            placeholder="your surname"
          />
        </div>
      </div>

      <div class="control">
        <label class="radio">
          Male
          <input type="radio" v-model="gender" name="gender" value="male" />
        </label>
        <label class="radio">
          Female
          <input type="radio" v-model="gender" name="gender" value="female" />
        </label>
        <label class="radio">
          Other
          <input type="radio" v-model="gender" name="gender" value="other" />
        </label>
      </div>

      <div class="field">
        <label class="label">D.O.B.</label>
        <div class="control">
          <input
            class="input"
            type="text"
            name="birth"
            v-model="birth"
            placeholder="1980/01/01"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">Phone</label>
        <div class="control">
          <input
            class="input"
            type="text"
            name="phone"
            v-model="phone"
            placeholder="003701234567"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">E-Mail</label>
        <div class="control">
          <input
            class="input"
            type="text"
            name="email"
            v-model="email"
            placeholder="mail@email.com"
          />
        </div>
      </div>

      <button type="submit" class="button">Add Student</button>
    </form>

    <Notification/>
  </div>
</template>

<script>
import Notification from "../components/Notification";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export default {
  name: "addWorkout",

  components: { Notification },

  data() {
    return {
      name: "",
      surname: "",
      gender: "",
      birth: "",
      phone: "",
      email: "",
    };
  },

  methods: {
    add() {
      firebase
        .firestore()
        .collection("Students")
        .add({
          name: this.name,
          time: this.surname,
          gender: this.gender,
          birth: this.birth,
          phone: this.phone,
          email: this.email,
        });
    },
    remove(id) {
      firebase
        .firestore()
        .collection("Students")
        .doc(id)
        .delete();
      this.workouts = this.workouts.filter((workout) => workout.id !== id);
    },
  },
  // beforeMount() {
  //   firebase
  //     .firestore()
  //     .collection("students")
  //     .doc(firebase.auth().currentUser.uid)
  //     .orderBy("date", "desc")
  //     .get()
  //     .then((snapshot) =>
  //       snapshot.docs.forEach((doc) =>
  //         this.workouts.push({
  //           id: doc.id,
  //           date: doc.data().date,
  //           distance: doc.data().distance,
  //           time: doc.data().time,
  //           breath: doc.data().breath,
  //         })
  //       )
  //     );
  // },
};
</script>

<style scoped>
h2 {
  color: rgb(80, 80, 80);
  margin: 0 0 30px 0;
}

label {
  color: rgb(80, 80, 80);
}

input {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid rgb(0, 183, 255);
  border-radius: 10px;
  box-sizing: border-box;
  width: 33%;
}

input[type="number"] {
  -moz-appearance: textfield;
}

button {
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
