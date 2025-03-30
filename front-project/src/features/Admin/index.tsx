import { AdminStyled, Header, Button } from "./styled";

const Admin = () => {
  return (
    <AdminStyled>
      <Header>
        <div>Admin</div>
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
