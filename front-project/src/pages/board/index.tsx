import PrivateRoute from "@/components/PrivateRoute";
import BoardPage from "@/features/Board";
import axios from "axios";
import { useEffect, useState } from "react";

const Board = () => {
  return (
    <PrivateRoute>
      <BoardPage />
    </PrivateRoute>
  );
};

export default Board;
