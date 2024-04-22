export type EmpProfileProps = {
  Fullname: string;
  Username: string;
  Email: string;
  Phone: string;
  Role: string[];
  Gender: string[];
  Address: string[];
};

export const getEmpRolesByLang = ({ language }: { language: string }) => {
  if (language !== "EN") {
    return ["ผู้ดูแลระบบ", "พนักงานขาย", "พนักงานส่งของ"];
  }
  return ["Admin", "Employee", "Delivery Worker"];
};

export const getEmpWorkStatusByLang = ({ language }: { language: string }) => {
  if (language !== "EN") {
    return ["ดำเนินงาน", "ลาออก"];
  }
  return ["Operate", "Resign"];
};

export const setEmpProfileDetailsByLang = (
  myProfile: EmpProfileProps,
  language: string
) => {
  if (language !== "EN") {
    return {
      "ชื่อ-นามสกุล": myProfile.Fullname,
      ชื่อผู้ใช้: myProfile.Username,
      อีเมล: myProfile.Email,
      เบอร์โทร: myProfile.Phone,
      ตำแหน่ง: myProfile.Role[0],
      เพศ: myProfile.Gender[0],
      ที่อยู่: myProfile.Address[0],
    };
  }
  return {
    Fullname: myProfile.Fullname,
    Username: myProfile.Username,
    Email: myProfile.Email,
    Phone: myProfile.Phone,
    Role: myProfile.Role[1],
    Gender: myProfile.Gender[1],
    Address: myProfile.Address[1],
  };
};
