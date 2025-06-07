import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { unselectChat } from "../../../features/selectedChatSlice";
import { setVisibleScreen } from "../../../features/settingsSlice";
import { assets } from "../../../assets/assets-path";

const ChatHeader = () => {
  const { onlineUsers } = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const selectedChat = useSelector((state) => state.selectedChat);
  const { _id: myId } = useSelector((state) => state.auth);
  let displayUser = selectedChat?.users?.find((v) => v?._id !== myId);
  let chatName = selectedChat?.chatName || displayUser?.fullName;
  const handleUnselectChat = () => {
    dispatch(unselectChat());
    dispatch(setVisibleScreen("users"));
  };

  return (
    <div>
      <div className="flex justify-between items-center py-0 px-1 lg:py-2 lg:px-2">
        <div
          className={`cursor-pointer flex items-center gap-3 w-full rounded-lg `}
        >
          {/* <div
            className="h-full cursor-pointer lg:hidden"
            onClick={() => dispatch(setVisibleScreen("users"))}
          >
            <ChevronLeft />
          </div> */}
          <div className="flex justify-center">
            <div
              className={`avatar ${
                onlineUsers.includes(displayUser._id) ? "avatar-online" : ""
              } avatar-placeholder`}
            >
              <div className="bg-neutral text-neutral-content w-12 rounded-full">
                <img
                  className="h-[40px] w-[40px]"
                  src={displayUser?.profilePicture || assets.DP_PLACEHOLDER}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className=" flex flex-col justify-center">
            <p>{chatName}</p>
          </div>
        </div>
        <div
          className="w-[50px] cursor-pointer flex justify-center"
          onClick={() => handleUnselectChat()}
        >
          <X size={25} />
        </div>
      </div>
      <div className="divider m-0"></div>
    </div>
  );
};

export default ChatHeader;
