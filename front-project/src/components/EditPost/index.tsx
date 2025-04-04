import axios from "axios";
import {
  RegistrationStyled,
  Button,
  ErrorMessage,
} from "@/components/Registration/styled";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TextAreaComp from "../TextAreaComp";
import InputComp from "../InputComp";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

type Post = {
  post: {
    id: number;
    content: string;
    category: string;
    images: { id: number; image_url: string; order: number }[];
    user: {
      id: number;
      nickName: string;
      email: string;
      phone: string;
    };
    like_count: number;
    liked?: boolean;
    created_at: string;
    updated_at: string;
  };
};

const EditPost = () => {
  const router = useRouter();

  const { id } = router.query;
  // console.log(id);

  // 서버데이터 저장
  const [post, setPost] = useState<Post | null>(null);

  // 서버에 해당 게시물 데이터 요청
  useEffect(() => {
    axios
      .get<Post>(`http://localhost:5000/posts/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        const postData = res.data;
        console.log(postData);
        setPost(postData);
      })
      .catch((err) => console.error(err));
  }, []);

  // console.log(post?.post.id);

  // 카테고리 표시
  const categoryMap: Record<string, string> = {
    walk: "산책메이트",
    free: "자유게시판",
    adopt: "유기견 임시보호 / 입양",
  };

  // 게시물 수정
  const userFormik = useFormik({
    initialValues: {
      images: post?.post.images || [],
      category: post?.post.category || "walk",
      content: post?.post.content || "",
    },
    enableReinitialize: true,
    validate: (values) => {
      const errors: {
        content?: string;
      } = {};

      // 내용 유효성 검사
      if (!values.content?.trim()) {
        errors.content = "내용을 입력해주세요.";
      } else if (values.content.length > 1000) {
        errors.content = "1000자 이하로 작성해주세요.";
      }

      return errors;
    },
    onSubmit: async (values) => {
      console.log(values);
      const formData = new FormData();

      post?.post.images.forEach((img) => {
        formData.append("images", img.image_url);
      });
      formData.append("category", values.category);
      formData.append("content", values.content);

      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // 게시글 수정 요청
      try {
        const res = await axios.post(
          `http://localhost:5000/posts/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        console.log("게시물 수정 성공 응답: ", res.data);

        alert("게시물을 수정하였습니다.");
        router.push("/board");
      } catch (error) {
        console.error("게시물 수정 에러: ", error);
      }
    },
  });

  return (
    <RegistrationStyled onSubmit={userFormik.handleSubmit}>
      <div>게시글 수정</div>

      <div style={{ padding: 15 }}>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={10}
          slidesPerView={1}
          style={{ width: "100%" }}
        >
          {post?.post.images.map((img, i) => (
            <SwiperSlide
              key={i}
              style={{
                position: "relative",
                width: "100%",
              }}
            >
              <img
                src={`http://localhost:5000${img.image_url}`}
                alt={`이미지 미리보기${i + 1}`}
                style={{ width: "100%" }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div style={{ padding: 15 }}>
        <div style={{ marginBottom: 15 }}>
          <InputComp
            name="category"
            value={categoryMap[userFormik.values.category]}
            readOnly
          />
        </div>
        <div style={{ marginTop: 15 }}>
          <TextAreaComp
            name="content"
            value={userFormik.values.content}
            onChange={userFormik.handleChange}
            onBlur={userFormik.handleBlur}
          />
        </div>
        {userFormik.touched.content && userFormik.errors.content && (
          <ErrorMessage>{userFormik.errors.content}</ErrorMessage>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", padding: 15 }}>
        <div>
          <Button
            variant={"default"}
            onClick={() => {
              router.push("/board");
            }}
          >
            취소
          </Button>
        </div>
        <div>
          <Button
            type="submit"
            variant={"confirm"}
            style={{ marginLeft: 14, backgroundColor: "blue" }}
          >
            수정
          </Button>
        </div>
      </div>
    </RegistrationStyled>
  );
};

export default EditPost;
