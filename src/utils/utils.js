export function CreateIdNameTable(array) {
  const result = {};
  array.forEach((item) => {
    result[item.id] = item.name;
  });
  return result;
}
