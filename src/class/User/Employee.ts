export type EmployeePasswordProps = {
  old_password: string;
  new_password: string;
  repeat_new_password: string;
};

export const getEmpLabels = ({
  index,
  language,
}: {
  index: string;
  language: string;
}) => {
  const keys: Record<string, string[]> = {
    firstname: ["ชื่อ", "Firstname"],
    lastname: ["นามสกุล", "Lastname"],
    username: ["ชื่อผู้ใช้", "Username"],
    email: ["อีเมล", "Email"],
    phone: ["เบอร์โทร", "Phone"],
    role: ["ตำแหน่ง", "Role"],
    gender: ["เพศ", "Gender"],
    address: ["ที่อยู่", "Address"],
    old_password: ["รหัสผ่านเก่า", "Old password"],
    new_password: ["รหัสผ่านใหม่", "New password"],
    repeat_new_password: ["รหัสผ่านใหม่อีกครั้ง", "Repeat new password"],
  };
  return keys[index][language !== "EN" ? 0 : 1];
};

export const getRoles = ({
  index,
  language,
}: {
  index: string;
  language: string;
}) => {
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

export const getWorkStatus = ({
  index,
  language,
}: {
  index: number;
  language: string;
}) => {
  const work_status: Record<string, string[]> = {
    TH: ["ดำเนินงาน", "ลาออก"],
    EN: ["Operate", "Resign"],
  };
  return index !== -1 ? work_status[language][index] : work_status[language];
};
