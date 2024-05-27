export type Profile = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  role: { id: string; name_en: string; name_th: string };
  gender: { id: string; name_en: string; name_th: string };
  address?: [{ name_en: string; name_th: string }];
};

export type Address = {
  address: string[];
  region: [{ id: string; name_en: string; name_th: string }];
  province: [{ id: string; name_en: string; name_th: string }];
  district: [{ id: string; name_en: string; name_th: string }];
  sub_district: [{ id: string; name_en: string; name_th: string }];
  post_code: string[];
};

export type Password = {
  old_password: string;
  new_password: string;
  repeat_new_password: string;
};
