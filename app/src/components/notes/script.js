import HeaderComponent from "../header/Header.vue";
import NavbarComponent from "../nav/Navbar.vue";
import WriteNote from "../write-note/WriteNote.vue";
import Note from "../note/Note.vue";
import {mapGetters} from "vuex";

export default {
    components: {NavbarComponent, HeaderComponent, WriteNote, Note},
    name: "NoteComponent",
    async created() {
        await Promise.all([this.$store.dispatch("note/setCurrentNote"), this.$store.dispatch("note/getLatestNotes"), this.$store.dispatch("task/getAllTasks")])
    },
    computed: {
        ...mapGetters({
            notes: "note/notesGetter",
        }),
    },
};
