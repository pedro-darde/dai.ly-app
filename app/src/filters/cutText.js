export default function cutText(text, maxLength = 100) {
  if (text.length > maxLength) {
    return text.substr(0, maxLength).concat("...");
  }
  return text;
}
