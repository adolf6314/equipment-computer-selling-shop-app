export const getGenders = (index: string) => {
  const genders: Record<string, string[]> = {
    ID: ["0", "1"],
    TH: ["ชาย", "หญิง"],
    EN: ["Male", "Female"],
  };

  return index === "all"
    ? { id: genders["ID"], name_en: genders["EN"], name_th: genders["TH"] }
    : {
        id: genders["ID"][parseInt(index)],
        name_en: genders["EN"][parseInt(index)],
        name_th: genders["TH"][parseInt(index)],
      };
};
