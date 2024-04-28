import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Member/Home";
import { EmployeeRoutes } from "./routes/EmployeeRoutes";
import { useEffect, useState } from "react";

export const App = () => {
  useEffect(() => {
    if (!localStorage.getItem("language"))
      localStorage.setItem("language", "EN");
  }, []);

  return (
    <Router>
      <Routes>
        {/* Default Route */}
        <Route path="/home" element={<Home />} />

        {/* Employee or Provider Route */}
        <Route path="/eqmcpt/provider/*" element={<EmployeeRoutes />} />

        {/* <Route path="*" element={<Navigate to={"/home"} />} /> */}
      </Routes>
    </Router>
  );
};
