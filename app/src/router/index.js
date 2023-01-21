import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import TaskView from "../views/TasksView.vue";
import RejectedAndValidatedTasksView from "@/views/RejectedAndValidatedTasksView.vue";
import AllNotesView from '../views/AllNotesView.vue'
import PlanningsView from "../views/PlanningsView.vue"
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/tasks",
    name: "tasks",
    component: TaskView,
  },
  {
    path: "/tasks/reject-and-validated",
    name: "rejectedAndValidated",
    component: RejectedAndValidatedTasksView
  },
  {
    path: "/notes",
    name: "allNotes",
    component: AllNotesView
  },
  {
    path: "/finances",
    name: "finances",
    component: PlanningsView
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
