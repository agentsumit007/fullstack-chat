import { axiosInstance } from "./api";

export const fetchChats = async () => {
  return axiosInstance.get("/chat/fetch-chats");
};
export const getChatMessages = async (chatId) => {
  return axiosInstance.get(`/message/get-chat-messages/${chatId}`);
};

export const sendMessage = (postData) => {
  return axiosInstance.post(`/message/send-message`, postData);
};

export const accessChatByEmail = (postData) => {
  return axiosInstance.post(`/chat/access-chat-by-email`, postData);
};

export const uploadFileToStorage = (formData) => {
  return axiosInstance.post(`/storage/upload`, formData);
};

export const updateProfile = (data) => {
  return axiosInstance.put(`/auth/update-profile`, data)
}


