<template>
  <div class="students">
    <h2 class="title">Student list</h2>

    <Search v-on:search="(query) => (filter = query)" />

    <table class="table is-fullwidth is-striped ">
      <thead>
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th>Gender</th>
          <th>D.O.B.</th>
          <th>Phone</th>
          <th>E-mail</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in StudentSearch" :key="student.id">
          <td>{{ student.name }}</td>
          <td>{{ student.surname }}</td>
          <td>{{ student.gender }}</td>
          <td>{{ student.birth }}</td>
          <td>{{ student.phone }}</td>
          <td>{{ student.email }}</td>
          <td>
            <router-link :to="/editStudent/ + student.id">Edit</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Search from "../../components/Search";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export default {
  name: "Home",
  components: { Search },
  data() {
    return {
      students: [],
      filter: "",
    };
  },

  computed: {
    StudentSearch() {
      return this.students.filter((student) =>
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

h2 {
  color: rgb(80, 80, 80);
  margin: 30px 0;
}

table {
  margin-bottom: 180px;
}
</style>
