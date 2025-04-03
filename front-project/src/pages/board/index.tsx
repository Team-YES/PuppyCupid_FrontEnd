import BoardPage from "@/features/Board";
import axios from "axios";
import { useEffect, useState } from "react";
const Board = () => {
  // 서버에서 보낸 게시물 담는 state
  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/posts")
  //     .then((res) => console.log(res.data))
  //     .catch((err) => console.error(err));
  // }, []);

  return <BoardPage />;
};

export default Board;
