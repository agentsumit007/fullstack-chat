import React from "react";
import Header from "./header";
import Footer from "./footer";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const MainLayout = ({ children, hasHeader, hasFooter, authGuard }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (authGuard && !isLoggedIn) {
    return <Navigate to={"/auth/login"} />;
  }

  return (
    <>
      {hasHeader && <Header />}
      {children}
      {hasFooter && <Footer />}
    </>
  );
};

export default MainLayout;
