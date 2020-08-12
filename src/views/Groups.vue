<template>
  <div class="home">
    <h2 class="title">Student list</h2>

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
          <td>{{ group.groupname }}</td>
          <td>{{ group.lecturer }}</td>
          <td>{{ group.studentList }}</td>
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
    };
  },

  beforeMount() {
    firebase
      .firestore()
      .collection("Groups")
      // .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) =>
        snapshot.docs.forEach((doc) =>
          this.groupList.push({
            id: doc.id,
            groupname: doc.data().groupname,
            lecturer: doc.data().lecturer,
            studentList: doc.data().studentList,
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
