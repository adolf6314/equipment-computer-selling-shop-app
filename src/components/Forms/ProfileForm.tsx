import { useEffect, useState } from "react";
import { getUserLabel } from "../labels/UserLabel";
import { getUserIcon } from "../Icons/UserIcon";
import { getGenders } from "../items_in_props/Genders";
import { getUserValue } from "../items_in_props/Values";
import { handleGetAllAddress, handleUserAddressUpdate } from "../HandleAddress";
import {
  getDistricts,
  getProvinces,
  getRegions,
  getSubDistricts,
} from "../items_in_props/Address";
import { Region } from "../props/AddressProps";
import { LoaderCircle } from "../../class/Loader";
import { buttonCLR } from "../../class/Button";

export const ProfileForm = ({
  propStyle,
  properties,
  language,
  handleClose,
}: {
  propStyle: any;
  properties: any;
  language: string;
  handleClose: () => void;
}) => {
  const [myProps, setMyProps] = useState<any | {}>({});
  const [address, setAddress] = useState<Region[] | null>(null);
  const [valuesInProps, setValuesInProps] = useState<{
    [key: string]: { id: any; name_en: any; name_th: any };
  }>({});
  const [menus, setMenus] = useState<{ [key: string]: boolean }>({
    gender: false,
    region: false,
    province: false,
    district: false,
    sub_district: false,
  });
  const [errors, setErrors] = useState<{
    [key: string]: { name_en: string; name_th: string };
  }>({});

  useEffect(() => {
    setMyProps(properties);
    if (properties.region) {
      handleGetAllAddress({ setAddress: setAddress });
    }
  }, [properties, setMyProps, handleGetAllAddress]);

  useEffect(() => {
    if (address) {
      const region = address.find((reg) => reg.id === properties.region[0].id)!;
      const province = region.provinces.find(
        (prov) => prov.id === properties.province[0].id
      )!;
      const district = province.districts.find(
        (dist) => dist.id === properties.district[0].id
      )!;

      setValuesInProps({
        region: getRegions(address),
        province: getProvinces(region),
        district: getDistricts(province),
        sub_district: getSubDistricts(district),
      });
    } else
      setValuesInProps({
        gender: getGenders("all"),
      });
  }, [address, setValuesInProps]);

  const handleMyProps = (prop: string, value: any) => {
    setMyProps((prevMyProps: any) => ({
      ...prevMyProps,
      [prop]: value,
    }));
  };

  const toggleDropDown = (menuType: string) => {
    setMenus((prevMenus) => ({
      ...prevMenus,
      gender: menuType === "gender" ? !prevMenus.gender : false,
      region: menuType === "region" ? !prevMenus.region : false,
      province: menuType === "province" ? !prevMenus.province : false,
      district: menuType === "district" ? !prevMenus.district : false,
      sub_district:
        menuType === "sub_district" ? !prevMenus.sub_district : false,
    }));
  };

  const inputGroup = (props: string[]) => {
    // return one or two input elements
    return (
      <>
        {props.map((prop, nMod) => (
          <input
            key={prop}
            type="text"
            className={`border border-gray-400 px-2 py-1 ${
              props.length < 2
                ? "w-[27.4rem]"
                : (nMod + 1) % 2 !== 0
                ? "mr-[0.3rem] w-[13rem]"
                : "ml-[0.3rem] w-[13.8rem]"
            } ${errors[prop] && "placeholder-red-500"}`}
            defaultValue={myProps[prop]}
            placeholder={
              errors[prop]
                ? (errors[prop] as any)[`name_${language.toLowerCase()}`]
                : getUserLabel(prop, language)
            }
            onChange={(e) => handleMyProps(prop, e.target.value)}
          />
        ))}
      </>
    );
  };

  const dropdownGroup = (props: string[]) => {
    // return one or two dropdown items
    return (
      <>
        {props.map((prop, nMod) => (
          <div
            key={prop}
            className={`relative ${
              props.length < 2
                ? "w-[27.36rem]"
                : (nMod + 1) % 2 !== 0
                ? "mr-[0.3rem] w-[13rem]"
                : "ml-[0.3rem] w-[13.8rem]"
            }`}
          >
            <button
              className="border border-gray-400 px-2 py-[0.4rem] w-full flex items-center justify-between"
              onClick={() => toggleDropDown(prop)}
            >
              {getUserValue(myProps[prop], language)}
              <i
                className={`fa-solid fa-caret-down text-zinc-600 ${
                  menus[prop] && "rotate-180"
                }`}
              ></i>
            </button>
            {menus[prop] && (
              <div className="absolute mt-1 theme-white w-full z-50">
                <div className="border border-black p-1 max-h-[11rem] overflow-y-auto scrollbar-1px scrollbar-thumb-black scrollbar-track-white">
                  {Object.values(
                    (valuesInProps as any)[prop][
                      `name_${language.toLowerCase()}`
                    ]
                  ).map((val, num) => (
                    <div key={`${prop}_${num}`}>
                      <button
                        className={`text-start w-full hover:bg-black hover:text-white ${
                          getUserValue(myProps[prop], language) === val &&
                          "bg-black text-white"
                        }`}
                        onClick={() => (
                          <>
                            {handleMyProps(prop, {
                              id: (valuesInProps as any)[prop]["id"][num],
                              name_en: (valuesInProps as any)[prop]["name_en"][
                                num
                              ],
                              name_th: (valuesInProps as any)[prop]["name_th"][
                                num
                              ],
                            })}
                            {toggleDropDown(prop)}
                          </>
                        )}
                      >
                        {String(val)}
                      </button>
                      {Object.values(valuesInProps[prop].id).length - 1 !==
                        num && <hr className="my-1 border border-gray-600" />}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </>
    );
  };

  const propPathCheck = (props: string | string[]) => {
    props = typeof props !== "string" ? props : [props];

    if (
      props[0] === "gender" ||
      props[0] === "region" ||
      props[0] === "province" ||
      props[0] === "district" ||
      props[0] === "sub_district"
    )
      return dropdownGroup(props);

    return inputGroup(props);
  };

  const destinationEventPath = () => {
    //
    if (myProps.region)
      handleUserAddressUpdate({
        address: myProps as any,
        setErrors: setErrors,
      });
  };

  return (
    <>
      {!address && myProps.region ? (
        <LoaderCircle height="16rem" color="red" />
      ) : (
        <>
          {propStyle.map((prop: any, key: number) => (
            <div key={key} className="flex mb-3">
              <div
                className={`${getUserIcon(
                  typeof prop !== "string" ? prop[0] : prop
                )} w-[2.5rem] text-zinc-600 text-2xl border border-r-0 border-gray-400 rounded 
            rounded-r-none bg-zinc-300 h-[2.4rem] flex items-center justify-center`}
              ></div>
              {propPathCheck(prop)}
            </div>
          ))}
          <button
            className={`${buttonCLR({
              color: "Success",
            })} mt-1 mb-3 w-full py-1`}
            onClick={destinationEventPath}
          >
            Confirm
          </button>
          <button
            className={`${buttonCLR({
              color: "Danger",
            })} w-full py-1`}
            onClick={handleClose}
          >
            Cancel
          </button>
        </>
      )}
    </>
  );
};
