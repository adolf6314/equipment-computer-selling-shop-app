import { useEffect, useRef, useState } from "react";
import { buttonCLR } from "../class/Button";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../components/HandleUsers";

export const EmpLogin = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    usernameOrEmail: "username",
    usernameOrEmailResult: "",
    password: "",
    role: "employee",
  });
  const errorLogin = useRef<HTMLDivElement>(null);

  const handleEmpLoginPropsChange = (prop: string, val: string) => {
    setEmployee((prevProps) => ({
      ...prevProps,
      [prop]: val,
    }));
  };

  useEffect(() => {
    if (localStorage.getItem("role"))
      if (localStorage.getItem("role") === "employee")
        navigate("/eqmcpt/provider/profile");
  }, [navigate]);

  return (
    <div className="theme-white h-screen">
      <div className="container mx-auto max-w-screen-xl pt-5">
        <div className="max-w-md mx-auto shadow-lg rounded-lg overflow-hidden bg-[#212529] text-[#dee2e6]">
          <div className="px-4 py-2 text-center">
            <h3 className="font-semibold text-xl mb-1">Sign In</h3>
            <hr />
          </div>
          <div className="px-4 py-2">
            <div className="flex mt-3">
              <button
                id="username"
                className={
                  employee.usernameOrEmail === "username"
                    ? "bg-white text-black p-1"
                    : "border p-1"
                }
                onClick={() =>
                  handleEmpLoginPropsChange("usernameOrEmail", "username")
                }
              >
                Username
              </button>
              <button
                id="email"
                className={
                  employee.usernameOrEmail === "email"
                    ? "bg-white text-black p-1"
                    : "border p-1"
                }
                onClick={() =>
                  handleEmpLoginPropsChange("usernameOrEmail", "email")
                }
              >
                email
              </button>
              <input
                type="text"
                className="ml-1 pl-2 w-3/4 text-black"
                onChange={(e) =>
                  handleEmpLoginPropsChange(
                    "usernameOrEmailResult",
                    e.target.value
                  )
                }
              />
            </div>
            <div className="flex my-3 text-black">
              <label
                htmlFor="password"
                className="border bg-white text-right p-1 w-[30.2%]"
              >
                Password
              </label>
              <input
                type="password"
                className="ml-1 pl-2 w-[69%]"
                onChange={(e) =>
                  handleEmpLoginPropsChange("password", e.target.value)
                }
              />
            </div>
            <div ref={errorLogin} className="hidden">
              <p className="border bg-red-400 text-center py-1"></p>
            </div>
            <button
              className={`${buttonCLR({ color: "Success" })} mt-3 w-full py-1`}
              onClick={() =>
                handleLogin({
                  user: employee,
                  role: "employee",
                  errors: errorLogin,
                })
              }
            >
              Confrim
            </button>
            <button
              className={`${buttonCLR({ color: "Danger" })} my-3 w-full py-1`}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
