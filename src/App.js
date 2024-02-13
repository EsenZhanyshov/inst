import React from "react";
import Navbar from "./components/SideBar";
import MainRoutes from "./routes/MainRoutes";

const App = () => {
  return (
    <div className="container">
      <MainRoutes />
    </div>
  );
};

export default App;
