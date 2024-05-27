export const getRoles = (index: string) => {
  const roles: Record<string, string[]> = {
    ID: ["0", "1", "2", "3"],
    TH: ["เจ้าของร้าน", "ผู้ดูแลระบบ", "พนักงานขาย", "พนักงานจัดส่ง"],
    EN: ["Owner", "Admin", "Salesman", "Delivery man"],
  };

  return index === "all"
    ? { id: roles["ID"], name_en: roles["EN"], name_th: roles["TH"] }
    : {
        id: roles["ID"][parseInt(index)],
        name_en: roles["EN"][parseInt(index)],
        name_th: roles["TH"][parseInt(index)],
      };
};
