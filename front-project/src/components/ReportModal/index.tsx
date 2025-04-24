import { useRef } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { ReportModalStyle } from "./styled";
import { useClickOutside } from "@/hooks/useClickOutside";
import axiosInstance from "@/lib/axios";
import Cookies from "js-cookie";

type ReportType = "user" | "post" | "comment";

interface ReportModalProps {
  type: ReportType;
  targetId: number;
  onClose: () => void;
}

const ReportModal = ({ type, targetId, onClose }: ReportModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(modalRef, onClose);

  const formik = useFormik({
    initialValues: {
      reason: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const token = Cookies.get("access_token");

        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/report/${type}/${targetId}`,
          {
            targetId,
            reason: values.reason,
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("신고가 접수되었습니다.");
        resetForm();
        onClose(); // 모달 닫기
      } catch (error) {
        console.error("신고 실패", error);
        alert("신고 중 오류가 발생했습니다.");
      }
    },
  });

  // 타입에 따라 신고하기 title 변경
  const getTitleByType = (type: ReportType) => {
    switch (type) {
      case "user":
        return "유저 신고하기";
      case "post":
        return "게시물 신고하기";
      case "comment":
        return "댓글 신고하기";
      default:
        return "신고하기";
    }
  };

  // 버튼 클릭 시 비어있으면 alert
  const handleClickSubmit = () => {
    if (!formik.values.reason.trim()) {
      alert("신고 사유를 입력해주세요.");
      return;
    }
    formik.handleSubmit();
  };

  return (
    <ReportModalStyle>
      <div className="ReportModal_formWrap" ref={modalRef}>
        <h2>{getTitleByType(type)}</h2>
        <textarea
          name="reason"
          placeholder="신고 사유를 입력해주세요"
          value={formik.values.reason}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <button type="button" onClick={handleClickSubmit}>
          제출하기
        </button>
      </div>
    </ReportModalStyle>
  );
};

export default ReportModal;
