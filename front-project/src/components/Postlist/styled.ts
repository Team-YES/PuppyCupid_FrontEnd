import styled from "styled-components";

export const PersonFormStyle = styled.div`
  .PostList_board_content {
    width: 100%;
  }
  .PostList_grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }
  .PostList_post {
    position: relative;
    overflow: hidden;
    aspect-ratio: 1 / 1;
    overflow: hidden;
  }

  .PostList_post img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  /* 아이콘 배경 */
  .PostList_post_info {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .PostList_post:hover .PostList_post_info {
    opacity: 1;
  }
  .PostList_post_info span {
    margin-right: 30px;
  }

  .PostList_post_info span:last-child {
    margin-right: 0;
  }
`;
