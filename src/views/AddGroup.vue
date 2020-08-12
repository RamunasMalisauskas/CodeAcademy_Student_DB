<template>
  <div class="add">
    <h2 class="title">Add Group</h2>

    <form @submit.prevent="addGroup">
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input
            class="input"
            type="text"
            name="groupname"
            v-model="groupname"
            placeholder="group name"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">Lecturer</label>
        <div class="control">
          <input
            class="input"
            type="text"
            name="lecturer"
            v-model="lecturer"
            placeholder="lecturer name"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">Student List</label>
        <ul class="list-group">
          <li
            class="list-group-item"
            v-for="student in studentList"
            :key="student.id"
          >
            <label>
              <input
                type="checkbox"
                :value="`${student.name} ${student.surname}`"
                v-model="studentListGroup"
              />
              {{ `${student.name} ${student.surname}` }}
            </label>
          </li>
        </ul>
      </div>

      <Notification
        v-if="error"
        v-on:close="error = false"
        class="blue"
        :message="errorMessage"
      />

      <button type="submit" class="button">Add Group</button>
    </form>
  </div>
</template>

<script>
import Notification from "../components/Notification";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export default {
  name: "addGroup",

  components: { Notification },

  data() {
    return {
      groupname: "",
      lecturer: "",
      studentList: "",
      studentListGroup: "",
      error: false,
      errorMessage: "",
      loading: false,
    };
  },

  methods: {
    addGroup() {
      firebase
        .firestore()
        .collection("Group")
        .add({
          groupname: this.groupname,
          lecturer: this.lecturer,
          gender: this.gender,
        })
        .then(() => {
          this.loading = false;
          this.error = true;
          this.errorMessage = `"you have added ${this.student.name} ${this.student.surname} to this ${this.groupname} "`;
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
