export default function toMonetary(value, options = { locale: "en-IN", currency: "usd" }) {
  if (typeof value === "string") value = parseFloat(value);
  return Intl.NumberFormat(options.locale, { style: "currency", currency: options.currency }).format(value);
}
