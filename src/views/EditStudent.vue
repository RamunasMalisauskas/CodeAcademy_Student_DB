<template>
  <div class="editStudent">
    <h2 class="title">Edit Student information</h2>

    <!-- <Search v-on:search="(query) => (filter = query)" /> -->

    <table class="table is-striped ">
      <thead>
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th>Gender</th>
          <th>D.O.B.</th>
          <th>Phone</th>
          <th>E-mail</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student.id">
          <td>
            <input
              type="text"
              v-model="student.name"
            />
          </td>
          <td>
            <input
              type="text"
              v-model="student.surname"
            />
          </td>
          <td>
            <input
              type="text"
              v-model="student.gender"
            />
          </td>
          <td>
            <input
              type="text"
              v-model="student.birth"
            />
          </td>
          <td>
            <input
              type="text"
              v-model="student.phone"
            />
          </td>
          <td>
            <input
              type="text"
              v-model="student.email"
            />
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
  name: "editStudent",
  //   components: { Search },
  data() {
    return {
      allstudents: [],
      students: [],
      name: ""
    };
  },

  //   computed: {
  //     StudentSearch() {
  //       return this.allstudents.filter((student) =>
  //         student.name.toLowerCase().includes(this.filter.toLowerCase())
  //       );
  //     },
  //   },

  beforeMount() {
    firebase
      .firestore()
      .collection("Students")
        // .doc(this.$route.params.id)
      .get()
      .then((snapshot) =>
        snapshot.docs.forEach((doc) =>
          this.students.push({
            id: doc.id,
            name: doc.data().name,
            surname: doc.data().surname,
            gender: doc.data().gender,
            birth: doc.data().birth,
            phone: doc.data().phone,
            email: doc.data().email,
          })
        )
      );
  },
};
</script>

<style scoped>
h2 {
  color: rgb(80, 80, 80);
  margin: 30px 0;
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
</style>
