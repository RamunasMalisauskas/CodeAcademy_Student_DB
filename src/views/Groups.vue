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
        </tr>
      </thead>
      <tbody>
        <tr v-for="group in groupList" :key="group.id">
          <td>{{ group.groupName }}</td>
          <td>{{ group.lecturer }}</td>

          <div class="select">
            <select>
              <option>Students in a class </option>
              <option v-for="student in studentList" :key="student.id">
                {{ student.name }}
              </option>
            </select>
          </div>
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
      studentList: [{ name: "vardas pavarde" }],
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

select {
  border: 1px solid rgb(0, 183, 255);
  border-radius: 10px;
  box-sizing: border-box;
}

select:hover {
  color: rgb(0, 183, 255);
  background-color: rgb(255, 255, 255);
}

</style>
