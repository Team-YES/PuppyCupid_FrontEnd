import { AdminStyled } from "./styled";

const Admin = () => {
  return (
    <AdminStyled>
      <div className="Admin_left_container">
        <div>
          <div className="Admin_btn_wrap">
            <button>
              <div className="Admin_btn_box">유저관리</div>
            </button>
          </div>
          <div className="Admin_btn_wrap">
            <button>
              <div className="Admin_btn_box">블랙리스트 관리</div>
            </button>
          </div>
          <div className="Admin_btn_wrap">
            <button>
              <div className="Admin_btn_box">사용자 통계</div>
            </button>
          </div>
        </div>
        <div className="Admin_right_container">(임시)</div>
      </div>
    </AdminStyled>
  );
};

export default Admin;
