export default function getNumbersSearchQuery() {
  let digits = (Math.random() * 9e6 + 1e6).toFixed();
  const query = [];
  while (digits.length > 0) {
    const pos = Math.floor(Math.random() * (digits.length - 1)) + 1;
    query.push(digits.substring(0, pos));
    digits = digits.substring(pos);
  }
  return query.join(" ");
}
