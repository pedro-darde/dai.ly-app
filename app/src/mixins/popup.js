export const popupVisibility = {
  props: ["value"],
  computed: {
    visible: {
      get() {
        return this.value;
      },
      set(isVisible) {
        this.$emit("isVisible", !!isVisible);
      },
    },
  },
  methods: {
    disband() {
      console.log("vou fechar")
      this.visible = false;
    },
  },
};

export function usePopup(name, defaultVisible = false) {
  name = name.charAt(0).toUpperCase() + name.substring(1);
  const prop = `popup${name}Visible`;
  return {
    data() {
      return {
        [prop]: defaultVisible,
      };
    },
    methods: {
      [`toggle${name}`](to = null) {
        if (to == null) {
          to = !this[prop];
          return;
        }
        this[prop] = to;
      },
    },
  };
}
