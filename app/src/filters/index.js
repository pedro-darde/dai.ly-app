import toDateBR from "./toDateBR";
import cutText from "./cutText";
import toMonetary from "./toMonetary";


export const useFilters = () => {
  return  {
    cutText,
    toDateBR,
    toMonetary,
  };
}
