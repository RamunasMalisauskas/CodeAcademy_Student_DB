import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },

  {
    path: "/students",
    name: "Students",
    component: () =>
      import(/* webpackChunkName: "students" */ "../views/Students.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/add",
    name: "Add",
    component: () =>
      import(/* webpackChunkName: "add" */ "../views/AddStudent.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/editStudent/:id",
    name: "Edit Student",
    component: () =>
      import(/* webpackChunkName: "edit student" */ "../views/EditStudent.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/editGroup/:id",
    name: "Edit Group",
    component: () =>
      import(/* webpackChunkName: "edit group" */ "../views/EditGroup.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/addGroup",
    name: "Add Group",
    component: () =>
      import(/* webpackChunkName: "add group" */ "../views/AddGroup.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/groups",
    name: "Groups",
    component: () =>
      import(/* webpackChunkName: "add" */ "../views/Groups.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    meta: {
      requiresAnon: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue"),
    meta: {
      requiresAnon: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (!user && to.matched.some((route) => route.meta.requiresAuth)) {
      next({ path: "/login" });
    } else if (user && to.matched.some((route) => route.meta.requiresAnon)) {
      next({ path: "/students" });
    } else {
      next();
    }
  });
});

export default router;
