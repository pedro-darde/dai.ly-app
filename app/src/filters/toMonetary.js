export default function toMonetary(value, options = { locale: "pt-br" }) {
  if (typeof value === "string") value = parseFloat(value);
  return Intl.NumberFormat(options.locale).format(value);
}
