import { Navigate, Route, Routes } from "react-router-dom";
import { EmpProfile } from "../Employee/EmpProfile";
import React from "react";
import { EmpLogin } from "../Employee/EmpLogin";
import { EmpDashboard } from "../Employee/EmpDashboard";
import { Category } from "./Category";
import { Brand } from "./Brand";
import { Advertisement } from "./Advertisement";
import { NsdDashboard } from "../Employee/NameSubDetail/NsdDashboard";

export const EmployeeRoutes = () => {
  const PrivateRoute = (element: React.ReactNode) => {
    return localStorage.getItem("token") &&
      localStorage.getItem("role") === "employee" ? (
      element
    ) : (
      <Navigate to="/eqmcpt/provider/login" />
    );
  };

  return (
    <Routes>
      <Route path="/login" element={<EmpLogin />} />
      <Route path="/profile" element={PrivateRoute(<EmpProfile />)} />
      <Route path="/dashboard" element={PrivateRoute(<EmpDashboard />)} />
      <Route path="/category/*" element={PrivateRoute(<Category />)} />
      <Route path="/brand/*" element={PrivateRoute(<Brand />)} />
      <Route
        path="/advertisement/*"
        element={PrivateRoute(<Advertisement />)}
      />
      <Route
        path="/name-sub-detail/*"
        element={PrivateRoute(<NsdDashboard />)}
      />
    </Routes>
  );
};
