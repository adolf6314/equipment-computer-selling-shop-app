import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Member/Home";
import { Employee } from "./routes/Employee";
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
        <Route path="/eqmcpt/provider/*" element={<Employee />} />

        {/* <Route path="*" element={<Navigate to={"/home"} />} /> */}
      </Routes>
    </Router>
  );
};
