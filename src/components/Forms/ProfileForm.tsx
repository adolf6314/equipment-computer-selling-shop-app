import {
  AccountBoxRounded,
  EmailRounded,
  PersonRounded,
  PhoneIphoneRounded,
  WcRounded,
} from "@mui/icons-material";
import { ReactNode, useState } from "react";

export const ProfileForm = ({
  myProfile,
  properties,
  language,
}: {
  myProfile: any;
  properties: Array<string | string[]>;
  language: string;
}) => {
  const [menus, setMenus] = useState({
    gender: false,
  });
  const [user, setUser] = useState({
    firstname: myProfile.firstname ? myProfile.firstname : "",
    lastname: myProfile.lastname ? myProfile.lastname : "",
    email: myProfile.email ? myProfile.email : "",
    phone: myProfile.phone ? myProfile.phone : "",
    gender: myProfile.gender ? myProfile.gender : "",
  });
  const icons: Record<string, ReactNode> = {
    firstname: <PersonRounded sx={{ fontSize: 30 }} color="action" />,
    username: <AccountBoxRounded sx={{ fontSize: 30 }} color="action" />,
    email: <EmailRounded sx={{ fontSize: 30 }} color="action" />,
    phone: <PhoneIphoneRounded sx={{ fontSize: 30 }} color="action" />,
    gender: <WcRounded sx={{ fontSize: 30 }} color="action" />,
  };

  const toggleDropDown = (menuType: string) => {
    setMenus((prevMenus) => ({
      ...prevMenus,
      gender: menuType === "gender" ? !prevMenus.gender : false,
    }));
  };

  const handleUser = (prop: string, value: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      [prop]: value,
    }));
  };

  const InputGroups = (props: string[]) => {
    switch (props.length) {
      case 1:
        return (
          <>
            <label
              htmlFor={props[0]}
              className="border border-gray-400 rounded rounded-r-none bg-zinc-300 p-1"
            >
              {icons[props[0]]}
            </label>
            <input
              type="text"
              className="w-full border border-gray-400 border-l-0 rounded rounded-l-none p-1"
            />
          </>
        );
      case 2:
        return (
          <>
            <label
              htmlFor={props.join("_")}
              className="border border-gray-400 rounded rounded-r-none bg-zinc-300 p-1"
            >
              <PersonRounded sx={{ fontSize: 30 }} color="action" />
            </label>
            <input
              type="text"
              className="w-full border border-gray-400 border-l-0 mr-[0.1rem] p-1"
              placeholder="Firstname"
            />
            <input
              type="text"
              className="w-full border border-gray-400 rounded rounded-l-none ml-[0.1rem] p-1"
              placeholder="Lastname"
            />
          </>
        );
    }
  };

  const DropdownGroups = (props: string[]) => {
    switch(props.length){
        case 1:
            return
    }
  };
};
