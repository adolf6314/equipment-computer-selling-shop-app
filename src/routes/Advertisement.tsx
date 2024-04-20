import { Route, Routes } from "react-router-dom";
import { AdvertDashboard } from "../Employee/Advertisement/AdvertDashboard";

export const Advertisement = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<AdvertDashboard />} />
    </Routes>
  );
};
