import { AdminStyled, Header, Button } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { setName, resetName } from "@/reducers/userSlice";

const Admin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userName = useSelector((state: RootState) => state.user.name);

  return (
    <AdminStyled>
      <Header>
        <div>Admin/리덕스 예시: </div>

        {/* 리덕스 툴 킷 예시 */}
        <div>{userName}</div>
        <button onClick={() => dispatch(setName("홍길동"))}>이름 변경</button>
        <button onClick={() => dispatch(resetName())}>초기화</button>
      </Header>
      <div className="Admin_left_container">
        <div>
          <div className="Admin_btn_wrap">
            <Button>유저관리</Button>
            <Button>블랙리스트 관리</Button>
            <Button>사용자 통계</Button>
          </div>
        </div>
        <div className="Admin_right_container">(임시)</div>
      </div>
    </AdminStyled>
  );
};

export default Admin;
