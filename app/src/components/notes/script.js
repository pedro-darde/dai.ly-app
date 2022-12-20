import HeaderComponent from "../header/Header.vue";
import NavbarComponent from "../nav/Navbar.vue";
import WriteNote from "../write-note/WriteNote.vue";
import Note from "../note/Note.vue";
import { mapGetters } from "vuex";
export default {
  components: { NavbarComponent, HeaderComponent, WriteNote, Note },
  name: "NoteComponent",
  async created() {
    this.$store.dispatch("note/setCurrentNote");
    await this.$store.dispatch("note/getLatestNotes");
  },
  computed: {
    ...mapGetters({
      notes: "note/notesGetter",
    }),
  },
};
