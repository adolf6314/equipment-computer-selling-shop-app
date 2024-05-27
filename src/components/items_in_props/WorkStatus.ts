export const getWorkStatus = (index: string) => {
  const work_status: Record<string, string[]> = {
    ID: ["1", "0"],
    TH: ["ดำเนินงาน", "ลาออก"],
    EN: ["Operate", "Resign"],
  };

  return index === "all"
    ? { id: work_status["ID"], name_en: work_status["EN"], name_th: work_status["TH"] }
    : {
        id: work_status["ID"][parseInt(index)],
        name_en: work_status["EN"][parseInt(index)],
        name_th: work_status["TH"][parseInt(index)],
      };
};
