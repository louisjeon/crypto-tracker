export const getInterface = (data: Object) => {
  let content = "";
  Object.entries(data).forEach(
    (entry) => (content += entry[0] + ": " + typeof entry[1] + ";\n")
  );
  console.log(content);
};
