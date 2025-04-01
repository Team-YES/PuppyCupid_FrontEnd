import { MyPagePadding, MyPageStyled, MyPageRight, MyPageLeft } from "./styled";

const MyPage = () => {
  return (
    <MyPagePadding>
      <MyPageStyled>
        <div className="MyPage_top_wrap">
          <MyPageLeft>
            <div className="MyPage_left_profileImg">
              <img src="/cute_cat.jpg" alt="profile img"></img>
            </div>
          </MyPageLeft>
          <MyPageRight>
            <div className="MyPage_right_profile">
              {/* 이메일 프로필 편집 버튼 */}
              <div className="MyPage_right_namebtns">
                <div className="MyPage_profile_nickname">
                  이메일 or nickname
                </div>
                <div className="MyPage_profile_btns">프로필 편집</div>
                <div className="MyPage_profile_btns">강아지 프로필 편집</div>
              </div>

              {/* 게시물 팔로워 팔로우 */}

              {/* 강아지 정보 */}
            </div>
          </MyPageRight>
        </div>
      </MyPageStyled>
    </MyPagePadding>
  );
};

export default MyPage;
