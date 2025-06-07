import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { getChatMessages } from "../../../utils/api-functions";
import { assets } from "../../../assets/assets-path";
import { useChatSocket } from "../../../utils/hooks";

const ChatMessages = () => {
  const latestMessageRef = useRef(0);
  const { _id: myId } = useSelector((state) => state.auth);
  const selectedChat = useSelector((state) => state.selectedChat);

  useChatSocket(selectedChat);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["messages", selectedChat?._id],
    queryFn: () => getChatMessages(selectedChat?._id),
  });

  useEffect(() => {
    latestMessageRef?.current?.scrollIntoView({ behaviour: "smooth" });
  }, [data]);

  return (
    <div className="h-full overflow-y-auto gap-4 ">
      {data?.data?.data?.map((message, i) => {
        const pos = message?.sender?._id === myId ? "chat-end" : "chat-start";

        return (
          //   <div key={message?._id} className={`chat chat-${pos}`}>
          //     <div>{message?.content}</div>
          //   </div>
          <div key={message?._id} className={` h-[70px] chat ${pos}`}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="profile_picture"
                  src={message?.sender?.profilePicture || assets.DP_PLACEHOLDER}
                />
              </div>
            </div>
            {/* <div className="chat-header">
                Obi-Wan Kenobi
                <time className="text-xs opacity-50">12:45</time>
              </div> */}

            <div className="chat-bubble">{message?.content}</div>
            {/* <div className="chat-footer opacity-50">Delivered</div> */}
          </div>
        );
      })}
      <div ref={latestMessageRef} />
    </div>
  );
};

export default ChatMessages;
