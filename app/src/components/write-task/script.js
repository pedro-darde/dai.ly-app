import Input from "../input/Input.vue";
export default {
  components: { Input },
  data: () => ({
    task: {
      about: "",
      expectedTime: 0,
      startAt: new Date(),
      endedAt: null,
      timeSpent: 0,
    },
  }),
};
