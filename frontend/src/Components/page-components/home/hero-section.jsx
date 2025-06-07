import { MessageSquareText, MessagesSquare } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import RotatingVisual from "./rotating-visual";
const HeroSection = ({ ProceedButton, visualSize = 270 }) => {
  const navigate = useNavigate();
  return (
    <div className="hero-content text-center p-0">
      <div className=" flex flex-col justify-start gap-20 h-[650px]">
        <div className="flex flex-col items-center gap-10">
          <MessagesSquare className="self-center" size={120} strokeWidth={1} />
          <h1 className="text-4xl font-bold">CHAT chat</h1>
        </div>
        {/* <div className="text-lg  flex flex-col gap-4 justify-start text-center">
          <span>Chat effortlessly with anyone, anytime, anywhere.</span>
          <span>Stay private, stay secure.</span>
          <span>Built for speed, designed for connection, made for you.</span>
        </div> */}
        <RotatingVisual visualSize={visualSize} />

        {ProceedButton && <ProceedButton />}
      </div>
    </div>
  );
};

export default HeroSection;
