export const getUserValue = (value: any, language: string) => {
  if (typeof value === "object") {
    if (Array.isArray(value)) return value[0][`name_${language.toLowerCase()}`];
    return value[`name_${language.toLowerCase()}`];
  } else return value;
};
