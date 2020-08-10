<template>
  <div class="home">
    <h2 class="title">Student list</h2>

    <table class="table is-fullwidth">
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
        <tr>
          <td>Ramas</td>
          <td>Mali</td>
          <td>M</td>
          <td>88/09/12</td>
          <td>0037688670</td>
          <td>mail@email.com</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

// beforemount isideti is 035 firestore funkcija
// susikurti tuscia objekta kuri push'inti info is firebase

<script>
export default {
  name: "Home",
  components: {},
};
</script>

<style scoped>
h2 {
  color: rgb(80, 80, 80);
  margin: 30px 0;
}
</style>
