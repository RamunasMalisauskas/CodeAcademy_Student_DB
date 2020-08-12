<template>
  <div class="home">
    <h2 class="title">Student list</h2>

    <Search v-on:search="(query) => (filter = query)" />

    <table class="table is-fullwidth is-striped ">
      <thead>
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th>Gender</th>
          <th>D.O.B</th>
          <th>Phone</th>
          <th>E-mail</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student.id">
          <td>{{ student.name }}</td>
          <td>{{ student.surname }}</td>
          <td>{{ student.gender }}</td>
          <td>{{ student.birth }}</td>
          <td>{{ student.phone }}</td>
          <td>{{ student.email }}</td>
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
      allstudents: [],
      students: [],
    };
  },

  computed: {
    StudentSearch() {
      return this.allstudents.filter((student) =>
        student.name.toLowerCase().includes(this.filter.toLowerCase())
      );
    },
  },

  beforeMount() {
    firebase
      .firestore()
      .collection("Students")
      // .doc(firebase.auth().currentUser.uid)
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
</style>
