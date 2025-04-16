import ChatPage from "@/features/Chat";
import PrivateRoute from "../../components/PrivateRoute";
import BlacklistRoute from "@/components/BlacklistRoute";

const Chat = () => {
  return (
    <BlacklistRoute>
      <PrivateRoute>
        <ChatPage />
      </PrivateRoute>
    </BlacklistRoute>
  );
};

export default Chat;
