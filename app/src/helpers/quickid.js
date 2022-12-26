const str = (s) => s.toString(36);

export default function quickid() {
  return `${str(+Date.now())}${str(Math.random())}`;
}
