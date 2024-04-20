export type EmpProfileProps = {
  Firstname: string;
  Lastname: string;
  Username: string;
  Email: string;
  Phone: string;
  Role: string[];
  Gender: string[];
  Address: string[];
};

export const setEmpProfileDetailsByLang = (
  myProfile: EmpProfileProps,
  language: string
) => {
  if (language !== "EN") {
    return {
      ชื่อ: myProfile.Firstname,
      นามสกุล: myProfile.Lastname,
      ชื่อผู้ใช้: myProfile.Username,
      อีเมล: myProfile.Email,
      เบอร์โทร: myProfile.Phone,
      ตำแหน่ง: myProfile.Role[0],
      เพศ: myProfile.Gender[0],
      ที่อยู่: myProfile.Address[0],
    };
  }
  return {
    Firstname: myProfile.Firstname,
    Lastname: myProfile.Lastname,
    Username: myProfile.Username,
    Email: myProfile.Email,
    Phone: myProfile.Phone,
    Role: myProfile.Role[1],
    Gender: myProfile.Gender[1],
    Address: myProfile.Address[1],
  };
};
