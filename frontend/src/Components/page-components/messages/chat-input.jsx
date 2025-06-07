import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { sendMessage } from "../../../utils/api-functions";
import { useSelector } from "react-redux";
import { SendHorizontal } from "lucide-react";
import { generateId } from "../../../utils/utils";

const ChatInput = () => {
  const [content, setContent] = useState();
  const auth = useSelector((state) => state.auth);
  const selectedChat = useSelector((state) => state.selectedChat);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      // queryClient.invalidateQueries(["messages", selectedChat?._id]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    //optimistic update
    queryClient.setQueryData(["messages", selectedChat?._id], (oldData) => {
      const {
        data: { data: messages },
      } = oldData;

      const newMessage = {
        _id: generateId(),
        sender: {
          ...auth,
        },
        content: content,
      };
      return {
        ...oldData,
        data: { ...oldData.data, data: [...messages, newMessage] },
      };
    });

    mutate({ chatId: selectedChat?._id, content });
    setContent("");
  };
  return (
    <div className="">
      <div className="divider m-0"></div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Type here"
          className="input w-full input-lg"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="!h-full">
          <button
            onClick={handleSubmit}
            className="btn btn-primary btn-soft !rounded-1 flex justify-center items-center w-[60px] h-[48px]"
          >
            <SendHorizontal />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
