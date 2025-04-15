import axios from "axios";

export const markMessagesAsRead = async (otherUserId: number) => {
  try {
    const response = await axios.patch(
      `/api/messages/read/${otherUserId}`,
      null,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("메시지 읽음 처리 실패:", error);
    throw error;
  }
};
