import React, { useState } from "react";
import { OtherPostCountWrapper } from "./styled";
import UsersModal from "../../components/UsersModal";

interface OtherPostcountProps {
  titles: string[];
  count: number[];
  followers: [];
  followings: [];
}

const OtherPostCount = ({
  titles,
  count,
  followers,
  followings,
}: OtherPostcountProps) => {
  // 모달 state
  const [showUserModal, setShowUserModal] = useState(false);
  // 모달 title
  const [modalType, setModalType] = useState<"팔로워" | "팔로우" | null>(null);

  return (
    <OtherPostCountWrapper>
      <div className="OtherPostCount_AllWrap">
        {titles.map((title, index) => (
          <div key={index} className="OtherPostCount_card">
            <div className="OtherPostCount_title">{title}</div>
            <div
              className={
                title === "팔로워" || title === "팔로우"
                  ? "OtherPostCount_count cursor"
                  : "OtherPostCount_count"
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
    </OtherPostCountWrapper>
  );
};

export default OtherPostCount;
