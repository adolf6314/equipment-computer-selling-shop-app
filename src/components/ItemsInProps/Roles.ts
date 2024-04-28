export const getRoles = (index: string, language: string) => {
  const roles: Record<string, string[]> = {
    TH: ["เจ้าของร้าน", "ผู้ดูแลระบบ", "พนักงานขาย", "พนักงานจัดส่ง"],
    EN: ["Owner", "Admin", "Salesman", "Delivery man"],
  };

  const indexConV = parseInt(index);

  return language !== "all"
    ? index !== ""
      ? roles[language][indexConV]
      : roles[language]
    : [roles["TH"][indexConV], roles["EN"][indexConV]];
};
