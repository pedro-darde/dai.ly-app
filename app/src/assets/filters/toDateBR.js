import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
export default function toDateBR(date, isDateTime = true) {
  if (!isDateTime) return format(new Date(date), "dd/mm/yyyy", { locale: ptBR });
  console.log(date);
  return format(new Date(date), "d/M/Y H:m:ss", { locale: ptBR });
}
