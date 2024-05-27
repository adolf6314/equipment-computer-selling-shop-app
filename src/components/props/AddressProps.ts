type Sub_District = {
  id: string;
  name_en: string;
  name_th: string;
  post_code: string;
  dist_id: string;
};

export type District = {
  id: string;
  name_en: string;
  name_th: string;
  prov_id: string;
  sub_districts: Sub_District[];
};

export type Province = {
  id: string;
  name_en: string;
  name_th: string;
  reg_id: string;
  districts: District[];
};

export type Region = {
  id: string;
  name_en: string;
  name_th: string;
  provinces: Province[];
};
