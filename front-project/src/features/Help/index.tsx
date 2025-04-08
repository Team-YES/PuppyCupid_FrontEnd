import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { HelpStyled } from "./styled";

export default function ContactPage() {
  const formik = useFormik({
    initialValues: {
      type: "",
      name: "",
      email: "",
      phone1: "",
      phone2: "",
      phone3: "",
      message: "",
    },
    validationSchema: Yup.object({
      type: Yup.string().required("문의 유형을 선택해주세요."),
      name: Yup.string().required("이름을 입력해주세요."),
      email: Yup.string()
        .email("올바른 이메일 형식이 아닙니다.")
        .required("이메일을 입력해주세요."),
      phone1: Yup.string()
        .matches(/^\d{2,3}$/, "2~3자리 숫자만 입력해주세요.")
        .required("연락처를 입력해주세요."),
      phone2: Yup.string()
        .matches(/^\d{3,4}$/, "3~4자리 숫자만 입력해주세요.")
        .required("연락처를 입력해주세요."),
      phone3: Yup.string()
        .matches(/^\d{4}$/, "4자리 숫자만 입력해주세요.")
        .required("연락처를 입력해주세요."),
      message: Yup.string().required("문의 내용을 입력해주세요."),
    }),
    onSubmit: async (values) => {
      const phone = `${values.phone1}-${values.phone2}-${values.phone3}`;
      try {
        await axios.post("/api/contact", {
          ...values,
          phone,
        });
        alert("문의가 성공적으로 제출되었습니다.");
      } catch (error) {
        alert("문의 전송에 실패했습니다.");
        console.error(error);
      }
    },
  });

  const isFormValid = formik.isValid && formik.dirty;

  return (
    <HelpStyled>
      <div className="Help_formWrap">
        <h1>문의하기</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="Help_Wrap">
            <div className="Help_labelinput_wrap">
              <label className="Help_required-dot">
                문의 유형 선택<span>●</span>
                <div className="Help_inputWrap">
                  <select
                    name="type"
                    onChange={formik.handleChange}
                    value={formik.values.type}
                  >
                    <option value="">선택</option>
                    <option value="service">결제 관련 문의</option>
                    <option value="bug">신고하기</option>
                    <option value="etc">기타</option>
                  </select>
                </div>
              </label>
              {formik.touched.type && formik.errors.type && (
                <div>{formik.errors.type}</div>
              )}
            </div>
            <div className="Help_labelinput_wrap">
              <label className="Help_required-dot">
                이름<span>●</span>
                <div className="Help_inputWrap">
                  <input
                    type="text"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                </div>
              </label>
              {formik.touched.name && formik.errors.name && (
                <div>{formik.errors.name}</div>
              )}
            </div>
            <div className="Help_labelinput_wrap">
              <label className="Help_required-dot">
                이메일<span>●</span>
                <div className="Help_inputWrap">
                  <input
                    type="email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                </div>
              </label>
              {formik.touched.email && formik.errors.email && (
                <div>{formik.errors.email}</div>
              )}
            </div>
            <div className="Help_labelinput_wrap">
              <label className="Help_required-dot">
                연락처<span>●</span>
                <div className="Help_inputWrap">
                  <input
                    type="text"
                    name="phone1"
                    maxLength={3}
                    onChange={formik.handleChange}
                    value={formik.values.phone1}
                  />
                  -
                  <input
                    type="text"
                    name="phone2"
                    maxLength={4}
                    onChange={formik.handleChange}
                    value={formik.values.phone2}
                  />
                  -
                  <input
                    type="text"
                    name="phone3"
                    maxLength={4}
                    onChange={formik.handleChange}
                    value={formik.values.phone3}
                  />
                </div>
              </label>
              {(formik.touched.phone1 && formik.errors.phone1 && (
                <div>{formik.errors.phone1}</div>
              )) ||
                (formik.touched.phone2 && formik.errors.phone2 && (
                  <div>{formik.errors.phone2}</div>
                )) ||
                (formik.touched.phone3 && formik.errors.phone3 && (
                  <div>{formik.errors.phone3}</div>
                ))}
            </div>
            <div className="Help_labelinput_wrap">
              <label className="Help_required-dot">
                문의 내용<span>●</span>
                <div className="Help_inputWrap">
                  <textarea
                    name="message"
                    onChange={formik.handleChange}
                    value={formik.values.message}
                  />
                </div>
              </label>
              {formik.touched.message && formik.errors.message && (
                <div>{formik.errors.message}</div>
              )}
            </div>
          </div>
          <button type="submit" disabled={!isFormValid}>
            제출하기
          </button>
        </form>
      </div>
    </HelpStyled>
  );
}
