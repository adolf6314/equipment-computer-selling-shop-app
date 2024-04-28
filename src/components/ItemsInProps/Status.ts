export const getStatus = (index: string, language: string) => {
  const status: Record<string, string[]> = {
    TH: ["ออนไลน์", "ออฟไลน์"],
    EN: ["Online", "Offline"],
  };

  const indexConV = parseInt(index);

  return language !== "all"
    ? index !== ""
      ? status[language][indexConV]
      : status[language]
    : [status["TH"][indexConV], status["EN"][indexConV]];
};
