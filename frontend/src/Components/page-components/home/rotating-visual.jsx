import React from "react";
import {
  BringToFront,
  Codesandbox,
  Diameter,
  Disc3,
  Hexagon,
  LoaderCircle,
  LocateFixed,
  MessageSquareText,
  Radar,
  RadiusIcon,
  Shell,
  Slack,
  Sun,
  SunDim,
  Torus,
  Volleyball,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
const RotatingVisual = ({ visualSize = 270 }) => {
  const big = visualSize;
  const small = visualSize - visualSize / 3;
  const navigate = useNavigate();
  return (
    <div
      className="relative cursor-pointer w-fit"
      onClick={() => navigate("/")}
    >
      <Hexagon
        className="self-center rotate start-1/2 top-1/2"
        size={big}
        strokeWidth={0.4}
      />
      <div
        className="bg-red absolute "
        style={{
          top: `calc(50% - ${small / 2}px)`,
          left: `calc(50% - ${small / 2}px)`,
        }}
      >
        <Radar
          className="self-center rotate-rev"
          size={small}
          strokeWidth={0.4}
        />
      </div>
    </div>
  );
};

export default RotatingVisual;
