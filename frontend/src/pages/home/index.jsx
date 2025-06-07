import { ArrowBigRightDash, MessageSquareText } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeroSection from "../../Components/page-components/home/hero-section";

const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const proceed = (e) => {
    e.preventDefault();
    navigate("/auth/login");
    // if (isLoggedIn) {
    //   navigate("/messages");
    // } else {
    // }
  };
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <HeroSection
          ProceedButton={() => (
            <button
              type="button"
              onClick={proceed}
              className="btn btn-primary flex gap-2 self-center h-[50px] w-fit px-5"
            >
              <ArrowBigRightDash />
              <span className="text-lg">Get Started</span>
            </button>
          )}
          visualSize={270}
        />
      </div>
    </div>
  );
};

export default Home;
