export const getUserValue = (
  value: number | string | string[],
  language: string
) => {
  if (typeof value === "object") return language !== "EN" ? value[0] : value[1];
  else return value;
};
