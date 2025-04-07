import styled from "styled-components";

export const ChatOtherRoomWrapper = styled.div`
  .ChatOtherRoom_chat-room-item {
    display: flex;
    align-items: center;
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
`;
