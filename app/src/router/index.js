import  { createRouter, createWebHashHistory} from "vue-router";
import HomeView from "../views/HomeView.vue";
import TaskView from "../views/TasksView.vue";
import RejectedAndValidatedTasksView from "@/views/RejectedAndValidatedTasksView.vue";
import AllNotesView from "../views/AllNotesView.vue";
import PlanningsView from "../views/PlanningsView.vue";
import DashboardView from "../views/DashboardView.vue";
import SettingsView from "../views/SettingsView.vue";
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
    component: RejectedAndValidatedTasksView,
  },
  {
    path: "/notes",
    name: "allNotes",
    component: AllNotesView,
  },
  {
    path: "/finances",
    name: "finances",
    component: PlanningsView,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardView,
  },
  {
    path: "/settings",
    name: "settings",
    component: SettingsView,
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
  base: process.env.BASE_URL,
});
