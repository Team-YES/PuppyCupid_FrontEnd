import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("access_token");

export const markMessagesAsRead = async (otherUserId: number) => {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/messages/read/${otherUserId}`,
      null,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
