import axios from "axios";
import React, { useState, useEffect } from "react";
import { UsersModalStyle } from "./styled";

const defaultImage = "/puppy_profile.png";

interface UsersModalProps {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  followers: Users[];
  followings: Users[];
  modalType: "팔로우" | "팔로워" | null;
}

interface Users {
  id: number;
  nickName: string;
  dogImage?: string;
}

const UsersModal = ({
  closeModal,
  followers,
  followings,
  modalType,
}: UsersModalProps) => {
  console.log(followers, "팔로워");
  return (
    <UsersModalStyle>
      <div className="UsersModal_wrap">
        <div className="UsersModal_modalTypebtn_wrap">
          <div></div>
          <div className="UsersModalStyle_modalTypeTitle">{modalType}</div>
          <div
            className="UsersModalStyle_closeBtn"
            onClick={() => closeModal(false)}
          >
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
        <div className="UsersModal_usersItem_Allwrap">
          {(modalType === "팔로워" ? followers : followings).map(
            (user, index) => (
              <div className="UsersModal_usersItem">
                <div key={index} className="UsersModal_usersWrap">
                  <img
                    src={
                      user.dogImage
                        ? `http://localhost:5000${user.dogImage}`
                        : defaultImage
                    }
                    alt="userImg"
                    className="UsersModal_userImg"
                  />
                </div>
                <div className="UsersModal_userNickname">{user.nickName}</div>
              </div>
            )
          )}
        </div>
      </div>
    </UsersModalStyle>
  );
};

export default UsersModal;
