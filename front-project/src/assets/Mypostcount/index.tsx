import React, { useState } from "react";
import { MypostCountWrapper } from "./styled";
import UsersModal from "../../components/UsersModal";
interface MypostcountProps {
  titles: string[];
  count: number[];
  followers: [];
  followings: [];
}

const MypostCount = ({
  titles,
  count,
  followers,
  followings,
}: MypostcountProps) => {
  // 모달 state
  const [showUserModal, setShowUserModal] = useState(false);
  // 모달 title
  const [modalType, setModalType] = useState<"팔로워" | "팔로우" | null>(null);

  return (
    <MypostCountWrapper>
      <div className="MypostCount_AllWrap">
        {titles.map((title, index) => (
          <div key={index} className="MypostCount_card">
            <div className="MypostCount_title">{title}</div>
            <div
              className={
                title === "팔로워" || title === "팔로우"
                  ? "MypostCount_count cursor"
                  : "MypostCount_count"
              }
              onClick={
                title === "팔로워" || title === "팔로우"
                  ? () => {
                      setModalType(title);
                      setShowUserModal(true);
                    }
                  : undefined
              }
            >
              {count[index]}
            </div>
          </div>
        ))}
      </div>
      <div
        className={
          showUserModal
            ? "UserModel_toggle_wrap"
            : "UserModel_toggle_wrap UserModel_toggle_show"
        }
      >
        <UsersModal
          closeModal={setShowUserModal}
          followers={followers}
          followings={followings}
          modalType={modalType}
        ></UsersModal>
      </div>
    </MypostCountWrapper>
  );
};

export default MypostCount;
