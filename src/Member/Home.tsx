import { useLocation } from "react-router-dom";

export const Home = () => {
  const location = useLocation();
  return (
    <>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>{location.pathname}</p>
    </>
  );
};
