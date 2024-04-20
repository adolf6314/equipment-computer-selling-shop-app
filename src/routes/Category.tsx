import { Route, Routes } from "react-router-dom";
import { CateDashboard } from "../Employee/Category/CateDashboard";

export const Category = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<CateDashboard />} />
    </Routes>
  );
};
