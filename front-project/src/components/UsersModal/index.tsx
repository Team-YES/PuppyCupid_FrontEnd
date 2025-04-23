import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { UsersModalStyle } from "./styled";
import { useRouter } from "next/navigation";
import { useClickOutside } from "@/hooks/useClickOutside";

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
  // 다른 사람 페이지로 이동
  const router = useRouter();
  const movePage = (id: number) => {
    router.push(`/otherpage/${id}`);
    closeModal(false);
  };

  // 모달 바깥 누르면 닫기
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, () => closeModal(false));

  // 팔로워나 팔로우 모달 띄우기
  const userList = modalType === "팔로워" ? followers : followings;

  return (
    <UsersModalStyle>
      <div className="UsersModal_wrap" ref={modalRef}>
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
          {userList.length === 0 ? (
            <div className="UsersModal_emptyText">{modalType}가 없습니다.</div>
          ) : (
            userList.map((user, index) => (
              <div className="UsersModal_usersItem" key={index}>
                <div className="UsersModal_usersWrap">
                  <img
                    src={
                      user.dogImage
                        ? `${process.env.NEXT_PUBLIC_API_URL}${user.dogImage}`
                        : defaultImage
                    }
                    alt="userImg"
                    className="UsersModal_userImg"
                    onClick={() => movePage(user.id)}
                  />
                </div>
                <div className="UsersModal_userNickname">{user.nickName}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </UsersModalStyle>
  );
};

export default UsersModal;
