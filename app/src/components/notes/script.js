import HeaderComponent from "../header/Header.vue";
import NavbarComponent from "../nav/Navbar.vue";
export default {
  components: { NavbarComponent, HeaderComponent },
  name: "NoteComponent",
  props: {
    msg: String,
  },
  mounted() {
    console.log(this.$store);
  },
};
