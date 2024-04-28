export const getWorkStatus = (index: string, language: string) => {
  const work_status: Record<string, string[]> = {
    TH: ["ดำเนินงาน", "ลาออก"],
    EN: ["Operate", "Resign"],
  };

  const indexConV = parseInt(index);

  return language !== "all"
    ? index !== ""
      ? work_status[language][indexConV]
      : work_status[language]
    : [work_status["TH"][indexConV], work_status["EN"][indexConV]];
};
