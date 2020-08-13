<template>
  <div class="groups">
    <h2 class="title">CodeAcademy Groups</h2>

    <!-- <Search v-on:search="(query) => (filter = query)" /> -->

    <table class="table is-fullwidth is-striped ">
      <thead>
        <tr>
          <th>Group Name</th>
          <th>Lecturer</th>
          <th>Student List</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="group in groupList" :key="group.id">
          <td>{{ group.groupName }}</td>
          <td>{{ group.lecturer }}</td>

          <div class="select">
            <select>
              <!-- atvaizuoja kiekį bet ne vardą -->
              <option>Students in a class </option>
              <option
                v-for="student in group.studentSelected"
                :key="student.id"
              >
                {{ student }}
              </option>
            </select>
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
// import Search from "../components/Search";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      groupList: [],
      // sutvarkyti duomenū bazę kad paduotų studentID no ne string tada viskas veiks!!!
      // studentList: [],
    };
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
</style>
