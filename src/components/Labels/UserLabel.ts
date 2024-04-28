export const getUserLabel = (prop: string, language: string) => {
  const labels: Record<string, string[]> = {
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
    region: ["ภูมิภาค", "Region"],
    province: ["จังหวัด", "Province"],
    district: ["เขต|อำเภอ", "District"],
    sub_district: ["แขวง|ตำบล", "Sub district"],
  };

  return labels[prop][language !== "EN" ? 0 : 1];
};
