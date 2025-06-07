import Chat from "../../Components/page-components/messages/chat";
import ChatUsers from "../../Components/page-components/messages/chat-users";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { getSocket } from "../../utils/socket";
import { useEffect } from "react";
import { setOnlineUsers } from "../../features/settingsSlice";

const Messages = () => {
  const dispatch = useDispatch();
  const { visibleScreen, onlineUsers } = useSelector((state) => state.settings);
  const isMob = useMediaQuery({
    query: "(max-width: 1024px)",
  });
  const socket = getSocket();
  useEffect(() => {
    if (!socket) return;

    const handleOnlineUsers = (userIds) => {
      dispatch(setOnlineUsers(userIds));
    };

    socket.on("online-users", handleOnlineUsers);

    socket.emit("request-online-users");

    return () => {
      socket.off("online-users", handleOnlineUsers);
    };
  }, [socket]);

  return (
    <div className="max-w-7xl m-auto rounded-xl flex gap-4 lg:mb-4">
      {(!isMob || visibleScreen === "users") && <ChatUsers />}
      {(!isMob || visibleScreen === "chat") && <Chat />}
    </div>
  );
};

export default Messages;
