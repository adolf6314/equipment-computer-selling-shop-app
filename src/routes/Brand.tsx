import { Route, Routes } from "react-router-dom";
import { BrdDashboard } from "../Employee/Brand/BrdDashboard";

export const Brand = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<BrdDashboard />} />
    </Routes>
  );
};
