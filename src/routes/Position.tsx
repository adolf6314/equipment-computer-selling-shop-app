import { Navigate, Route, Routes } from "react-router-dom";
import { Category } from "./Category";

export const Position = () => {
  const PrivatePostRoute = (element: React.ReactNode, post: number[]) => {
    return localStorage.getItem("token") &&
      localStorage.getItem("post") === "0" ? (
      element
    ) : (
      <Navigate to="/eqmcpt/provider/profile" />
    );
  };
  return (
    <Routes>
      <Route path="/" element={<Category />} />
    </Routes>
  );
};
