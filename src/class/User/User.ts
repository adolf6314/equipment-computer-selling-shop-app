export const getGenders = ({
  index,
  language,
}: {
  index: string;
  language: string;
}) => {
  const genders: Record<string, string[]> = {
    TH: ["ชาย", "หญิง"],
    EN: ["Male", "Female"],
  };
  const indexConV = parseInt(index);

  return language !== "all"
    ? index !== ""
      ? genders[language][indexConV]
      : genders[language]
    : [genders["TH"][indexConV], genders["EN"][indexConV]];
};

export const getStatus = ({
  index,
  language,
}: {
  index: number;
  language: string;
}) => {
  const status: Record<string, string[]> = {
    TH: ["ออนไลน์", "ออฟไลน์"],
    EN: ["Online", "Offline"],
  };
  return index !== -1 ? status[language][index] : status[language];
};

export const getValue = ({
  value,
  language,
}: {
  value: number | string | string[];
  language: string;
}) => {
  switch (typeof value) {
    case "object":
      return language !== "EN" ? value[0] : value[1];
    default:
      return value;
  }
};
