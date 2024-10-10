import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/home.page.tsx";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
