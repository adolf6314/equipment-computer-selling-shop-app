export const getStatus = (index: string) => {
  const status: Record<string, string[]> = {
    TH: ["ออนไลน์", "ออฟไลน์"],
    EN: ["Online", "Offline"],
  };

  return index === "all"
    ? { id: status["ID"], name_en: status["EN"], name_th: status["TH"] }
    : {
        id: status["ID"][parseInt(index)],
        name_en: status["EN"][parseInt(index)],
        name_th: status["TH"][parseInt(index)],
      };
};
