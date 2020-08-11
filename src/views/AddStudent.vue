<template>
  <div class="add">
    <h2 class="title">Add Student</h2>

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
        <label class="label">Gender</label>
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

      <Notification
        v-if="error"
        v-on:close="error = false"
        class="blue"
        :message="errorMessage"
      />

      <button type="submit" class="button">Add Student</button>
    </form>
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
      error: false,
      errorMessage: "",
      loading: false,
    };
  },

  methods: {
    add() {
      firebase
        .firestore()
        .collection("Students")
        .add({
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
          this.errorMessage = `"you have added ${this.name} ${this.surname} to student database "`;
        });
    },

    // remove button funkcija  -> reikia įsidėti
    // remove(id) {
    //   firebase
    //     .firestore()
    //     .collection("Students")
    //     .doc(id)
    //     .delete();
    //   this.workouts = this.workouts.filter((workout) => workout.id !== id);
    // },
  },
};
</script>

<style scoped>
form {
  margin-bottom: 60px;
}

h2 {
  color: rgb(80, 80, 80);
  margin: 30px 0;
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
  width: 50%;
}

.control {
  margin-bottom: 15px;
}

input[type="number"] {
  -moz-appearance: textfield;
}

input[type="radio"] {
  margin-right: 20px;
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

.blue {
  color: rgb(255, 255, 255);
  background-color: rgb(0, 183, 255);
}
</style>
