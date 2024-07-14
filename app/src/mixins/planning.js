import { computed } from "vue";
import { useStore } from "vuex";

export function usePlanning() {
  const $store = useStore();
  const planning = computed({
    set(value) {
      $store.dispatch("planning/applyCurrentPlanning", value);
    },
    get() {
      return $store.state.planning.planning;
    },
  });

  const isIdFromDB = ({ id }) => {
    return !!id && !isNaN(+id);
  };

  const onEdit = computed(() => {
    return (
      planning.value.hasOwnProperty("id") &&
      isIdFromDB(planning.value ?? { id: null })
    );
  });

  const months = computed(() => {
    return $store.getters["planning/monthGetter"];
  });

  return {
    planning,
    onEdit,
    months,
  };
}
