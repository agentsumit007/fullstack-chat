import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchChats } from "../../../utils/api-functions";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";
import { setSelectedChat } from "../../../features/selectedChatSlice";
import { setVisibleScreen } from "../../../features/settingsSlice";
import Modal from "../../tools/Modal";
import StartForm from "./start-form";
import { assets } from "../../../assets/assets-path";
import ChatUsersSkeletons from "../skeletons/chat-users-skeletons";
const ChatUsers = () => {
  const { onlineUsers } = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const { _id: myId } = useSelector((state) => state.auth);
  const { _id: selectedChatId } = useSelector((state) => state.selectedChat);
  //modal states
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const openModal = (data) => {
    setModalData(data);
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
    setTimeout(() => {
      setModalData(null);
    }, 200);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["chat-users"],
    queryFn: fetchChats,
  });

  const selectChat = (chat) => {
    dispatch(setSelectedChat(chat));
    dispatch(setVisibleScreen("chat"));
  };

  return (
    <div
      className={`!bg-base-200 h-[calc(100dvh-74px)] lg:h-[calc(100dvh-98px)] relative messages-screen-cards flex flex-col gap-4 w-full lg:w-1/3 `}
    >
      {isLoading ? (
        <ChatUsersSkeletons />
      ) : (
        <>
          {" "}
          {data?.data?.chats.map((chat, i) => {
            let displayUser = chat?.users?.find((v) => v?._id !== myId);
            let chatName = chat?.chatName || displayUser?.fullName;
            return (
              <div
                key={chat?._id || i}
                onClick={() => selectChat(chat)}
                className={`cursor-pointer transition-all ease-in-out duration-200 py-2 px-2 flex gap-3 rounded-lg ${
                  selectedChatId === chat?._id ? "bg-base-100" : "bg-base-300"
                }`}
              >
                <div className="flex justify-center relative">
                  <div
                    className={`avatar ${
                      onlineUsers.includes(displayUser._id)
                        ? "avatar-online"
                        : ""
                    } avatar-placeholder`}
                  >
                    <div className="bg-neutral text-neutral-content w-12 rounded-full">
                      <img
                        className="h-[40px] w-[40px]"
                        src={
                          displayUser?.profilePicture || assets.DP_PLACEHOLDER
                        }
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <p>{chatName}</p>
                </div>
              </div>
            );
          })}
        </>
      )}
      <button
        className="fixed bottom-6 right-6 transition btn btn-primary p-0 rounded-full h-12 w-12 lg:hidden"
        onClick={() =>
          openModal({
            title: "Enter e-mail of the user you want to chat",
            component: <StartForm close={closeModal} />,
          })
        }
      >
        <Plus size={20} />
      </button>
      <Modal isOpen={modal} data={modalData}>
        {modalData?.component}
      </Modal>
    </div>
  );
};

export default ChatUsers;
