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
          <h1 className="text-4xl font-bold">Chat 'em!</h1>
        </div>

        <RotatingVisual visualSize={visualSize} />

        {ProceedButton && <ProceedButton />}
      </div>
    </div>
  );
};

export default HeroSection;
