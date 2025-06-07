import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/auth/login";
import MainLayout from "./Components/layout/main-layout";
import Messages from "./pages/messages";
import Signup from "./pages/auth/signup";
import { useSelector } from "react-redux";
import { themes } from "./utils/utils";
const App = () => {
  const { theme } = useSelector((state) => state.settings);
  return (
    <div data-theme={theme || localStorage.getItem("theme-var") || themes[0]}>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/auth/login"
          element={
            <MainLayout>
              <Login />
            </MainLayout>
          }
        />
        <Route
          path="/auth/sign-up"
          element={
            <MainLayout>
              <Signup />
            </MainLayout>
          }
        />
        <Route
          path="/messages"
          element={
            <MainLayout hasHeader authGuard>
              <Messages />
            </MainLayout>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
