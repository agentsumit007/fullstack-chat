import React from "react";
import { assets } from "../../../assets/assets-path";

const ChatUsersSkeletons = () => {
  return (
    <>
      <div
        className={` transition-all ease-in-out duration-200 py-0 px-1 lg:py-2 lg:px-2 flex gap-3 rounded-lg bg-base-300 `}
      >
        <div className="flex justify-center relative">
          <div className={`avatar  avatar-placeholder`}>
            <div className="w-12 rounded-full">
              <img
                className="h-[40px] w-[40px]"
                src={assets.DP_PLACEHOLDER}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center w-60">
          <p>
            <div className="skeleton h-4 w-full"></div>
          </p>
        </div>
      </div>
      <div
        className={` transition-all ease-in-out duration-200 py-0 px-1 lg:py-2 lg:px-2 flex gap-3 rounded-lg bg-base-300 `}
      >
        <div className="flex justify-center relative">
          <div className={`avatar  avatar-placeholder`}>
            <div className="w-12 rounded-full">
              <img
                className="h-[40px] w-[40px]"
                src={assets.DP_PLACEHOLDER}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center w-60">
          <p>
            <div className="skeleton h-4 w-full"></div>
          </p>
        </div>
      </div>
      <div
        className={` transition-all ease-in-out duration-200 py-0 px-1 lg:py-2 lg:px-2 flex gap-3 rounded-lg bg-base-300 `}
      >
        <div className="flex justify-center relative">
          <div className={`avatar  avatar-placeholder`}>
            <div className="w-12 rounded-full">
              <img
                className="h-[40px] w-[40px]"
                src={assets.DP_PLACEHOLDER}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center w-60">
          <p>
            <div className="skeleton h-4 w-full"></div>
          </p>
        </div>
      </div>
    </>
  );
};

export default ChatUsersSkeletons;
