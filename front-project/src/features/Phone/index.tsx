import { useFormik } from "formik";
import * as Yup from "yup";
import { PhonePadding } from "./styled";

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
    onSubmit: (values) => {
      console.log("입력된 값:", values);
      alert("폼이 제출되었습니다!");
    },
  });

  return (
    <PhonePadding>
      <form onSubmit={formik.handleSubmit} className="Phone_form">
        {/* 전화번호 입력 */}
        <div>
          <label htmlFor="phone">전화번호</label>
          <input
            id="phone"
            name="phone"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <p className="text-red-500 text-sm">{formik.errors.phone}</p>
          ) : null}
        </div>

        {/* 성별 선택 */}
        <div>
          <label htmlFor="gender" className="Phone_gender_label">
            성별
          </label>
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
          {formik.touched.gender && formik.errors.gender ? (
            <p className="">{formik.errors.gender}</p>
          ) : null}
        </div>

        {/* 닉네임 입력 */}
        <div>
          <label htmlFor="nickname" className="block text-sm font-medium">
            닉네임
          </label>
          <input
            id="nickname"
            name="nickname"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nickname}
            className="w-full px-3 py-2 border rounded"
          />
          {formik.touched.nickname && formik.errors.nickname ? (
            <p className="text-red-500 text-sm">{formik.errors.nickname}</p>
          ) : null}
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600"
        >
          제출
        </button>
      </form>
    </PhonePadding>
  );
};

export default Phone;
