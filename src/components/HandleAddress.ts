import { Address } from "./props/ProfileFormProps";

export const handleGetAllAddress = async ({
  setAddress,
}: {
  setAddress: (address: any) => void;
}) => {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/eqmcpt/user/get/all/address",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!response.ok) throw new Error("Not Found Address Data");
    else {
      const { address } = await response.json();

      setAddress(address);
    }
  } catch (error) {
    console.error(error);
  }
};

export const handleUserAddressUpdate = async ({
  address,
  setErrors,
}: {
  address: Address;
  setErrors: (error: {
    [key: string]: { name_en: string; name_th: string };
  }) => void;
}) => {
  try {
    if (`${address.address}` === "")
      setErrors({
        address: {
          name_en: "Please, Enter address data.",
          name_th: "กรุณากรอกข้อมูลที่อยู่",
        },
      });

    const response = await fetch(
      "http://127.0.0.1:8000/api/eqmcpt/user/update/address",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(address),
      }
    );
  } catch (error) {
    console.error(error);
  }
};
