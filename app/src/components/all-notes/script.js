import { mapGetters } from "vuex";
import Card from "../card/Card.vue";
import NavbarComponent from "../nav/Navbar.vue";
import Header from "../header/Header.vue";

export default {
  components: {
    NavbarComponent,
    Header,
    Card,
  },
  computed: {
    ...mapGetters({
      notes: "note/allNotesGetter",
    }),
  },
};
