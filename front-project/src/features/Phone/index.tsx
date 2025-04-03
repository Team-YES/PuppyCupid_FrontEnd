import { useFormik } from "formik";
import * as Yup from "yup";
import { PhonePadding } from "./styled";
import axios from "axios";

const Phone = () => {
  const formik = useFormik({
    initialValues: {
      phone: "",
      gender: "",
      nickname: "",
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .matches(/^[0-9]{10,11}$/, "올바른 전화번호를 입력하세요.")
        .required("전화번호를 입력하세요."),
      gender: Yup.string().required("성별을 선택하세요."),
      nickname: Yup.string()
        .min(2, "닉네임은 최소 2자 이상이어야 합니다.")
        .required("닉네임을 입력하세요."),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          "http://localhost:5000/auth/update-phone",
          {
            phone: values.phone,
            gender: values.gender,
            nickname: values.nickname,
          },
          { withCredentials: true }
        );

        if (res.data.ok) {
          alert("전화번호 등록 완료!");
          window.location.href = "/";
        }
      } catch (err: any) {
        if (err.response?.status === 409) {
          alert(err.response.data.error || "이미 사용 중인 전화번호입니다.");
        } else {
          alert("등록 중 오류가 발생했습니다.");
        }
      }
    },
  });

  return (
    <PhonePadding>
      <div className="Phone_plus_infoWrap">
        <div className="Phone_info_Title">
          <span>소셜 로그인 완료! 🎉</span>
          <span>원활한 서비스 이용을 위해 추가 정보를 입력해주세요.</span>
        </div>

        <form onSubmit={formik.handleSubmit} className="Phone_form">
          <div className="Phone_form_wrap">
            {/* 전화번호 입력 */}
            <div className="Phone_label_allbox">
              <label htmlFor="phone">전화번호</label>
              <div className="Phone_input_box">
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />
                <small className="text-gray-500">
                  전화번호는 10~11자리 숫자만 가능합니다.
                </small>
                <div className="Phone_error_messageWrap">
                  {formik.touched.phone && formik.errors.phone ? (
                    <p className="Phone_error_message">{formik.errors.phone}</p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* 성별 선택 */}
            <div className="Phone_label_allbox">
              <label htmlFor="gender" className="Phone_gender_label">
                성별
              </label>
              <div className="Phone_input_box">
                <select
                  id="gender"
                  name="gender"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.gender}
                >
                  <option value="">선택하세요</option>
                  <option value="male">남성</option>
                  <option value="female">여성</option>
                </select>
                <small className="text-gray-500">성별을 선택해주세요.</small>
                <div className="Phone_error_messageWrap">
                  {formik.touched.gender && formik.errors.gender ? (
                    <p className="Phone_error_message">
                      {formik.errors.gender}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* 닉네임 입력 */}
            <div className="Phone_label_allbox">
              <label htmlFor="nickname" className="block text-sm font-medium">
                닉네임
              </label>
              <div className="Phone_input_box">
                <input
                  id="nickname"
                  name="nickname"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.nickname}
                  className="w-full px-3 py-2 border rounded"
                />
                <small className="text-gray-500">
                  닉네임은 최소 2자 이상 입력해야 합니다.
                </small>
                <div className="Phone_error_messageWrap">
                  {formik.touched.nickname && formik.errors.nickname ? (
                    <p className="Phone_error_message">
                      {formik.errors.nickname}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* 제출 버튼 */}
            <div className="Phone_btnWrap">
              <button
                type="submit"
                className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600"
              >
                제출
              </button>
            </div>
          </div>
        </form>
      </div>
    </PhonePadding>
  );
};

export default Phone;
