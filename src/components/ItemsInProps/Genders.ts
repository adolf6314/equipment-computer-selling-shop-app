export const getGenders = (index: string, language: string) => {
  const genders: Record<string, string[]> = {
    TH: ["ชาย", "หญิง"],
    EN: ["Male", "Female"],
  };

  const indexConV = parseInt(index);

  return language !== "all"
    ? index !== ""
      ? genders[language][indexConV]
      : genders[language]
    : [genders["TH"][indexConV], genders["EN"][indexConV]];
};
