import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../pages/Shared/NavBar";
import Footer from "../pages/Shared/Footer";
import Container from "../components/Container";
import { DarkModeContext } from "../providers/DarkModeProvider";

const Main = () => {
  const { darkMode, toggleMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "dark-mode min-h-screen overflow-hidden" : "white-mode min-h-screen overflow-hidden"}>
      <NavBar toggleMode={toggleMode} darkMode={darkMode} />
      <div className={darkMode ? "dark-mode min-h-[calc(100vh-250px)]" : "min-h-[calc(100vh-250px)]"}>
        <Container>
          <Outlet />
        </Container>
      </div>
      <Footer darkMode={darkMode} />
    </div>
  );
};

export default Main;
