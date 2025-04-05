import { ChatStyled } from "./styled";
import ChatLeft from "../../assets/ChatLeft";
import ChatUsers from "../../assets/ChatUsers";
import ChatSend from "../../assets/ChatSend";

const Chat = () => {
  return (
    <ChatStyled>
      <div className="Chat_allWrap">
        {/* Chat 컴포넌트 1 - 왼쪽 */}
        <div className="Chat_ChatLeft_Wrap">
          <ChatLeft />
        </div>
        <div className="Chat_ChatUser_Wrap">
          {/* Chat 컴포넌트 2 - 가운데 */}
          <ChatUsers />
        </div>
        <div className="Chat_ChatSend_Wrap">
          {/* Chat 컴포넌트 1 - 오른쪽 */}
          <ChatSend />
        </div>
      </div>
    </ChatStyled>
  );
};

export default Chat;
