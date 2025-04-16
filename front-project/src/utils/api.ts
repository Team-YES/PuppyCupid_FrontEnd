import axios from "axios";

export const markMessagesAsRead = async (otherUserId: number) => {
  try {
    const response = await axios.patch(
      `http://localhost:5000/messages/read/${otherUserId}`,
      null,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("메시지 읽음 처리 실패:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};
