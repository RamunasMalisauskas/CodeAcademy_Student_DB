<template>
  <div class="groups">
    <h2 class="title">CodeAcademy Groups</h2>

    <Search v-on:search="(query) => (filter = query)" />

    <table class="table is-fullwidth is-striped ">
      <thead>
        <tr>
          <th>Group Name</th>
          <th>Tutor</th>
          <th>Student List</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="group in groupSearch" :key="group.id">
          <td>{{ group.groupName }}</td>
          <td>{{ group.lecturer }}</td>

          <div class="dropdown is-hoverable">
            <div class="dropdown-trigger">
              <button
                class="button"
                aria-haspopup="true"
                aria-controls="dropdown-menu2"
              >
                <span>Students in the class</span>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu2" role="menu">
              <div class="dropdown-content">
                <div class="dropdown-item">
                  <div
                    class="dropdown-item"
                    v-for="student in group.studentSelected"
                    :key="student.id"
                  >
                    {{ student }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <td>
            <router-link :to="/editGroup/ + group.id">Edit</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Search from "../components/Search";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export default {
  name: "Home",
  components: { Search },
  data() {
    return {
      groupList: [],
      filter: "",
    };
  },

  computed: {
    groupSearch() {
      return this.groupList.filter((group) =>
        group.groupName.toLowerCase().includes(this.filter.toLowerCase())
      );
    },
  },

  beforeMount() {
    firebase
      .firestore()
      .collection("Groups")
      .get()
      .then((snapshot) =>
        snapshot.docs.forEach((doc) => {
          let students = [];
          doc.data().studentSelected.forEach((studentId, index) => {
            firebase
              .firestore()
              .collection("Students")
              .doc(studentId)
              .get()
              .then((student) => {
                students.push(student.data().name);
              })
              .then(() => {
                if (doc.data().studentSelected.length - 1 === index) {
                  this.groupList.push({
                    id: doc.id,
                    groupName: doc.data().groupName,
                    lecturer: doc.data().lecturer,
                    studentSelected: students,
                  });
                }
              });
          });
        })
      );
  },
};

// beforeMount() {
//   firebase
//     .firestore()
//     .collection("Groups")
//     .get()
//     .then((snapshot) =>
//       snapshot.docs.forEach((doc) =>
//         this.groupList.push({
//           id: doc.id,
//           groupName: doc.data().groupName,
//           lecturer: doc.data().lecturer,
//         })
//       )
//     );

//   firebase
//     .firestore()
//     .collection("Groups")
//     .doc()
//     .collection("studentSelected")
//     .get()
//     .then((snapshot) =>
//       snapshot.docs.forEach((document) =>
//         this.studentList.push({
//           id: document.id,
//           student: document.data(),
//         })
//       )
//     );
// },
</script>

<style scoped>
h2 {
  color: rgb(80, 80, 80);
  margin: 30px 0;
}

table {
  margin-bottom: 180px;
}

select {
  border-radius: 10px;
}

select:hover {
  border: 1px solid rgb(0, 183, 255);
  color: rgb(80, 80, 80);
  background-color: rgb(255, 255, 255);
}
a {
  padding: 7.5px 20px;
  border-radius: 10px;
  border: 1px solid rgb(0, 183, 255);
  color: rgb(0, 183, 255);
  background-color: rgb(255, 255, 255);
}

a:hover {
  background-color: rgb(0, 183, 255);
  color: rgb(255, 255, 255);
}

button {
  padding: 7.5px 20px;
  border-radius: 10px;
  border: 1px solid rgb(80, 80, 80);
  color: rgb(80, 80, 80);
  background-color: rgb(255, 255, 255);
}

button:hover {
  cursor: pointer;
  color: rgb(0, 183, 255);
  background-color: inherit;
  border: 0px;
}
</style>
