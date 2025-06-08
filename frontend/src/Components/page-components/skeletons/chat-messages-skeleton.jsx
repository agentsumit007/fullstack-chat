import { assets } from "../../../assets/assets-path";

const ChatMessagesSkeletons = () => {
  return (
    <div className="h-full overflow-y-auto gap-4 ">
      <div className={` h-[70px] chat ${"chat-start"}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="profile_picture" src={assets.DP_PLACEHOLDER} />
          </div>
        </div>
        <div className="chat-bubble flex flex-col gap-2 w-50 bg-base-100">
          <div className="skeleton h-4 w-25"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
      <div className={` h-[70px] chat ${"chat-end"}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="profile_picture" src={assets.DP_PLACEHOLDER} />
          </div>
        </div>
        <div className="chat-bubble flex flex-col gap-2 w-50 bg-base-100">
          <div className="skeleton h-4 w-25"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
      <div className={` h-[70px] chat ${"chat-end"}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="profile_picture" src={assets.DP_PLACEHOLDER} />
          </div>
        </div>
        <div className="chat-bubble flex flex-col gap-2 w-50 bg-base-100">
          <div className="skeleton h-4 w-25"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
      <div className={` h-[70px] chat ${"chat-start"}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="profile_picture" src={assets.DP_PLACEHOLDER} />
          </div>
        </div>
        <div className="chat-bubble flex flex-col gap-2 w-50 bg-base-100">
          <div className="skeleton h-4 w-25"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
      <div className={` h-[70px] chat ${"chat-end"}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="profile_picture" src={assets.DP_PLACEHOLDER} />
          </div>
        </div>
        <div className="chat-bubble flex flex-col gap-2 w-50 bg-base-100">
          <div className="skeleton h-4 w-25"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
      <div className={` h-[70px] chat ${"chat-start"}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="profile_picture" src={assets.DP_PLACEHOLDER} />
          </div>
        </div>
        <div className="chat-bubble flex flex-col gap-2 w-50 bg-base-100">
          <div className="skeleton h-4 w-25"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
      <div className={` h-[70px] chat ${"chat-start"}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="profile_picture" src={assets.DP_PLACEHOLDER} />
          </div>
        </div>
        <div className="chat-bubble flex flex-col gap-2 w-50 bg-base-100">
          <div className="skeleton h-4 w-25"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
      <div className={` h-[70px] chat ${"chat-end"}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="profile_picture" src={assets.DP_PLACEHOLDER} />
          </div>
        </div>
        <div className="chat-bubble flex flex-col gap-2 w-50 bg-base-100">
          <div className="skeleton h-4 w-25"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessagesSkeletons;
