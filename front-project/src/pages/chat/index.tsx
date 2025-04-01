import ChatPage from "@/features/Chat";
import PrivateRoute from "../../components/PrivateRoute";
const Chat = () => {
  return (
    <PrivateRoute>
      <ChatPage />
    </PrivateRoute>
  );
};

export default Chat;
