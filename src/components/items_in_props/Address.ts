import { District, Province, Region } from "../props/AddressProps";
import { Address } from "../props/ProfileFormProps";

export const getAddress = (address: Address) => {
  const results: { [key: string]: string[] } = {
    name_en: [],
    name_th: [],
  };

  for (let index = 0; index < Object.values(address.address).length; index++) {
    results.name_en.push(
      `${address.address[index]}, ${address.province[index].name_en}, ${address.district[index].name_en}, ${address.sub_district[index].name_en}, ${address.post_code[index]}`
    );
    results.name_th.push(
      `${address.address[index]}, ${address.province[index].name_th}, ${address.district[index].name_th}, ${address.sub_district[index].name_th}, ${address.post_code[index]}`
    );
  }

  return results;
};

type AddressProps = {
  id: string[];
  name_en: string[];
  name_th: string[];
};

export const getRegions = (address: Region[]) => {
  const regions: AddressProps = { id: [], name_en: [], name_th: [] };

  for (let index = 0; index < Object.values(address).length; index++) {
    regions.id.push(address[index].id);
    regions.name_en.push(address[index].name_en);
    regions.name_th.push(address[index].name_th);
  }

  return regions;
};

export const getProvinces = (address: Region) => {
  const provinces: AddressProps = { id: [], name_en: [], name_th: [] };

  for (
    let index = 0;
    index < Object.values(address.provinces).length;
    index++
  ) {
    provinces.id.push(address.provinces[index].id);
    provinces.name_en.push(address.provinces[index].name_en);
    provinces.name_th.push(address.provinces[index].name_th);
  }

  return provinces;
};

export const getDistricts = (address: Province) => {
  const districts: AddressProps = { id: [], name_en: [], name_th: [] };

  for (
    let index = 0;
    index < Object.values(address.districts).length;
    index++
  ) {
    districts.id.push(address.districts[index].id);
    districts.name_en.push(address.districts[index].name_en);
    districts.name_th.push(address.districts[index].name_th);
  }

  return districts;
};

export const getSubDistricts = (address: District) => {
  const sub_districts: AddressProps = { id: [], name_en: [], name_th: [] };

  for (
    let index = 0;
    index < Object.values(address.sub_districts).length;
    index++
  ) {
    sub_districts.id.push(address.sub_districts[index].id);
    sub_districts.name_en.push(
      `${address.sub_districts[index].name_en}, ${address.sub_districts[index].post_code}`
    );
    sub_districts.name_th.push(
      `${address.sub_districts[index].name_th}, ${address.sub_districts[index].post_code}`
    );
  }

  return sub_districts;
};
