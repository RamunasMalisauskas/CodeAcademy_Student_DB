<template>
  <div class="home">
    <h2 class="title">CodeAcademy Groups</h2>

    <!-- <Search v-on:search="(query) => (filter = query)" /> -->

    <table class="table is-fullwidth is-striped ">
      <thead>
        <tr>
          <th>Group Name</th>
          <th>Lecturer</th>
          <th>Student List</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="group in groupList" :key="group.id">
          <td>{{ group.groupName }}</td>
          <td>{{ group.lecturer }}</td>

          <td v-for="student in studentList" :key="student.id">
            {{ student.name }}
            {{ student.surname }}
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
      studentList: [],
    };
  },

  beforeMount() {
    firebase
      .firestore()
      .collection("Groups")
      .get()
      .then((snapshot) =>
        snapshot.docs.forEach((doc) =>
          this.groupList.push({
            id: doc.id,
            groupName: doc.data().groupName,
            lecturer: doc.data().lecturer,
          })
        )
      );

    firebase
      .firestore()
      .collection("Groups")
      .doc()
      .collection("studentSelected")
      .get()
      .then((snapshot) =>
        snapshot.docs.forEach((doc) =>
          this.studentList.push({
            id: doc.id,
            name: doc.data().number,
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
