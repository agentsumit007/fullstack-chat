import { useSelector } from "react-redux";
import ChatHeader from "./chat-header";
import ChatMessages from "./chat-messages";
import ChatInput from "./chat-input";
import NoChat from "./no-chat";

const Chat = () => {
  const selectedChat = useSelector((state) => state.selectedChat);

  return (
    <div
      className={`h-[calc(100dvh)] lg:h-[calc(100dvh-98px)] messages-screen-cards w-full lg:w-2/3`}
    >
      {selectedChat?._id ? (
        <div className="h-full flex flex-col justify-between">
          <ChatHeader />
          <ChatMessages />
          <ChatInput />
        </div>
      ) : (
        <NoChat />
      )}
    </div>
  );
};

export default Chat;
