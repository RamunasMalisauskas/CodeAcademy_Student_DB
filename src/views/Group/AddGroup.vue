<template>
  <div class="add">
    <h2 class="title">Add Group</h2>

    <form @submit.prevent="addGroup">
      <div class="field">
        <label class="label">Group Name</label>
        <div class="control">
          <input
            class="input"
            type="text"
            name="groupName"
            v-model="groupName"
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
        <label class="label">Students</label>
        <ul class="list-group">
          <li
            class="list-group-item"
            v-for="student in studentList"
            :key="student.id"
          >
            <label>
              <input
                type="checkbox"
                :value="student.id"
                v-model="studentSelected"
              />
            </label>
            {{ `${student.name} ${student.surname}` }}
          </li>
        </ul>
      </div>

      <Notification
        v-if="error"
        v-on:close="error = false"
        class="blue"
        :message="errorMessage"
      />

      <button type="submit" class="button" :class="loading && 'is-loading'">
        Add Group
      </button>
    </form>
  </div>
</template>

<script>
import Notification from "../../components/Notification";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export default {
  name: "addGroup",

  components: { Notification },

  data() {
    return {
      groupName: "",
      lecturer: "",
      studentList: [],
      studentSelected: [],
      error: false,
      errorMessage: "",
      loading: false,
    };
  },

  methods: {
    addGroup() {
      this.loading = true;
      firebase
        .firestore()
        .collection("Groups")
        .add({
          groupName: this.groupName,
          lecturer: this.lecturer,
          studentSelected: this.studentSelected,
        })
        .then(() => {
          this.loading = false;
          this.error = true;
          this.errorMessage = `"you have added students to this ${this.groupName}  "`;
        })
        .catch((error) => {
          this.loading = false;
          this.error = true;
          this.errorMessage = error.message;
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

  beforeMount() {
    firebase
      .firestore()
      .collection("Students")
      // .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) =>
        snapshot.docs.forEach((doc) =>
          this.studentList.push({
            id: doc.id,
            name: doc.data().name,
            surname: doc.data().surname,
          })
        )
      );
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

label > input {
  width: 5%;
}

.control {
  margin-bottom: 15px;
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

.blue {
  color: rgb(255, 255, 255);
  background-color: rgb(0, 183, 255);
}
</style>
