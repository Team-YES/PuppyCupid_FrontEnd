import styled from "styled-components";

export const ChatOtherRoomWrapper = styled.div`
  .ChatOtherRoom_chat-room-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    cursor: pointer;
    border-bottom: 1px solid #ddd;
  }

  .ChatOtherRoom_dog-image {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 12px;
  }
  .ChatOtherRoom_time {
    padding-left: 5px;
    font-size: 13px;
    color: gray;
  }
  /* 점 */
  .ChatOtherRoom_redDot {
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: ${({ theme }) => theme.colors.accentPurple};
    border-radius: 50%;
    margin-right: 10px;
  }
  .ChatOtherRoom_chat_imguser {
    display: flex;
  }
  .ChatOtherRoom_last-message {
    display: flex;
    justify-content: space-between;
  }
`;
