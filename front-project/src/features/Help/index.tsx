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
      bank: "",
      accountHolder: "",
      accountNumber: "",
      refundReason: "",
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
      bank: Yup.string().when("type", {
        is: "service",
        then: (schema) => schema.required("은행명을 선택해주세요."),
      }),
      accountHolder: Yup.string().when("type", {
        is: "service",
        then: (schema) => schema.required("예금주명을 입력해주세요."),
      }),
      accountNumber: Yup.string().when("type", {
        is: "service",
        then: (schema) =>
          schema
            .matches(
              /^\d{3}-\d{3,4}-\d{4,6}$/,
              "올바른 계좌번호 형식이 아닙니다."
            )
            .required("계좌번호를 입력해주세요."),
      }),
      refundReason: Yup.string().when("type", {
        is: "service",
        then: (schema) => schema.required("환불 사유를 입력해주세요."),
      }),
    }),
    validateOnMount: true,
    onSubmit: async (values) => {
      const phone = `${values.phone1}${values.phone2}${values.phone3}`;

      // type 매핑
      const typeMap = {
        service: "payment",
        bug: "report",
        etc: "other",
      };

      // content 구성
      let content = "";
      if (values.type === "service") {
        content = `
    [환불 문의]
    은행명: ${values.bank}
    예금주명: ${values.accountHolder}
    계좌번호: ${values.accountNumber}
    환불 사유: ${values.refundReason}
        `.trim();
      } else {
        content = values.message;
      }

      try {
        await axios.post(
          "/inquiries/contact",
          {
            name: values.name,
            email: values.email,
            phone,
            type: values.type,
            content,
          },
          { withCredentials: true }
        );
        alert("문의가 성공적으로 제출되었습니다.");
        formik.resetForm();
      } catch (error) {
        alert("문의 전송에 실패했습니다.");
        console.error(error);
      }
    },
  });

  const isFormValid = formik.isValid;

  return (
    <HelpStyled>
      <div className="Help_formWrap">
        <h1>문의하기</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="Help_Wrap">
            {/* 문의 유형 */}
            <div className="Help_labelinput_wrap">
              <label className="Help_required-dot">
                문의 유형 선택<span>●</span>
                <div className="Help_inputWrap">
                  <select
                    name="type"
                    onChange={formik.handleChange}
                    value={formik.values.type}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">선택</option>
                    <option value="service">환불문의</option>
                    <option value="bug">신고하기</option>
                    <option value="etc">기타</option>
                  </select>
                </div>
              </label>
              {formik.touched.type && formik.errors.type && (
                <div className="Help_error">{formik.errors.type}</div>
              )}
            </div>

            {/* 이름 */}
            <div className="Help_labelinput_wrap">
              <label className="Help_required-dot">
                이름<span>●</span>
                <div className="Help_inputWrap">
                  <input
                    type="text"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </label>
              {formik.touched.name && formik.errors.name && (
                <div className="Help_error">{formik.errors.name}</div>
              )}
            </div>

            {/* 이메일 */}
            <div className="Help_labelinput_wrap">
              <label className="Help_required-dot">
                이메일<span>●</span>
                <div className="Help_inputWrap">
                  <input
                    type="email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </label>
              {formik.touched.email && formik.errors.email && (
                <div className="Help_error">{formik.errors.email}</div>
              )}
            </div>

            {/* 연락처 */}
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
                    onBlur={formik.handleBlur}
                  />
                  -
                  <input
                    type="text"
                    name="phone2"
                    maxLength={4}
                    onChange={formik.handleChange}
                    value={formik.values.phone2}
                    onBlur={formik.handleBlur}
                  />
                  -
                  <input
                    type="text"
                    name="phone3"
                    maxLength={4}
                    onChange={formik.handleChange}
                    value={formik.values.phone3}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </label>
              {(formik.touched.phone1 && formik.errors.phone1 && (
                <div className="Help_error">{formik.errors.phone1}</div>
              )) ||
                (formik.touched.phone2 && formik.errors.phone2 && (
                  <div className="Help_error">{formik.errors.phone2}</div>
                )) ||
                (formik.touched.phone3 && formik.errors.phone3 && (
                  <div className="Help_error">{formik.errors.phone3}</div>
                ))}
            </div>

            {/* 문의 내용 */}
            {formik.values.type !== "service" && (
              <div className="Help_labelinput_wrap">
                <label className="Help_required-dot">
                  문의 내용<span>●</span>
                  <div className="Help_inputWrap">
                    <textarea
                      name="message"
                      onChange={formik.handleChange}
                      value={formik.values.message}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </label>
                {formik.touched.message && formik.errors.message && (
                  <div className="Help_error">{formik.errors.message}</div>
                )}
              </div>
            )}
            {/* 결제 관련 문의 필드들 */}
            {formik.values.type === "service" && (
              <>
                {/* 은행명 */}
                <div className="Help_labelinput_wrap">
                  <label className="Help_required-dot">
                    은행명<span>●</span>
                    <div className="Help_inputWrap">
                      <select
                        name="bank"
                        onChange={formik.handleChange}
                        value={formik.values.bank}
                        onBlur={formik.handleBlur}
                      >
                        <option value="">선택</option>
                        <option value="국민은행">국민은행</option>
                        <option value="신한은행">신한은행</option>
                        <option value="카카오뱅크">카카오뱅크</option>
                        <option value="농협은행">농협은행</option>
                        <option value="하나은행">하나은행</option>
                      </select>
                    </div>
                  </label>
                  {formik.touched.bank && formik.errors.bank && (
                    <div className="Help_error">{formik.errors.bank}</div>
                  )}
                </div>

                {/* 예금주명 */}
                <div className="Help_labelinput_wrap">
                  <label className="Help_required-dot">
                    예금주명<span>●</span>
                    <div className="Help_inputWrap">
                      <input
                        type="text"
                        name="accountHolder"
                        onChange={formik.handleChange}
                        value={formik.values.accountHolder}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </label>
                  {formik.touched.accountHolder &&
                    formik.errors.accountHolder && (
                      <div className="Help_error">
                        {formik.errors.accountHolder}
                      </div>
                    )}
                </div>

                {/* 계좌번호 */}
                <div className="Help_labelinput_wrap">
                  <label className="Help_required-dot">
                    계좌번호<span>●</span>
                    <div className="Help_inputWrap">
                      <input
                        type="text"
                        name="accountNumber"
                        placeholder="예: 123-4567-891011"
                        inputMode="numeric"
                        onChange={(e) => {
                          const onlyNums = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 13);
                          let formatted = onlyNums;
                          if (onlyNums.length > 3 && onlyNums.length <= 7) {
                            formatted = `${onlyNums.slice(
                              0,
                              3
                            )}-${onlyNums.slice(3)}`;
                          } else if (onlyNums.length > 7) {
                            formatted = `${onlyNums.slice(
                              0,
                              3
                            )}-${onlyNums.slice(3, 7)}-${onlyNums.slice(7)}`;
                          }
                          formik.setFieldValue("accountNumber", formatted);
                        }}
                        value={formik.values.accountNumber}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </label>
                  {formik.touched.accountNumber &&
                    formik.errors.accountNumber && (
                      <div className="Help_error">
                        {formik.errors.accountNumber}
                      </div>
                    )}
                </div>

                {/* 환불 사유 */}
                <div className="Help_labelinput_wrap">
                  <label className="Help_required-dot">
                    환불 사유<span>●</span>
                    <div className="Help_inputWrap">
                      <textarea
                        name="refundReason"
                        onChange={formik.handleChange}
                        value={formik.values.refundReason}
                        placeholder="환불을 원하시는 이유를 입력해주세요."
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </label>
                  {formik.touched.refundReason &&
                    formik.errors.refundReason && (
                      <div className="Help_error">
                        {formik.errors.refundReason}
                      </div>
                    )}
                </div>
                {formik.values.type === "service" && (
                  <div className="Help_notice_box">
                    <ul className="Help_notice_list">
                      <li>※ 환불은 결제일로부터 7일 이내에만 가능합니다.</li>
                      <li>
                        ※ 이용권을 한 번도 사용하지 않은 경우에만 환불이
                        가능합니다.
                      </li>
                      <li>
                        ※ 잘못된 계좌 정보로 인해 발생한 문제에 대해서는
                        책임지지 않습니다.
                      </li>
                      <li>
                        ※ 환불 완료까지 영업일 기준 3~5일이 소요될 수 있습니다.
                      </li>
                      <li>
                        ※ 입력하신 정보는 환불 처리에만 사용되며, 이후 즉시
                        파기됩니다.
                      </li>
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
          <button
            type="submit"
            disabled={!isFormValid}
            className={!isFormValid ? "disabled" : ""}
          >
            제출하기
          </button>
        </form>
      </div>
    </HelpStyled>
  );
}
